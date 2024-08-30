import Separator from "@/components/Separator";
import { ThemedView } from "@/components/ThemedView";
import globalStyles from "@/constants/globalStyles";
import { INITIAL_SPRITES, SpritesData } from "@/constants/initialSprites";
import SvgImages from "@/constants/SvgImages";
import { useAppStore, useStore } from "@/store/store";
import {
    router,
    Stack,
    useLocalSearchParams,
    useNavigation,
} from "expo-router";
import { ReactElement } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ALL_SPRITES = [
    {
        name: "Cat",
        image: SvgImages.Cat,
    },
    {
        name: "Bat",
        image: SvgImages.Bat,
    },
    {
        name: "Chick",
        image: SvgImages.Chick,
    },
    {
        name: "Elephant",
        image: SvgImages.Elephant,
    },
    {
        name: "Gobo",
        image: SvgImages.Gobo,
    },
];

interface SpriteDisplayItemProps {
    image: ReactElement;
    name: string;
    onPress: (name: SpritesData) => {};
}
const SpriteDisplayItem = (props: SpriteDisplayItemProps) => {
    return (
        <TouchableOpacity
            style={globalStyles.borderBox}
            onPress={() =>
                props.onPress({ name: props.name, image: props.image })
            }
        >
            <props.image height={120} width={120} />
        </TouchableOpacity>
    );
};

const SelectSpriteScreen = () => {
    const addSprite = useAppStore((state) => state.addSprite);
    const onPress = (item: SpritesData) => {
        addSprite(item);
        router.back();
    };

    return (
        <ThemedView style={{ flex: 1, padding: 16 }}>
            <Stack.Screen options={{ title: "Select a Sprite" }} />
            <FlatList
                data={ALL_SPRITES}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <SpriteDisplayItem
                            name={item.name}
                            image={item.image}
                            onPress={onPress}
                        />
                    );
                }}
                columnWrapperStyle={styles.columsWrapper}
                ItemSeparatorComponent={<Separator />}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    columsWrapper: {
        justifyContent: "space-around",
    },
});

export default SelectSpriteScreen;
