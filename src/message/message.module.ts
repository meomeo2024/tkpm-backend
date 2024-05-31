import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { ConversationProviders, MessageProviders } from './message.provider';
import { MessageController } from './message.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [MessageController],
  providers: [MessageService, JwtService, ...ConversationProviders, ...MessageProviders]
})
export class MessageModule {}
