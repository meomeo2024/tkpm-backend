import { config } from 'dotenv';
config();

function getOsEnv(key: string): string {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return process.env[key] as string;
}

export const env = {
  azureHost: getOsEnv('azure_host'),
  azurePort: getOsEnv('azure_port'),
  azureDatabase: getOsEnv('azure_database'),
  azureUserName: getOsEnv('azure_username'),
  azurePassword: getOsEnv('azure_password'),
  azureTextToSpeechUrl: getOsEnv('azure_textToSpeech_url'),
  azureSpeechKey: getOsEnv('azure_speech_key'),
  azureSpeechToTextUrl: getOsEnv('azure_speechToText_url'),
  azureTransalteUrl: getOsEnv('azure_translate_url'),
  azureDictionaryUrl: getOsEnv('azure_dictionary_url'),
  azureTranslateAndDictionaryKey: getOsEnv('azure_translate_and_dictionary_key'),
  azureTranslateAndDictionaryRegion: getOsEnv('azure_translate_and_dictionary_region'),
  azureLanguagesSupportedUrl: getOsEnv('azure_languges_supported_url'),
  azureOpenAiUrl: getOsEnv('azure_open_ai_url'),
  azureOpenAiToken: getOsEnv('azure_open_ai_token'),
  azureOpenAiProjectId: getOsEnv('azure_open_ai_project_id')
};
