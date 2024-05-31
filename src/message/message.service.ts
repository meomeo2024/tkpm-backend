import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message, actor } from './entity/message.entity';
import { MessageDto } from './dto/push-message.dto';
import { Conversation } from './entity/conversation.entity';

@Injectable()
export class MessageService {
    constructor(
        @Inject('MESSAGE_REPOSITORY')
        private messageRepository: Repository<Message>,
        @Inject('CONVERSATION_REPOSITORY')
        private conversationRepository: Repository<Conversation>
    ) { }

    async pushMessage(body: MessageDto, userId: number) {
        let conversationId = body.conversationId;
        let conversationTitle;
        if (!body.conversationId) {
            const payload = {
                title: body.content.length > 20 ? body.content.substring(0, 20) : body.content,
                userId: userId,
                createdDate: new Date().toLocaleString()
            }
            const conversation = await this.conversationRepository.save(payload);
            conversationId = conversation.id;
            conversationTitle = conversation.title;
        }
        if (!conversationTitle) {
            const conversation = await this.conversationRepository.findOne({
                where: {
                    id: conversationId
                }
            })
            conversationTitle = conversation.title;
        }
        const humanMessagePayload = {
            content: body.content,
            actor: actor.Human,
            userId: userId,
            conversation: {
                id: conversationId
            },
            createdDate: new Date().toLocaleString()
        }
        await this.messageRepository.save(humanMessagePayload);

        // chat bot...
        const botMessagePayload = {
            content: 'OK',
            actor: actor.Bot,
            conversation: {
                id: conversationId
            },
            createdDate: new Date().toLocaleString()
        }
        await this.messageRepository.save(botMessagePayload);
        const messages = await this.messageRepository.find({
            where: {
                conversation: {
                    id: conversationId
                }
            }
        })
        return {
            title: conversationTitle,
            conversationId: conversationId,
            content: messages.map(message => {
                delete message.id;
                return message.userId !== null
                    ?
                    message
                    :
                    {
                        content: message.content,
                        actor: message.actor,
                        createdDate: message.createdDate
                    }

            })
        }
    }

    async getListConversation(userId: number) {
        try {
            const conversations = await this.conversationRepository.find({
                where: {
                    userId: userId
                }
            })
            return conversations;

        } catch (error) {

        }
    }
}
