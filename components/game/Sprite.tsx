import GameContext from "@/context/GameContext";
import { useContext } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

const Sprite = () => {
    // Shared values
    const start = useSharedValue({ x: 0, y: 0 });
    const position = useSharedValue({ x: 0, y: 0 });

    // Hooks
    const contextValue = useContext(GameContext);
    console.log("context value", contextValue?.height);

    // Local Variables
    const spriteHeight = 50;

    const pan = Gesture.Pan()
        .onBegin(() => {
            console.log("Pan started");
        })
        .onUpdate((e) => {
            console.log("my current value", e.translationX);
            const newX = start.value.x + e.translationX;
            const newY = start.value.y + e.translationY;

            // update the value
            position.value = {
                x: newX,
                y: newY,
            };
        })
        .onEnd(() => {
            start.value = {
                x: position.value.x,
                y: position.value.y,
            };
        });

    // Animated Styles
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: position.value.x },
                { translateY: position.value.y },
            ],
        };
    });

    return (
        <GestureDetector gesture={pan}>
            <Animated.View
                style={[
                    {
                        height: spriteHeight,
                        width: spriteHeight,
                        backgroundColor: "tomato",
                        zIndex: -1,
                    },
                    animatedStyles,
                ]}
            />
        </GestureDetector>
    );
};

export default Sprite;
