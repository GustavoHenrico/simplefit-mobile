import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateChatRequest {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    levelFitness: number;

    @ApiProperty()
    @IsNotEmpty()
    frequencyTreining: number;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    medicalConditions: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    personalPreferences: string;
}
