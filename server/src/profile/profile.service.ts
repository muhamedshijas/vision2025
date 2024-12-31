import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schma/user.schema';
import { PersonalDto } from './dto/personal.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
}
