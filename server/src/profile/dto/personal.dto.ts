import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class PersonalDto {
    @IsString()
    houseName: string

    @IsDate()
    @Type(() => Date)
    date: Date

    @IsString()
    place: string

    @IsString()
    post: string

    @IsString()
    district: string

    @IsString()
    state: string

    @IsString()
    pincode: string

    @IsString()
    bloodGroup: string
    @IsString()
    userId:string
}