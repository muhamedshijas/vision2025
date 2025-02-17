import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddGoalDto{
     
    @IsString()
    title:string
   
    @IsString()
    userId:string
}