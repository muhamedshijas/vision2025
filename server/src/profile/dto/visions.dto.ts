import { IsString } from "class-validator";

export class VisionDto{
    @IsString()
    secure_url:string
    @IsString()
    url:string
    @IsString()
    title:string
}