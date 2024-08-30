import GameCanvas from "@/components/game/GameCanvas";
import SpriteDetails from "@/components/game/SpriteDetails";
import SpriteManager from "@/components/game/SpriteManager";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { INITIAL_SPRITES } from "@/constants/initialSprites";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Cat from "@/assets/svg/cat.svg";
import SvgImages from "@/constants/SvgImages";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Movement } from "@/store/store";

const HomeScreen = () => {
    const params = useLocalSearchParams();
    const spriteDetailsRef = useRef<{
        updatePositionX: any;
        updatePositionY: any;
        updateName: any;
    }>(null);
    const [sprites] = useState(INITIAL_SPRITES);

    const updateValue = (spriteName: string, valX: number, valY: number) => {
        // console.log("updated value of raivl", val);
        if (spriteDetailsRef.current) {
            spriteDetailsRef.current?.updatePositionX(valX?.toFixed(2));
            spriteDetailsRef.current?.updatePositionY(valY?.toFixed(2));
            spriteDetailsRef.current?.updateName(spriteName);
        }
    };

    const onSelectSprite = (item) => {
        console.log("sprite seletecd bro", item);
    };

    const onNewSpriteAddClick = () => {
        router.push({ pathname: "/selectSprite" });
    };

    const onAddActionClick = (name: string) => {
        router.push({
            pathname: "/spriteActions/[spriteName]",
            params: { spriteName: name },
        });
    };

    console.log("Home Screen Re-rendered");

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.application}>
                <ScrollView contentContainerStyle={styles.container}>
                    <GameCanvas updateCoordinates={updateValue} />
                    <SpriteDetails ref={spriteDetailsRef} />
                    <SpriteManager
                        onNewSpriteAddClick={onNewSpriteAddClick}
                        onAddActionClick={onAddActionClick}
                    />
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    application: {
        backgroundColor: "#E8E8E8",
        flex: 1,
        paddingBottom: 0,
    },
    container: {
        padding: 8,
        gap: 8,
    },
});

export default HomeScreen;
