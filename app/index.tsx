import GameCanvas from "@/components/game/GameCanvas";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    return (
        <GestureHandlerRootView>
            <SafeAreaView style={{ flex: 1 }}>
                <ThemedView style={{ flex: 1 }}>
                    <GameCanvas />
                    <ThemedText>Helll</ThemedText>
                </ThemedView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default HomeScreen;
