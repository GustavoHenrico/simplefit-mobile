import tamaguiConfig from "../../tamagui.config";

import { TamaguiProvider } from "tamagui";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function Layout() {
    const [loaded] = useFonts({ Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'), InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf') })

    if (!loaded) {
        return null
    }

    return (
        <TamaguiProvider defaultTheme="dark" config={tamaguiConfig}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="chat" options={{ headerShown: false }} />
            </Stack>
        </TamaguiProvider>
    )
}