import { Inject, Injectable } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { Message, actor } from './entity/message.entity';
import { MessageDto } from './dto/push-message.dto';
import { Conversation } from './entity/conversation.entity';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { env } from 'src/env';

@Injectable()
export class MessageService {
    constructor(
        @Inject('MESSAGE_REPOSITORY')
        private messageRepository: Repository<Message>,
        @Inject('CONVERSATION_REPOSITORY')
        private conversationRepository: Repository<Conversation>
    ) { }

    async pushMessage(body: MessageDto, userId: number) {
        let conversationId = body?.conversationId;
        let conversationTitle;

        if (!body.conversationId) {
            const payload = {
                conversationId: uuidv4(),
                title: body.content.length > 20 ? body.content.substring(0, 20) : body.content,
                userId: userId,
                createdDate: new Date().toLocaleString()
            }
            const conversation = await this.conversationRepository.save(payload);
            conversationId = conversation.conversationId;
            conversationTitle = conversation.title;
        }
        if (!conversationTitle) {
            const conversation = await this.conversationRepository.findOne({
                where: {
                    conversationId: body.conversationId
                }
            })
            conversationTitle = conversation.title;
        }
        const humanMessagePayload = {
            content: body.content,
            messageId: uuidv4(),
            actor: actor.Human,
            userId: userId,
            conversation: {
                conversationId: conversationId
            },
            createdDate: new Date().toLocaleString()
        }
        await this.messageRepository.save(humanMessagePayload);

        // Get message from openai
        const botMessage = await this.sendOpenAiMessage(conversationId);

        const botMessagePayload = {
            content: botMessage,
            actor: actor.Bot,
            messageId: uuidv4(),
            conversation: {
                conversationId: conversationId
            },
            createdDate: new Date().toLocaleString()
        }
        await this.messageRepository.save(botMessagePayload);
        const messages = await this.messageRepository.find({
            where: {
                conversation: {
                    conversationId: conversationId
                }
            },
            order: {
                createdDate: 'ASC'
            }
        })
        return {
            title: conversationTitle,
            conversationId: conversationId,
            content: await this.formatMessages(messages)
        }
    }

    async sendOpenAiMessage(conversationId: string) {
        try {
            let messages: any = await this.messageRepository.find({
                where: {
                    conversation: {
                        conversationId: conversationId
                    }
                },
                order: {
                    createdDate: 'ASC'
                }
            });
            messages = await messages.map(item => {
                return {
                    role: item.actor === 'human' ? 'user' : 'assistant',
                    content: item.content
                }
            })
            const response = await axios({
                method: 'post',
                url: env.azureOpenAiUrl,
                headers: {
                    'Authorization': 'Bearer ' + env.azureOpenAiToken,
                    'OpenAI-Project': env.azureOpenAiProjectId,
                    "Content-Type": 'application/json'
                },
                data: {
                    model: 'gpt-3.5-turbo',
                    messages: messages
                }
            });
            const botMessage = response.data?.choices[0]?.message?.content;
            return botMessage;
        } catch (error) {
            throw error;
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
            throw error;
        }
    }

    async getDetailConversation(conversationId: string) {
        try {
            const messages = await this.messageRepository.find({
                where: {
                    conversation: {
                        conversationId: conversationId
                    }
                },
                order: {
                    createdDate: 'ASC'
                }
            });
            const conversation = await this.conversationRepository.findOne({
                where: {
                    conversationId: conversationId
                }
            });
            return {
                title: conversation.title,
                conversationId: conversation.conversationId,
                content: await this.formatMessages(messages)
            };
        } catch (error) {
            throw error;
        }
    }

    async formatMessages(messages: any[]) {
        return messages.map(message => {
            return message.userId !== null
                ?
                message
                :
                {
                    messageId: message.messageId,
                    content: message.content,
                    actor: message.actor,
                    createdDate: message.createdDate
                }

        })
    }
}
