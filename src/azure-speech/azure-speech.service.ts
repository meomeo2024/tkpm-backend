import { Inject, Injectable } from '@nestjs/common';
import { TextToSpeechDto } from './dto/text-to-speech.dto';
import axios from 'axios';
import { fstat, writeFileSync } from 'fs';
import { SpeechToTextDto } from './dto/speech-to-text.dto';
import { TranslatorDto } from './dto/translator.dto';
import { v4 as uuidv4 } from 'uuid';
import { DictionaryDto } from './dto/dictionary.dto';
import { env } from 'src/env';

@Injectable()
export class AzureSpeechService {
    constructor(){}

    async textToSpeech(body: TextToSpeechDto){
        try {
            const payload = `
            <speak version='1.0' xml:lang='en-US'>
                <voice xml:lang='en-US' xml:gender='Female' name='en-US-AvaMultilingualNeural'>
                    ${body.text}
                </voice>
            </speak>
            `;
            const audioData = await axios({
                method: 'post',
                url: env.azureTextToSpeechUrl,
                headers: {
                    'Ocp-Apim-Subscription-Key': env.azureSpeechKey,
                    'Content-Type':'application/ssml+xml',
                    'X-Microsoft-OutputFormat':'audio-16khz-128kbitrate-mono-mp3',
                    'User-Agent':'curl'
                },
                data : payload,
                responseType: 'arraybuffer'
            });
            // await writeFileSync('audio.mp3',Buffer.from(audioData.data, 'binary'));
            const base64Audio = Buffer.from(audioData.data, 'binary').toString('base64');
            return {
                base64Audio: base64Audio
            }
        } catch (error) {
            throw error;
        }
    }

    async speechToText(body: SpeechToTextDto){
        try {
            const wavFile = Buffer.from(body.audioBase64, 'base64');
            const data = await axios({
                method: 'post',
                url: env.azureSpeechToTextUrl,
                headers:{
                    'Ocp-Apim-Subscription-Key': env.azureSpeechKey,
                    'Content-Type':'audio/wav'
                },
                data: wavFile
            });
            return data.data;
        } catch (error) {
            throw error;
        }
    }

    async translate(body: TranslatorDto){
        try {
            const result = await axios({
                method: 'post',
                url: env.azureTransalteUrl,
                headers: {
                    'Ocp-Apim-Subscription-Key':env.azureTranslateAndDictionaryKey,
                    'Ocp-Apim-Subscription-Region':env.azureTranslateAndDictionaryRegion,
                    'Content-type':'application/json',
                    'X-ClientTraceId': uuidv4()
                },
                data:[{
                    text:body.content
                }],
                params:{
                    'api-version':'3.0',
                    'from':body.fromLanguage,
                    'to':body.toLanguage
                }
            });
            return result.data;
        } catch (error) {
            throw error;
        }
    }

    async getLanguagesSupported(){
        try {
            const languages = await axios({
                method: 'get',
                url: env.azureLanguagesSupportedUrl,
                headers: {
                    'Content-type':'application/json'
                },
                params:{
                    'api-version':'3.0'
                }
            });
            return languages.data;
        } catch (error) {
            throw error;
        }
    }

    async lookUpDictionary(body: DictionaryDto){
        try {
            const result = await axios({
                method: 'post',
                url:env.azureDictionaryUrl,
                headers: {
                    'Ocp-Apim-Subscription-Key':env.azureTranslateAndDictionaryKey,
                    'Ocp-Apim-Subscription-Region':env.azureTranslateAndDictionaryRegion,
                    'Content-type':'application/json',
                    'X-ClientTraceId': uuidv4()
                },
                data: [{
                    text: body.content
                }],
                params: {
                    'api-version':'3.0',
                    'from': body.fromLanguage,
                    'to': body.toLanguage
                }
            });
            return result.data;
        } catch (error) {
            throw error;
        }
    }
}
