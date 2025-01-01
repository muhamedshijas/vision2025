import { IsString } from "class-validator";

export class PasswordDto {

    @IsString()
    account: string

    @IsString()
    password: string
    
    @IsString()
    userId: string
}