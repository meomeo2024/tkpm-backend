import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AzureSpeechService } from './azure-speech.service';
import { TextToSpeechDto } from './dto/text-to-speech.dto';
import { SpeechToTextDto } from './dto/speech-to-text.dto';
import { TranslatorDto } from './dto/translator.dto';
import { DictionaryDto } from './dto/dictionary.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('azure-speech')
export class AzureSpeechController {
    constructor(private readonly azureSpeechService: AzureSpeechService){}

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Post('text-to-speech')
    @ApiOperation({
        summary: `Convert text to speech`
      })
    @ApiResponse({
    status: 201,
    description: 'Convert text to speech successfully'
    })
    @ApiResponse({
    status: 401,
    description: 'Unauthorized'
    })
    async textToSpeech(@Body() body: TextToSpeechDto){
        return this.azureSpeechService.textToSpeech(body);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Post('speech-to-text')
    @ApiOperation({
        summary: `Convert speech to text`
      })
    @ApiResponse({
    status: 201,
    description: 'Convert speech to text successfully'
    })
    @ApiResponse({
    status: 401,
    description: 'Unauthorized'
    })
    async speechToText(@Body() body: SpeechToTextDto){
        return this.azureSpeechService.speechToText(body);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Post('translator')
    @ApiOperation({
        summary: `Translate text`
      })
    @ApiResponse({
    status: 201,
    description: 'Translate successfully'
    })
    @ApiResponse({
    status: 401,
    description: 'Unauthorized'
    })
    async translator(@Body() body: TranslatorDto){
        return this.azureSpeechService.translate(body);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Get('languages-supported')
    @ApiOperation({
        summary: `Get the list of supported languages`
      })
    @ApiResponse({
    status: 200,
    description: 'successfully'
    })
    @ApiResponse({
    status: 401,
    description: 'Unauthorized'
    })
    async getLanguagesSupported(){
        return this.azureSpeechService.getLanguagesSupported();
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Post('look-up-dictionary')
    @ApiOperation({
        summary: `look up dictionary`
      })
    @ApiResponse({
    status: 201,
    description: 'successfully'
    })
    @ApiResponse({
    status: 401,
    description: 'Unauthorized'
    })
    async lookUpDictionary(@Body() body: DictionaryDto){
        return this.azureSpeechService.lookUpDictionary(body);
    }
}
