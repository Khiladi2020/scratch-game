import { SpritesData } from "@/constants/initialSprites";
import GameContext from "@/context/GameContext";
import { useContext } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    clamp,
    runOnJS,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";

interface SpriteProps {
    item: SpritesData;
    updateCoordinates: (name: string, a: any, b: any) => void;
}

const Sprite = (props: SpriteProps) => {
    // Shared values
    const start = useSharedValue({ x: 0, y: 0 });
    const position = useSharedValue({ x: 0, y: 0 });

    // Hooks
    const contextValue = useContext(GameContext);
    // console.log("context value", contextValue?.height);

    // Local Variables
    const spriteHeight = 70;
    const spriteWidth = 70;

    const pan = Gesture.Pan()
        .onBegin(() => {
            console.log("Pan started");
        })
        .onUpdate((e) => {
            const currentX = start.value.x + e.translationX;
            const currentY = start.value.y + e.translationY;

            const minX = 0,
                minY = 0;

            // maxX = width - sprite width - borderRadius
            const maxX = contextValue?.width! - spriteWidth - 4,
                maxY = contextValue?.height! - spriteHeight - 4;

            // update the value
            position.value = {
                x: clamp(currentX, minX, maxX!),
                y: clamp(currentY, minY, maxY!),
            };

            // console.log(props.detailsRef);

            // Update Details
            // runOnJS((val) => {
            //     if (props?.detailsRef?.current) {
            //         console.log(" here i am", val);
            //         // props.detailsRef.current.updatePositionX(val);
            //     }
            // })(position.value.x);

            // Log
            // console.log(
            //     "my current value",
            //     clamp(currentX, minX, maxX!),
            //     clamp(currentY, minY, maxY!)
            // );
        })
        .onEnd(() => {
            start.value = {
                x: position.value.x,
                y: position.value.y,
            };
        });

    console.log("Sprite re-rendered");
    const aa = (val, val2) => {
        if (props?.updateCoordinates) {
            props?.updateCoordinates(props.item.name, val, val2);
        }
    };

    useDerivedValue(() => {
        runOnJS(aa)(position.value.x, position.value.y);
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

    const Image = props.item.image;

    return (
        <GestureDetector gesture={pan}>
            <Animated.View
                style={[
                    {
                        // height: spriteHeight,
                        // width: spriteHeight,
                        // backgroundColor: "tomato",
                        position: "absolute",
                        // zIndex: -1,
                    },
                    animatedStyles,
                ]}
            >
                <Image height={spriteHeight} width={spriteWidth} />
            </Animated.View>
        </GestureDetector>
    );
};

export default Sprite;
