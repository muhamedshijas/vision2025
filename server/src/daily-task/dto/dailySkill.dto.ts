import { IsNumber, IsString } from "class-validator";

export class DailySkillDto {
    @IsNumber()
    gitCommits: number;

    @IsNumber()
    leetCodeProblems: number;

    @IsString()
    userId: string


    // Define an appropriate type for typingScores (e.g., an object or number)
    typingScore: Record<string, number>; // Example: key-value pairs for different typing test scores
}
