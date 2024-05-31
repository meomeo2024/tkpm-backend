import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { MessageController } from './message/message.controller';
import { MessageModule } from './message/message.module';
@Module({
  imports: [UserModule, DatabaseModule, MessageModule],
  controllers: [AppController, MessageController],
  providers: [AppService],
})
export class AppModule {}
