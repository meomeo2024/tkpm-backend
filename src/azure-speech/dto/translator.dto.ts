import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TranslatorDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Where are you from?'
    })
    content: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'en'
    })
    fromLanguage: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'vi'
    })
    toLanguage: string;
}