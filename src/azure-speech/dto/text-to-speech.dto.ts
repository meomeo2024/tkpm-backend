import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TextToSpeechDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'I live in Vietnam'
    })
    text: string;
}