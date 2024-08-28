import { StyleSheet, useWindowDimensions, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import Sprite from "./Sprite";
import GameContext from "@/context/GameContext";

export default function GameCanvas() {
    const { height, width } = useWindowDimensions();
    const containerMaxHeight = height * 0.6;

    return (
        <GameContext.Provider value={{ height: containerMaxHeight, width }}>
            <View style={[styles.container, { height: containerMaxHeight }]}>
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
