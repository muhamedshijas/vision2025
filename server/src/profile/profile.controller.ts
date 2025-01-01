import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonalDto } from './dto/personal.dto';
import { ProfileService } from './profile.service';
import { PasswordDto } from './dto/passwords.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }
    @Post('edit')
    async editprofile(@Body() personalDto: PersonalDto) {
        return this.profileService.editProfile(personalDto)
    }

    @Post('addpassword')
    async addPassword(@Body() passwordDto: PasswordDto) {
        return this.profileService.addPassword(passwordDto)
    }

    @Get('getpasswords/:userId')
    async getPasswords(@Param('userId') userId: string) {
      return this.profileService.getPasswords(userId);
    }

}
