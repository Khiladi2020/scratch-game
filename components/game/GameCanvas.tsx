import { StyleSheet, useWindowDimensions, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import Sprite from "./Sprite";
import GameContext from "@/context/GameContext";
import React, { useState } from "react";
import { SpriteCardProps } from "./SpriteManager";

interface GameCanvasProps {
    updateX: () => {};
    sprites: Array<SpriteCardProps>;
}

export default function GameCanvas(props: GameCanvasProps) {
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
                style={[styles.canvas, { height: containerMaxHeight }]}
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
                {props.sprites.map((ele) => {
                    return <Sprite updateX={props.updateX} />;
                })}
            </View>
        </GameContext.Provider>
    );
}

const styles = StyleSheet.create({
    canvas: {
        backgroundColor: "white",
        borderColor: "#D8D8D8",
        borderWidth: 2,
        borderRadius: 8,
    },
});
