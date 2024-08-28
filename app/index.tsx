import GameCanvas from "@/components/game/GameCanvas";
import SpriteDetails from "@/components/game/SpriteDetails";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    const spriteDetailsRef = useRef(null);

    const updateValue = (valX, valY) => {
        // console.log("updated value of raivl", val);
        if (spriteDetailsRef.current) {
            spriteDetailsRef.current?.updatePositionX(valX?.toFixed(2));
            spriteDetailsRef.current?.updatePositionY(valY?.toFixed(2));
        }
    };

    console.log("parent re rendered");

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>
                <GameCanvas updateX={updateValue} />
                <SpriteDetails ref={spriteDetailsRef} />
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
