import { Body, Controller, Post } from '@nestjs/common';
import { PersonalDto } from './dto/personal.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
     constructor(private readonly profileService:ProfileService ) { }
    @Post('edit')
    async editprofile(@Body()personalDto:PersonalDto){
     return this.profileService.editProfile(personalDto) 
        
    }

}
