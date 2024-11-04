import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class ChatsRepository {
    constructor(private readonly db: DatabaseService) { }

    async createChat(data: Prisma.ChatCreateInput) {
        return await this.db.chat.create({ data });
    }

    async listChat() {
        return await this.db.chat.findMany();
    }

    async getChatByName(name: string) {
        return await this.db.chat.findFirst({ where: { name } });
    }

    async getChatById(id: string) {
        return await this.db.chat.findUnique({ where: { id } });
    }

    async updateChat(id: string, data: Prisma.ChatUpdateInput) {
        return await this.db.chat.update({ where: { id }, data });
    }

    async deleteChat(id: string) {
        return await this.db.chat.delete({ where: { id } });
    }

    async createMessage(data: Prisma.MessageCreateInput) {
        return await this.db.message.create({ data });
    }

    async listMessage(chatId: string) {
        return await this.db.message.findMany({ where: { chatId } });
    }

    async DeleteMessageByChatId(chatId: string) {
        return await this.db.message.deleteMany({ where: { chatId } });
    }
}
