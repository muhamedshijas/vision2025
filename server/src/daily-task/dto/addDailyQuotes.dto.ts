import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddDailyQuotesDto {
    @ApiProperty()
    @IsString()
    date: string
    
    @ApiProperty()
    @IsString()
    dailyQuotes: string

    @ApiProperty()
    @IsString()
    review: string

    @ApiProperty()
    @IsNumber()
    rating: number
}