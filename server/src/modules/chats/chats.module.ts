import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ChatsRepository } from './chats.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatsController],
  providers: [ChatsRepository, ChatsService],
})
export class ChatsModule { }
