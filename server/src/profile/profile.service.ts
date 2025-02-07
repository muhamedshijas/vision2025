import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schma/user.schema';
import { PersonalDto } from './dto/personal.dto';
import { PasswordDto } from './dto/passwords.dto';
import * as crypto from 'crypto';
import { DatesDto } from './dto/dates.dto';
import { AddJobsDto } from './dto/jobs.dto';
import { VisionDto } from './dto/visions.dto';

@Injectable()
export class ProfileService {
  private readonly encryptionAlgorithm = 'aes-256-ctr';
  private readonly secretKey = crypto.createHash('sha256')
    .update(process.env.SECRET_KEY || 'your-default-secret-key')
    .digest(); // Ensure the key is exactly 32 bytes
  private readonly ivLength = 16;

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async editProfile(editDto: PersonalDto) {
    const { houseName, post, place, date, district, bloodGroup, pincode, userId } = editDto;

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          personal: { houseName, post, place, date, district, bloodGroup, pincode },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async addPassword(passwordDto: PasswordDto) {
    const { userId, account, password } = passwordDto;

    // Find the user by ID
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Encrypt the password
    const { encrypted, iv } = this.encryptPassword(password);

    // Use `findByIdAndUpdate` with the `$push` operator to add the new password
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          passwords: { account, encrypted, iv } // Push the encrypted password into the array
        },
      },
      { new: true } // Return the updated document
    );

    return updatedUser;
  }
  async getPasswords(userId: string) {
    const user = await this.userModel.findById(userId).lean();
    if (!user || !user.passwords) {
      throw new NotFoundException('User or passwords not found');
    }

    const decryptedPasswords = user.passwords.map((passwordObj: { account: string; encrypted: string; iv: string }) => {
      return {
        account: passwordObj.account,
        password: this.decryptPassword(passwordObj.encrypted, passwordObj.iv),
      };
    });

    return decryptedPasswords;
  }
  async addDates(datesDto: DatesDto) {
    const { userId, dates, description } = datesDto;


    // Find the user by ID
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If `dates` is null, initialize it as an empty array
    if (!Array.isArray(user.dates)) {
      user.dates = [];
    }

    // Push the new date object to the `dates` array
    user.dates.push({ dates, description });

    // Save the updated user
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          dates: { dates, description } // Push the encrypted password into the array
        },
      },
      { new: true } // Return the updated document
    );

    return updatedUser;
  }

  async getDates(userId) {
    const user = await this.userModel.findById(userId).lean()
    const dates = user.dates
    return dates
  }

  async removeDateByDescription(userId: string, description: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userModel.updateOne(
      { _id: userId },
      { $pull: { dates: { description } } } // Remove the date with the specific description
    );

    return { message: 'Date removed successfully' };
  }
  async removePasswordByAccount(userId: string, account: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userModel.updateOne(
        { _id: userId },
        { $pull: { passwords: { account } } } // Remove the date with the specific description
      );
      return { message: 'password removed successfully' };
    } catch (err) {
      console.log(err);

    }
  }

  async addJobs(addJobDto: AddJobsDto) {
    const { jobTitle, packageValue, projects, timePeriod, location, userId, company } = addJobDto
    const user = await this.userModel.findById(userId)

    if (!Array.isArray(user.dates)) {
      user.jobs = [];
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          jobs: { jobTitle, packageValue, timePeriod, location, projects, company } // Push the encrypted password into the array
        },
      },
      { new: true } // Return the updated document
    );
    return updatedUser;
  }

  async getJobs(userId) {
    const user = await this.userModel.findById(userId)
    const jobs = user.jobs
    return jobs
  }

  async removeJobByTimePeriod(userId: string, timePeriod: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userModel.updateOne(
        { _id: userId },
        { $pull: { jobs: { timePeriod } } }
      );
      return { message: 'jobs removed successfully' };
    } catch (err) {
      console.log(err);

    }
  }

  async addVision(addVisonDto: VisionDto) {
    const { secure_url, url, title, userId } = addVisonDto
    const user = await this.userModel.findById(userId).lean()
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          visions: { title, url, secure_url, isCompleted: false, } // Push the encrypted password into the array
        },
      },
      { new: true } // Return the updated document
    );
    return updatedUser

  }
  async getVisions(userId) {
    const user = await this.userModel.findById(userId).lean()
    const visions = user.visions
    return visions

  }
  async updateVision(body) {
    const { userId, title, isCompleted } = body

    try {
      const updated = await this.userModel.updateOne(
        { _id: userId, 'visions.title': title },
        { $set: { 'visions.$.isCompleted': !isCompleted } }
      );
      return { status: true }
    } catch (err) {
      console.log(err);

    }


  }
  async deleteVsion(userId, title) {
    await this.userModel.updateOne(
      { _id: userId },
      { $pull: { visions: { title } } }
    );
    return { message: 'jobs removed successfully' };
  }
  private encryptPassword(password: string): { encrypted: string; iv: string } {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.encryptionAlgorithm, this.secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);

    return {
      encrypted: encrypted.toString('hex'),
      iv: iv.toString('hex'),
    };
  }

  private decryptPassword(encrypted: string, iv: string): string {
    const decipher = crypto.createDecipheriv(this.encryptionAlgorithm, this.secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);

    return decrypted.toString();
  }
}
