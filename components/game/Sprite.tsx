import { ANIMATION_DURATION_DEFAULT } from "@/constants/default";
import { SpritesData } from "@/constants/initialSprites";
import GameContext from "@/context/GameContext";
import { useAppStore } from "@/store/store";
import { useContext, useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    clamp,
    runOnJS,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface SpriteProps {
    item: SpritesData;
    updateCoordinates: (name: string, a: any, b: any) => void;
}

const Sprite = (props: SpriteProps) => {
    // Shared values
    const start = useSharedValue({ x: 0, y: 0 });

    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);
    const rotateDegree = useSharedValue(0);

    const isAnimating = useAppStore((state) => state.isAnimationPlaying);
    const setAnimationState = useAppStore((state) => state.setAnimationState);

    const movements = useAppStore((state) =>
        state.movements.filter((val) => val.spriteName === props.item.name)
    );

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
            console.log("In update logic");
            const currentX = start.value.x + e.translationX;
            const currentY = start.value.y + e.translationY;

            const minX = 0,
                minY = 0;

            // maxX = width - sprite width - borderRadius
            const maxX = contextValue?.width! - spriteWidth - 4,
                maxY = contextValue?.height! - spriteHeight - 4;

            // update the value
            positionX.value = clamp(currentX, minX, maxX!);
            positionY.value = clamp(currentY, minY, maxY!);

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
                x: positionX.value,
                y: positionY.value,
            };
        });

    const updateStartPos = (x: number, y: number) => {
        start.value = {
            x: x,
            y: y,
        };
    };

    //#region Animation Logic
    const moveToPosition = (x: number, y: number) => {
        let isXDone = false,
            isYDone = false;

        const markResolved = (resolve: any, coord: any) => {
            if (coord == "x") isXDone = true;
            if (coord == "y") isYDone = true;

            if (isXDone && isYDone) {
                resolve("done");
                // console.log("marking as resolved");
            }
        };

        return new Promise((resolve, reject) => {
            positionX.value = withTiming(
                x,
                { duration: ANIMATION_DURATION_DEFAULT },
                () => {
                    runOnJS(updateStartPos)(positionX.value, positionY.value);
                    runOnJS(markResolved)(resolve, "x");
                }
            );
            positionY.value = withTiming(
                y,
                { duration: ANIMATION_DURATION_DEFAULT },
                () => {
                    runOnJS(updateStartPos)(positionX.value, positionY.value);
                    runOnJS(markResolved)(resolve, "y");
                }
            );
        });
    };

    const rotateObject = (toDegree: number) => {
        return new Promise((resolve, reject) => {
            rotateDegree.value = withTiming(
                toDegree,
                { duration: ANIMATION_DURATION_DEFAULT },
                () => {
                    runOnJS(resolve)("done");
                }
            );
        });
    };

    const startAnimations = async () => {
        console.log("animations started", JSON.stringify(movements));
        for (let i = 0; i < movements.length; i++) {
            const movement = movements[i];

            switch (movement.action.type) {
                case "xy-move-to": {
                    await moveToPosition(
                        movement.action.data.x ?? positionX.value,
                        movement.action.data.y ?? positionY.value
                    );
                    break;
                }
                case "xy-move-by": {
                    await moveToPosition(
                        positionX.value + (movement.action.data.x ?? 0),
                        positionY.value + (movement.action.data.y ?? 0)
                    );
                    break;
                }
                case "rotate-to": {
                    await rotateObject(
                        movement.action.data.rotate ?? rotateDegree.value
                    );
                    break;
                }
                case "rotate-by": {
                    await rotateObject(
                        rotateDegree.value + (movement.action.data.rotate ?? 0)
                    );
                    break;
                }
            }
        }

        // console.log("reset animating state");
        setAnimationState(false);
    };
    //#endregion

    useEffect(() => {
        if (isAnimating == true) startAnimations();
    }, [isAnimating]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         moveToPosition(200, 200);
    //     }, 1000);
    // }, []);

    console.log("Sprite re-rendered", isAnimating);
    const updateDetails = (val, val2) => {
        if (props?.updateCoordinates && isAnimating == false) {
            props?.updateCoordinates(props.item.name, val, val2);
        }
    };

    useDerivedValue(() => {
        runOnJS(updateDetails)(positionX.value, positionY.value);
    });

    //#region Animated Styles
    const animatedStyles = useAnimatedStyle(() => {
        // console.log(
        //     "current pos",
        //     positionX.value,
        //     positionY.value,
        //     rotateDegree.value
        // );
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
            ],
        };
    });

    const animatedRotationStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
                { rotateZ: `${rotateDegree.value}deg` },
            ],
        };
    });

    //#endregion

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
                    animatedRotationStyle,
                ]}
                onLayout={(e) => {
                    console.log(
                        "real view properties",
                        e.nativeEvent.layout.x,
                        e.nativeEvent.layout.y
                    );
                }}
            >
                <Image height={spriteHeight} width={spriteWidth} />
            </Animated.View>
        </GestureDetector>
    );
};

export default Sprite;
