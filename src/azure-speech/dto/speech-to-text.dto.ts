import { IsNotEmpty, IsString } from "class-validator";

export class SpeechToTextDto {
    @IsNotEmpty()
    @IsString()
    audioBase64: string;
}