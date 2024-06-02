import { IsNotEmpty, IsString } from "class-validator";

export class DictionaryDto{
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