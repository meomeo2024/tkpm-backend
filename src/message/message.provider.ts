import { DataSource } from "typeorm";
import { Message } from "./entity/message.entity";
import { Conversation } from "./entity/conversation.entity";

export const MessageProviders = [
    {
        provide: 'MESSAGE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Message),
        inject: ['DATA_SOURCE'],
    },
];
export const ConversationProviders = [
    {
        provide: 'CONVERSATION_REPOSITORY',
        useFactory: (dataSource : DataSource) => dataSource.getRepository(Conversation),
        inject: ['DATA_SOURCE'],
    },
];