import { ChevronLeft, Lightbulb, SendHorizontal, X } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Avatar, Button, H3, Input, ScrollView, Spinner, Stack, Text, View, XStack } from "tamagui";
import { UpadateChatSheet } from "../components/updateChatSheet";
import { useMessageStore } from "../stores/messageStore";
import React, { useEffect, useRef } from "react";
import { YStack } from "tamagui";
import Markdown from 'react-native-markdown-display';
import { Animated } from "react-native";

const ideas = [
    {
        title: "Gerar treino para hoje",
        prompt: "Gerar treino para hoje"
    },
    {
        title: "Criar plano semanal",
        prompt: "Criar plano semanal usando minhas frequencias de treino"
    },
    {
        title: "Recomendar aquecimento",
        prompt: "Recomendar aquecimento"
    },
    {
        title: "Sugestão de alongamento pós-treino",
        prompt: "Sugestão de alongamento pós-treino"
    },
    {
        title: "Ajustar treino para lesão",
        prompt: "Ajustar treino para lesão"
    },
    {
        title: "Treino rápido (30 min)",
        prompt: "Treino rápido (30 min)"
    }
]

export default function ChatScreen() {
    const { dismissAll } = useRouter();
    const { load, messages, send, isLoading, onPromptChange, isSending, chat } = useMessageStore();
    const inputRef = React.useRef<Input>(null);
    const ScrollViewRef = React.useRef<ScrollView>(null);
    const animations = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;
    const animate = Animated.loop(
        Animated.sequence([
            Animated.stagger(200, animations.map((anim) =>
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                })
            )),
            Animated.stagger(200, animations.map((anim) =>
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                })
            )),
        ])
    )


    useEffect(() => {
        load(chat.id || "");
    }, []);

    const handleSend = async () => {
        animate.start();
        inputRef.current?.clear();
        inputRef.current?.blur();
        await send(chat.id || "");
        animate.stop();
    }

    const handleSendIdea = async (idea: string) => {
        onPromptChange(idea);
        await handleSend();
    }

    const onFocus = () => {
        ScrollViewRef.current?.scrollToEnd({ animated: true });
    }

    const scrollToBottom = () => {
        ScrollViewRef.current?.scrollToEnd({ animated: true });
    }

    return (
        <Stack bg="$background" f={1} pt="$10" >
            <XStack ai="center" jc="space-between" px="$4">
                <Button circular icon={<ChevronLeft />} onPress={() => dismissAll()} />
                <H3>{chat.name}</H3>
                <UpadateChatSheet />
            </XStack>

            <ScrollView ref={ScrollViewRef} onContentSizeChange={scrollToBottom} f={1} px="$4" mt="$3">
                <YStack gap="$5">
                    {!isLoading && messages?.map((message, i) => {
                        if (message.role === "user") {
                            return (
                                <XStack key={i} jc="flex-end" gap="$2">
                                    <View bg="$gray5Dark" py="$2" px="$3" borderRadius="$6" borderBottomRightRadius="$0" maxWidth="90%">
                                        <Markdown style={{ body: { color: "#cccccc" } }}>{message.content}</Markdown>
                                    </View>
                                </XStack>
                            )
                        } else if (message.role === "assistant") {
                            return (
                                <XStack key={i} jc="flex-start" gap="$2">
                                    <View bg="$gray3Dark" py="$2" px="$3" borderRadius="$6" borderBottomLeftRadius="$0" maxWidth="90%">
                                        <Markdown style={{ body: { color: "#cccccc" } }}>{message.content}</Markdown>
                                    </View>
                                </XStack>
                            )
                        }
                    })}

                    {!isLoading && isSending && (
                        <XStack gap="$1">
                            {animations.map((anim, index) => {
                                const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] });
                                return (
                                    <Animated.View
                                        key={index}
                                        style={{
                                            backgroundColor: '#555',
                                            height: 13,
                                            width: 13,
                                            borderRadius: 10,
                                            opacity,
                                        }}
                                    />
                                );
                            })}
                        </XStack>
                    )}

                    {isLoading && Array.from({ length: 8 }).map((_, i) => (
                        <XStack key={i} jc={i % 2 === 0 ? "flex-end" : "flex-start"} gap="$2">
                            <View
                                bg="$backgroundHover"
                                p={i % 2 === 0 ? "$6" : "$10"}
                                borderRadius="$5"
                                borderBottomLeftRadius={i % 2 === 0 ? "$6" : "$0"}
                                borderBottomRightRadius={i % 2 !== 0 ? "$6" : "$0"}
                                w="$19"
                            />
                        </XStack>
                    ))}
                </YStack>
            </ScrollView>


            <YStack px="$4" py="$3" gap="$3">
                {!isLoading && (
                    <ScrollView horizontal space="$2" showsHorizontalScrollIndicator={false}>
                        {ideas.map((idea, i) => (
                            <XStack onPress={() => handleSendIdea(idea.prompt)} key={i} ai="center" jc="center" gap="$2" p="$3" borderRadius="$4" bg="$gray3Dark" hoverStyle={{ backgroundColor: "$gray6Dark" }} pressStyle={{ backgroundColor: "$gray6Dark" }}>
                                <Lightbulb size="$1" />
                                <Text>{idea.title}</Text>
                            </XStack>
                        ))}
                    </ScrollView>

                )}

                <XStack gap="$3">
                    <Input onFocus={onFocus} ref={inputRef} onChangeText={onPromptChange} size="$5" f={1} placeholder="Enter a prompt here..." />
                    <Button onPress={handleSend} size="$5" icon={isSending ? <Spinner /> : <SendHorizontal />} />
                </XStack>
            </YStack>

        </Stack >
    )
}