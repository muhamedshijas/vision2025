import { IsArray, IsString, IsOptional } from "class-validator";

export class AddJobsDto {
    @IsString()
    jobTitle: string;

    @IsString()
    company: string;

    @IsString()
    timePeriod: string;

    @IsString()
    packageValue: string;

    @IsString()
    location: string

    @IsArray()
    @IsString({ each: true }) // Ensures all array elements are strings
    projects: string[];

    @IsString()
    userId: string
}
