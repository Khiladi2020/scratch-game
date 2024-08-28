import GameCanvas from "@/components/game/GameCanvas";
import SpriteDetails from "@/components/game/SpriteDetails";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>
                <GameCanvas />
                <SpriteDetails />
                <ThemedText>Helll</ThemedText>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: "#E8E8E8",
        gap: 8,
    },
});

export default HomeScreen;
