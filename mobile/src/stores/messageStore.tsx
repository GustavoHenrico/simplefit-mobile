import { useChatApi } from "../api/chat";
import { create } from "zustand";
import { Message, Role } from "../models/message";
import { Chat } from "../models/chat";

type StateProps = {
    messages: Message[];
    isLoading: boolean;
    isSending: boolean;
    prompt: string;
    onPromptChange: (prompt: string) => void;
    load: (chatId: string) => Promise<void>;
    send: (chatId: string) => Promise<void>;
    chat: Chat;
    setChat: (chat: Chat) => void;
}

const { listMessages, sendMessage } = useChatApi();


export const useMessageStore = create<StateProps>((set, get) => ({
    messages: [],
    isLoading: false,
    isSending: false,
    chat: {},
    prompt: "",

    load: async (chatId: string) => {
        set({ isLoading: true });
        const messages = await listMessages(chatId);
        set({ messages });
        set({ isLoading: false });
    },

    send: async (chatId: string) => {
        set({ isSending: true });
        if (get().prompt.length <= 0) return;
        set({ messages: [...get().messages, { role: Role.User, content: get().prompt }] });
        const response = await sendMessage({ chatId: chatId, message: get().prompt });
        set({ messages: [...get().messages, response] });
        set({ isSending: false });
    },

    onPromptChange: (prompt) => {
        set({ prompt });
    },

    setChat: (chat) => {
        set({ chat });
    },

}));