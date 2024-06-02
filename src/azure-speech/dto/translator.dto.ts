import { IsNotEmpty, IsString } from "class-validator";

export class TranslatorDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    fromLanguage: string;

    @IsNotEmpty()
    @IsString()
    toLanguage: string;
}