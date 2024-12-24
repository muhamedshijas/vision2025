import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumberString, IsString, MaxLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
    @IsEmail()
    email: string

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    @MaxLength(7)
    password: string
}