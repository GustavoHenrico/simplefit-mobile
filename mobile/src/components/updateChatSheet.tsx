import { Settings, Trash } from "@tamagui/lucide-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, H3, Input, Label, ScrollView, Sheet, Spinner, TextArea, XGroup, XStack, YStack } from "tamagui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Chat } from "../models/chat";
import { useRouter } from "expo-router";
import { useChatStore } from "../stores/chatStore";
import { useMessageStore } from "../stores/messageStore";

const schema = z.object({
    name: z.string({ message: "Name is required" }).min(3, "Name must be at least 3 characters"),
    levelFitness: z.number({ message: "Level of Fitness is required" }).min(1, "Level of Fitness is required").max(3, "Level of Fitness is required"),
    frequencyTreining: z.number({ message: "Frequency of Training is required" }).min(1, "Frequency of Training is required").max(7, "Frequency of Training is required"),
    medicalConditions: z.string({ message: "Medical Conditions is required" }),
    personalPreferences: z.string({ message: "Personal Preferences is required" }),
});

type formValues = z.infer<typeof schema>;

export function UpadateChatSheet() {
    const router = useRouter();
    const { remove, update, load, isUpdating, isDeleting } = useChatStore();
    const { chat, setChat } = useMessageStore();

    const [open, setOpen] = useState(false);
    const { watch, setValue, handleSubmit, reset, formState: { errors } } = useForm<formValues>({
        resolver: zodResolver(schema), values: {
            name: chat.name || "",
            levelFitness: parseInt(chat.levelFitness?.toString() || "0"),
            frequencyTreining: parseInt(chat.frequencyTreining?.toString() || "0"),
            medicalConditions: chat.medicalConditions || "",
            personalPreferences: chat.personalPreferences || "",
        }
    });

    const handleOpen = () => {
        setOpen(!open);
        reset();
    }
    const handleUpdate = async (data: formValues) => {
        await update(chat.id || "", data);
        setChat({ ...chat, ...data });
        handleOpen();
        await load();
    }

    const handleDelete = async () => {
        await remove(chat.id || "")
        await load();
        router.dismissAll();
        handleOpen();
    }


    return (
        <>
            <Button onPress={handleOpen} icon={<Settings />} circular />
            <Sheet modal forceRemoveScrollEnabled={open} open={open} onOpenChange={handleOpen} zIndex={100_000} animation="medium" dismissOnSnapToBottom>
                <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
                <Sheet.Handle backgroundColor="$color4" />

                <Sheet.Frame p="$5">
                    <H3 textAlign="center">Update Chat</H3>

                    <ScrollView showsVerticalScrollIndicator={false} f={1}>
                        <YStack>
                            <Label color={errors.name ? "$red8Dark" : "gray"} htmlFor="name">Name {errors.name && `- ${errors.name.message}`}</Label>
                            <Input borderColor={errors.name && "$red8Dark"} value={watch("name")} onChangeText={e => setValue("name", e)} size="$5" />
                        </YStack>

                        <YStack mt="$3">
                            <Label color={errors.levelFitness ? "$red8Dark" : "gray"}>Level of Fitness {errors.levelFitness && `- ${errors.levelFitness.message}`}</Label>
                            <XGroup justifyContent="space-between">
                                <Button size="$4.5" onPress={() => setValue("levelFitness", 1)} borderColor={watch("levelFitness") === 1 ? "$gray11Dark" : "$backgroundFocus"} backgroundColor={watch("levelFitness") === 1 ? "$gray8Dark" : "$backgroundFocus"}>Beginner</Button>
                                <Button size="$4.5" onPress={() => setValue("levelFitness", 2)} borderColor={watch("levelFitness") === 2 ? "$gray11Dark" : "$backgroundFocus"} backgroundColor={watch("levelFitness") === 2 ? "$gray8Dark" : "$backgroundFocus"}>Intermediate</Button>
                                <Button size="$4.5" onPress={() => setValue("levelFitness", 3)} borderColor={watch("levelFitness") === 3 ? "$gray11Dark" : "$backgroundFocus"} backgroundColor={watch("levelFitness") === 3 ? "$gray8Dark" : "$backgroundFocus"}>Advanced</Button>
                            </XGroup>
                        </YStack>

                        <YStack mt="$3">
                            <Label color={errors.frequencyTreining ? "$red8Dark" : "gray"} htmlFor="frequencyTreining">Frequency of Training {errors.frequencyTreining && `- ${errors.frequencyTreining.message}`}</Label>
                            <XGroup justifyContent="space-between" width="100%" >
                                <Button size="$4" onPress={() => setValue("frequencyTreining", 1)} borderColor={watch("frequencyTreining") === 1 ? "$gray11Dark" : "$backgroundFocus"} backgroundColor={watch("frequencyTreining") === 1 ? "$gray8Dark" : "$backgroundFocus"}>1</Button>
                                <Button size="$4" onPress={() => setValue("frequencyTreining", 2)} borderColor={watch("frequencyTreining") === 2 ? "$gray11Dark" : "$backgroundFocus"} backgroundColor={watch("frequencyTreining") === 2 ? "$gray8Dark" : "$backgroundFocus"}>2</Button>
                                <Button size="$4" onPress={() => setValue("frequencyTreining", 3)} borderColor={watch("frequencyTreining") === 3 ? "$gray11Dark" : "$backgroundFocus"} backgroundColor={watch("frequencyTreining") === 3 ? "$gray8Dark" : "$backgroundFocus"}>3</Button>
                                <Button size="$4" onPress={() => setValue("frequencyTreining", 4)} borderColor={watch("frequencyTreining") === 4 ? "$gray11Dark" : "$backgroundFocus"} backgroundColor={watch("frequencyTreining") === 4 ? "$gray8Dark" : "$backgroundFocus"}>4</Button>
                                <Button size="$4" onPress={() => setValue("frequencyTreining", 5)} borderColor={watch("frequencyTreining") === 5 ? "$gray11Dark" : "$backgroundFocus"} backgroundColor={watch("frequencyTreining") === 5 ? "$gray8Dark" : "$backgroundFocus"}>5</Button>
                                <Button size="$4" onPress={() => setValue("frequencyTreining", 6)} borderColor={watch("frequencyTreining") === 6 ? "$gray11Dark" : "$backgroundFocus"} backgroundColor={watch("frequencyTreining") === 6 ? "$gray8Dark" : "$backgroundFocus"}>6</Button>
                                <Button size="$4" onPress={() => setValue("frequencyTreining", 7)} borderColor={watch("frequencyTreining") === 7 ? "$gray11Dark" : "$backgroundFocus"} backgroundColor={watch("frequencyTreining") === 7 ? "$gray8Dark" : "$backgroundFocus"}>7</Button>
                            </XGroup>
                        </YStack>

                        <YStack mt="$3">
                            <Label color={errors.medicalConditions ? "$red8Dark" : "gray"} htmlFor="medicalConditions">Medical Conditions {errors.medicalConditions && `- ${errors.medicalConditions.message}`}</Label>
                            <TextArea borderColor={errors.medicalConditions && "$red8Dark"} value={watch("medicalConditions")} onChangeText={e => setValue("medicalConditions", e)} size="$5" />
                        </YStack>

                        <YStack mt="$3">
                            <Label color={errors.personalPreferences ? "$red8Dark" : "gray"} htmlFor="personalPreferences">Personal Preferences {errors.personalPreferences && `- ${errors.personalPreferences.message}`}</Label>
                            <TextArea borderColor={errors.personalPreferences && "$red8Dark"} value={watch("personalPreferences")} onChangeText={e => setValue("personalPreferences", e)} size="$5" />
                        </YStack>

                    </ScrollView>
                    <XStack ai="center" jc="space-between" gap="$2" mt="$5">
                        <Button disabled={isDeleting} bg="$red6Dark" size="$5" onPress={handleDelete} icon={isDeleting ? <Spinner /> : <Trash />} />
                        <Button disabled={isUpdating} f={1} onPress={handleSubmit(handleUpdate)} size="$5" backgroundColor="$color4">
                            {isUpdating ? <Spinner /> : "Submit"}
                        </Button>
                    </XStack>
                </Sheet.Frame>
            </Sheet>
        </>
    )
}