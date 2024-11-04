import { api } from "./index";
import { Chat, CreateChat, UpdateChat } from "../models/chat";
import { CreateMessage, CreateMessageResponse, Message } from "../models/message";


export const useChatApi = () => {

    const listChat = async () => {
        const response = await api.get<Chat[]>("/chats");
        return response.data;
    }

    const getChat = async (id: string) => {
        const response = await api.get<Chat>(`/chats/${id}`);
        return response.data;
    }

    const createChat = async (chat: CreateChat) => {
        const response = await api.post<Chat>("/chats", chat);
        return response.data;
    }

    const updateChat = async (id: string, chat: UpdateChat) => {
        const response = await api.put<Chat>(`/chats/${id}`, chat)
            .then((res) => res.data)
            .catch((error) => console.log(error));

        return response;
    }

    const deleteChat = async (id: string) => {
        const response = await api.delete<Chat>(`/chats/${id}`);
        return response.data;
    }

    const listMessages = async (chatId: string) => {
        const response = await api.get<Message[]>(`/chats/${chatId}/messages`);
        return response.data;
    }

    const sendMessage = async ({ chatId, message }: CreateMessage) => {
        const response = await api.post<CreateMessageResponse>(`/chats/${chatId}/messages`, { message });
        return response.data;
    }
    return { listChat, getChat, createChat, updateChat, deleteChat, listMessages, sendMessage };
}

