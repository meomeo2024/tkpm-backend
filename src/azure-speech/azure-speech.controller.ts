import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AzureSpeechService } from './azure-speech.service';
import { TextToSpeechDto } from './dto/text-to-speech.dto';
import { SpeechToTextDto } from './dto/speech-to-text.dto';
import { TranslatorDto } from './dto/translator.dto';
import { DictionaryDto } from './dto/dictionary.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('azure-speech')
export class AzureSpeechController {
    constructor(private readonly azureSpeechService: AzureSpeechService){}

    @UseGuards(AuthGuard)
    @Post('text-to-speech')
    async textToSpeech(@Body() body: TextToSpeechDto){
        return this.azureSpeechService.textToSpeech(body);
    }

    @UseGuards(AuthGuard)
    @Post('speech-to-text')
    async speechToText(@Body() body: SpeechToTextDto){
        return this.azureSpeechService.speechToText(body);
    }

    @UseGuards(AuthGuard)
    @Post('translator')
    async translator(@Body() body: TranslatorDto){
        return this.azureSpeechService.translate(body);
    }

    @UseGuards(AuthGuard)
    @Get('languages-supported')
    async getLanguagesSupported(){
        return this.azureSpeechService.getLanguagesSupported();
    }

    @UseGuards(AuthGuard)
    @Post('look-up-dictionary')
    async lookUpDictionary(@Body() body: DictionaryDto){
        return this.azureSpeechService.lookUpDictionary(body);
    }
}
