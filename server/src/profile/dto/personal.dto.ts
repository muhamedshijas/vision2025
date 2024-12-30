import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class personal {
    @IsString()
    address: string

    @IsDate()
    @Type(() => Date)
    date: Date

    @IsNumber()
    age: number

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
    blood_Group: string

}