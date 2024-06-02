import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AzureSpeechService } from './azure-speech.service';
import { AzureSpeechController } from './azure-speech.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AzureSpeechService, JwtService],
  controllers: [AzureSpeechController]
})
export class AzureSpeechModule {}
