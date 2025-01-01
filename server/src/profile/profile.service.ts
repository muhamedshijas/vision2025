import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schma/user.schema';
import { PersonalDto } from './dto/personal.dto';
import { PasswordDto } from './dto/passwords.dto';
import * as crypto from 'crypto';

@Injectable()
export class ProfileService {
  private readonly encryptionAlgorithm = 'aes-256-ctr';
  private readonly secretKey = crypto.createHash('sha256')
    .update(process.env.SECRET_KEY || 'your-default-secret-key')
    .digest(); // Ensure the key is exactly 32 bytes
  private readonly ivLength = 16;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
