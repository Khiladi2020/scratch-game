import {
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
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
import { useAppStore } from "@/store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { DEFAULT_ICON_SIZE } from "@/constants/sizes";
import globalStyles from "@/constants/globalStyles";

interface GameCanvasProps {
    updateCoordinates: (name: string, a: number, b: number) => void;
}

export default function GameCanvas(props: GameCanvasProps) {
    const { height, width } = useWindowDimensions();
    const [containerDimensions, setContainerDimensions] = useState<{
        height: number;
        width: number;
    } | null>(null);

    const sprites = useAppStore((state) => state.sprites);
    const setAnimationState = useAppStore((state) => state.setAnimationState);

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
                {sprites.map((ele, idx) => {
                    return (
                        <Sprite
                            updateCoordinates={props.updateCoordinates}
                            item={ele}
                            key={idx}
                        />
                    );
                })}

                <TouchableOpacity
                    style={styles.resetButton}
                    activeOpacity={0.7}
                >
                    <MaterialIcons
                        name="refresh"
                        size={DEFAULT_ICON_SIZE}
                        color={"white"}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.playButton}
                    activeOpacity={0.7}
                    onPress={() => {
                        setAnimationState(true);
                    }}
                >
                    <MaterialIcons
                        name="play-arrow"
                        size={DEFAULT_ICON_SIZE}
                        color={"white"}
                    />
                </TouchableOpacity>
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
    resetButton: {
        ...globalStyles.iconButton,
        backgroundColor: "#0F9D58",
        top: -7,
        right: -7,
        padding: 12,
    },
    playButton: {
        ...globalStyles.iconButton,
        backgroundColor: "#4285F4",
        top: 50,
        padding: 12,
        right: -7,
    },
});
