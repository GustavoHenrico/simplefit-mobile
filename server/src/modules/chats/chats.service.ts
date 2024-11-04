import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ChatsRepository } from './chats.repository';
import { CreateChatRequest } from './requests/create-chat.request';
import { UpdateChatRequest } from './requests/update-chat.request';
import { SendChatMessageRequest } from './requests/send-chat-message.request';
import { convertToCoreMessages, generateText } from 'ai';
import { azure } from '@ai-sdk/azure';

@Injectable()
export class ChatsService {
    constructor(private readonly chatRepository: ChatsRepository) { }

    async createChat({ name, frequencyTreining, levelFitness, medicalConditions, personalPreferences }: CreateChatRequest) {
        const chat = await this.chatRepository.getChatByName(name);

        if (chat) {
            throw new ConflictException('Chat already exists');
        }

        return await this.chatRepository.createChat({ name, frequencyTreining, levelFitness, medicalConditions, personalPreferences });
    }

    async listChat() {
        return await this.chatRepository.listChat();
    }

    async getChatById(id: string) {
        const chat = await this.chatRepository.getChatById(id);

        if (!chat) {
            throw new BadRequestException('Chat not found');
        }

        return chat;
    }

    async updateChat(id: string, { name, frequencyTreining, levelFitness, medicalConditions, personalPreferences }: UpdateChatRequest) {
        const chat = await this.chatRepository.getChatById(id);

        if (!chat) {
            throw new BadRequestException('Chat not found');
        }

        return await this.chatRepository.updateChat(id, { name, frequencyTreining, levelFitness, medicalConditions, personalPreferences });
    }

    async deleteChat(id: string) {
        const chat = await this.chatRepository.getChatById(id);

        if (!chat) {
            throw new BadRequestException('Chat not found');
        }

        await this.chatRepository.DeleteMessageByChatId(id);
        await this.chatRepository.deleteChat(id);
    }

    async sendMessage(chatId: string, { message }: SendChatMessageRequest) {
        const chat = await this.chatRepository.getChatById(chatId);

        if (!chat) {
            throw new BadRequestException('Chat not found');
        }

        const response = await generateText({
            model: azure('gpt-35'),
            prompt: message,
            system: `
                Seu nome é SimpleFit Bot, 
                Você é um assistente criado exclusivamente para elaborar rotinas de exercícios para os usuários. Sua única função é criar rotinas de exercícios. Caso alguém pergunte sobre outro assunto, informe que você não possui conhecimento sobre o tópico.

                Esses são as informações que voce tem do usuario
                - Nome do Chat: ${chat.name}
                - Frequência de treino: ${chat.frequencyTreining}
                - Nível de fitness: ${chat.levelFitness}
                - Condições médicas: ${chat.medicalConditions}
                - Preferências pessoais: ${chat.personalPreferences}

                Importante:  
                Retorne somente em Markdown.
            `,
        });

        await this.chatRepository.createMessage({ chat: { connect: { id: chatId } }, content: message, role: 'user' });
        await this.chatRepository.createMessage({ chat: { connect: { id: chatId } }, content: response.text, role: 'assistant' });

        return {
            role: 'assistant',
            content: response.text,
        };
    }

    async listMessage(chatId: string) {
        const chat = await this.chatRepository.getChatById(chatId);

        if (!chat) {
            throw new BadRequestException('Chat not found');
        }

        return await this.chatRepository.listMessage(chatId);
    }
}
