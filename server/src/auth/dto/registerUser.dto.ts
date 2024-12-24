import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length, MinLength, minLength } from "class-validator";

export class RegisterUserDto{

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
    @IsNotEmpty()
    @IsEmail()
    email:string


    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsNotEmpty()
    @MinLength(7)
    password:string

    @ApiProperty({ example: '1234567890', description: 'The phone number of the user' })
    @IsNotEmpty()
    @IsNumberString()
    @Length(10)
    phoneNumber:string 
}