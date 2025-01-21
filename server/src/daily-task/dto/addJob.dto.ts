import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Types } from "mongoose";

export class AddJobsDto {

    @ApiProperty()
    userId: string

    @ApiProperty()
    @IsString()
    company: string

    @ApiProperty()
    @IsString()
    status: string

    @ApiProperty()
    @IsString()
    place: string

    @ApiProperty()
    @IsString()
    designation: string

    @ApiProperty()
    @IsString()
    appliedThrough: string

    @ApiProperty()
    @IsString()
    email?: string

    @ApiProperty()
    @IsString()
    date: string



}