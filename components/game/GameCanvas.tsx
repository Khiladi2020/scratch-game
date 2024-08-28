import { StyleSheet, useWindowDimensions, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import Sprite from "./Sprite";
import GameContext from "@/context/GameContext";
import { useState } from "react";

export default function GameCanvas() {
    const { height, width } = useWindowDimensions();
    const [containerDimensions, setContainerDimensions] = useState<{
        height: number;
        width: number;
    } | null>(null);

    const containerMaxHeight = height * 0.6;

    return (
        <GameContext.Provider
            value={{
                height: containerDimensions?.height ?? 0,
                width: containerDimensions?.width ?? 0,
            }}
        >
            <View
                style={[styles.container, { height: containerMaxHeight }]}
                onLayout={(e) => {
                    // measure the container dimensions
                    if (containerDimensions == null) {
                        const height = e.nativeEvent.layout.height;
                        const width = e.nativeEvent.layout.width;

                        setContainerDimensions({
                            height,
                            width,
                        });
                    }
                }}
            >
                <Sprite />
                <Sprite />
            </View>
        </GameContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgrey",
    },
});
