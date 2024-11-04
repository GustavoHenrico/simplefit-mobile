import { Button, H3, Input, ListItem, ScrollView, Stack, XStack, YStack } from "tamagui";
import { MessageSquareMore, Search, X } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useChatStore } from "../stores/chatStore";
import { RefreshControl } from "react-native";
import { CreateChatSheet } from "../components/createChatSheet";
import { Chat } from "../models/chat";
import { useMessageStore } from "../stores/messageStore";

export default function AppScreen() {
    const [isSearching, setIsSearching] = useState(false);
    const { chats, load, refreshing, onRefresh, isLoading, onSearch } = useChatStore();
    const { setChat } = useMessageStore();
    const { push } = useRouter();

    useEffect(() => {
        load();
    }, []);

    const handleClick = (chat: Chat) => {
        push("/chat");
        setChat(chat);
    }

    const handleSearch = () => {
        setIsSearching(!isSearching);
        onSearch('');
    }

    return (
        <Stack bg="$background" f={1} pt="$10" pb="$3">
            {!isSearching ? (
                <XStack ai="center" jc="space-between" px="$4">
                    <H3>Chats</H3>
                    <Button circular icon={<Search />} onPress={handleSearch} />
                </XStack>
            ) : (
                <XStack ai="center" jc="space-between" px="$4" gap="$3">
                    <Input onChangeText={onSearch} autoFocus size="$4" f={1} placeholder="Enter a prompt here..." />
                    <Button icon={<X />} circular onPress={handleSearch} />
                </XStack>
            )}


            <ScrollView f={1} px="$4" mt="$5" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <YStack gap="$3">
                    {!isLoading && chats.map((chat, index) => (
                        <ListItem
                            key={index}
                            hoverTheme
                            pressTheme
                            icon={<MessageSquareMore size="$1.5" />}
                            pressStyle={{ backgroundColor: "$backgroundHover" }}
                            onPress={() => handleClick(chat)}
                            borderRadius="$6"
                            title={chat.name}
                            p="$5"
                        />
                    ))}

                    {isLoading && Array.from({ length: 5 }).map((_, index) => (
                        <ListItem
                            key={index}
                            borderRadius="$6"
                            p="$7"
                        />
                    ))}

                </YStack>
            </ScrollView>

            {!isSearching && (
                <Stack px="$4">
                    <CreateChatSheet />
                </Stack>
            )}

        </Stack>
    )
}

