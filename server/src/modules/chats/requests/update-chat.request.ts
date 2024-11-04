import { PartialType } from '@nestjs/swagger';
import { CreateChatRequest } from './create-chat.request';

export class UpdateChatRequest extends PartialType(CreateChatRequest) { }
