import { Module } from '@nestjs/common';
import { ChatsModule } from './modules/chats/chats.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [DatabaseModule, ChatsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
