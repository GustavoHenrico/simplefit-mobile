import { Chat } from "./chat";


export enum Role {
    User = "user",
    Assistant = "assistant"
}

export type Message = {
    id?: string;
    content: string;
    chatId?: string;
    chat?: Chat;
    role: Role;
    // createdAt?: Date;
    // updatedAt?: Date;
}

export type CreateMessage = {
    chatId: string;
    message: string;
}

export type CreateMessageResponse = {
    content: string;
    role: Role;
}