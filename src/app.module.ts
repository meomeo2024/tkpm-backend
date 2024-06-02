import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { MessageController } from './message/message.controller';
import { MessageModule } from './message/message.module';
import { AzureSpeechModule } from './azure-speech/azure-speech.module';
@Module({
  imports: [UserModule, DatabaseModule, MessageModule, AzureSpeechModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
