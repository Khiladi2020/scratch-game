import GameContext from "@/context/GameContext";
import { useContext } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    clamp,
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
            const currentX = start.value.x + e.translationX;
            const currentY = start.value.y + e.translationY;

            const minX = 0,
                minY = 0;
            const maxX = contextValue?.width! - spriteHeight,
                maxY = contextValue?.height! - spriteHeight;

            // update the value
            position.value = {
                x: clamp(currentX, minX, maxX!),
                y: clamp(currentY, minY, maxY!),
            };

            // Log
            console.log(
                "my current value",
                clamp(currentX, minX, maxX!),
                clamp(currentY, minY, maxY!)
            );
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
                        position: "absolute",
                        zIndex: -1,
                    },
                    animatedStyles,
                ]}
            />
        </GestureDetector>
    );
};

export default Sprite;
