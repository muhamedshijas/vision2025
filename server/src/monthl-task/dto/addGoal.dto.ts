import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddGoalDto{
     
    @IsString()
    goal:string
   
    @IsString()
    userId:string
}