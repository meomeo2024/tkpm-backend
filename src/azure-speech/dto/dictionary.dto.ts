import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DictionaryDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'school'
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
        example:'vi'
    })
    toLanguage: string;
}