import { create } from 'zustand';
import { Chat, CreateChat, UpdateChat } from '../models/chat';
import { useChatApi } from '../api/chat';

type StateProps = {
    chats: Chat[];
    isDeleting: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isLoading: boolean;
    add: (chat: CreateChat) => Promise<void>;
    update: (id: string, chat: UpdateChat) => Promise<void>;
    remove: (id: string) => Promise<void>;
    onSearch: (query: string) => void;
    load: () => Promise<void>;
    refreshing: boolean;
    onRefresh: () => Promise<void>;
};

const { listChat, createChat, updateChat, deleteChat } = useChatApi();

export const useChatStore = create<StateProps>((set, get) => ({
    chats: [],
    isCreating: false,
    isDeleting: false,
    isUpdating: false,
    refreshing: false,
    isLoading: false,

    load: async () => {
        set({ isLoading: true });
        const chats = await listChat();
        set({ chats });
        set({ isLoading: false });
    },

    add: async (chat) => {
        set({ isCreating: true });
        await createChat(chat);
        set({ chats: [...get().chats, chat] });
        set({ isCreating: false });
    },

    update: async (id, chat) => {
        set({ isUpdating: true });
        await updateChat(id, chat);
        const chats = get().chats.map((c) => c.id === id ? chat : c);
        set({ chats });
        set({ isUpdating: false });
    },

    remove: async (id) => {
        set({ isDeleting: true });
        await deleteChat(id);
        const chats = get().chats.filter((c) => c.id !== id);
        set({ chats });
        set({ isDeleting: false });
    },

    onRefresh: async () => {
        set({ refreshing: true });
        await get().load();
        set({ refreshing: false });
    },
    onSearch: async (query) => {
        set({ isLoading: true });
        const chats = await listChat();
        const filteredChats = chats.filter((chat) => chat.name?.toLowerCase().includes(query.toLowerCase()));
        set({ chats: filteredChats });
        set({ isLoading: false });
    }
}));
