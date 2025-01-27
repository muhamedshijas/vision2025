import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddDailyFeedbackDto {
    @ApiProperty()
    @IsString()
    date: string

    @ApiProperty()
    userId: string

    @ApiProperty()
    @IsNumber()
    rating: number
 
    @ApiProperty()
    @IsString()
    phrase: string

    @ApiProperty()
    @IsString()
    overAll: string

    @ApiProperty()
    @IsString()
    productivity: string

    @ApiProperty()
    @IsString()
    interaction: string
}