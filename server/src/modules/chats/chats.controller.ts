import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatRequest } from './requests/create-chat.request';
import { SendChatMessageRequest } from './requests/send-chat-message.request';


@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post()
  async createChat(@Body() createChatRequest: CreateChatRequest) {
    return await this.chatsService.createChat(createChatRequest);
  }

  @Get()
  async getChats() {
    return await this.chatsService.listChat();
  }

  @Get(':id')
  async getChatById(@Param('id') id: string) {
    return await this.chatsService.getChatById(id);
  }

  @Put(':id')
  async updateChat(@Param('id') id: string, @Body() createChatRequest: CreateChatRequest) {
    return await this.chatsService.updateChat(id, createChatRequest);
  }

  @Delete(':id')
  async deleteChat(@Param('id') id: string) {
    return await this.chatsService.deleteChat(id);
  }

  @Post(':id/messages')
  async sendMessage(@Param('id') id: string, @Body() sendChatMessageRequest: SendChatMessageRequest) {
    return await this.chatsService.sendMessage(id, sendChatMessageRequest);
  }

  @Get(':id/messages')
  async ListMessages(@Param('id') id: string) {
    return await this.chatsService.listMessage(id);
  }



}
