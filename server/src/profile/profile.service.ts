import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schma/user.schema';
import { PersonalDto } from './dto/personal.dto';
import { PasswordDto } from './dto/passwords.dto';
import * as argon2 from 'argon2';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async editProfile(editDto: PersonalDto) {
    const { houseName, post, place, date, district, bloodGroup, pincode, userId } = editDto;

    // Update the `personal` field
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          personal: { houseName, post, place, date, district, bloodGroup, pincode },
        },
      },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async addPassword(passwordDto: PasswordDto) {
    const { userId, account, password } = passwordDto;

    // Find the user by userId
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Ensure the passwords field is initialized if it is null or undefined
    if (!user.passwords || user.passwords === null || user.passwords === undefined) {
      user.passwords = []; // Initialize passwords array if it's null or undefined
    }

    // Hash the password using Argon2
    const hashedPassword = await this.hashPassword(password);

    // Add the hashed password to the passwords array
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { // Push the new password into the passwords array
          passwords: { account, password: await this.hashPassword(password) }
        },
      },
      { new: true } // This ensures the updated user is returned
    );

    // Save the updated user document
    await user.save();

    // Return the updated user
    return user;
  }


  // Hash a password using Argon2
  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }




}
