import { IsString } from "class-validator";
export class DatesDto{
    @IsString()
    dates:string
    @IsString()
    description:string
    @IsString()
    userId:string
}