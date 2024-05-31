import { env } from 'src/env';
import { Conversation } from 'src/message/entity/conversation.entity';
import { Message } from 'src/message/entity/message.entity';
import { User } from 'src/user/entity/user.entity';
import { DataSource } from 'typeorm';

export const DatabaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: env.azureHost,
        port: Number(env.azurePort),
        username: env.azureUserName,
        password: env.azurePassword,
        database: env.azureDatabase,
        entities: [User, Message, Conversation],
        // synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
