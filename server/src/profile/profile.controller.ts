import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PersonalDto } from './dto/personal.dto';
import { ProfileService } from './profile.service';
import { PasswordDto } from './dto/passwords.dto';
import { DatesDto } from './dto/dates.dto';
import { AddJobsDto } from './dto/jobs.dto';
import { VisionDto } from './dto/visions.dto';

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

    @Delete('deletepassword/:userId')
    async deletePasswsordByAccount(
        @Param('userId') userId: string,
        @Body('account') account: string,
    ) {
        return this.profileService.removePasswordByAccount(userId, account);
    }

    @Post('adddates')
    async addDates(@Body() datesDto: DatesDto) {
        return this.profileService.addDates(datesDto)
    }

    @Get('getDates/:userId')
    async getDates(@Param('userId') userId: string) {
        return this.profileService.getDates(userId)
    }

    @Delete('deletedate/:userId')
    async deleteDateByDescription(
        @Param('userId') userId: string,
        @Body('description') description: string,
    ) {
        return this.profileService.removeDateByDescription(userId, description);
    }

    @Post('addjob')
    async addJob(@Body() addJobDto: AddJobsDto) {
        return this.profileService.addJobs(addJobDto)
    }

    @Get('getjobs/:userId')
    async getJobs(@Param('userId') userId: string,) {
        return this.profileService.getJobs(userId)
    }
    @Delete('deletejob/:userId')
    async deleteJob(@Param('userId') userId: string,
        @Body('timePeriod') timePeriod: string) {
        return this.profileService.removeJobByTimePeriod(userId, timePeriod)
    }

    @Post('addvision')
    async addVisons(@Body() visionDto: VisionDto) {
        return this.profileService.addVision(visionDto)
    }
    @Get('getvisions/:userId')
    async getVision(@Param('userId') userId: string) {
        return this.profileService.getVisions(userId)
    }
    @Put('updatevision')
    async updateVision(@Body() body: { userId: string, isCompleted: boolean, title: string }) {
        return this.profileService.updateVision(body)
    }

    @Delete('deletevision')
    async deleteVision(@Query('userId') userId: string,
        @Query('title') title: string) {
        return this.profileService.deleteVsion(userId,title)

    }
} 
