import globalStyles from "@/constants/globalStyles";
import { ThemedView } from "../ThemedView";
import {
    Button,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import SvgImages from "@/constants/SvgImages";
import { SpritesData } from "@/constants/initialSprites";
import { router } from "expo-router";
import { useAppStore } from "@/store/store";
import IconButton from "../IconButton";

export interface SpriteCardProps {
    type: "regular" | "newItem";
    item?: SpritesData;
    onPress?: (name: string) => void;
    onIconButtonPress?: () => void;
}

const SpriteCard: React.FC<SpriteCardProps> = ({
    type = "regular",
    item,
    onPress,
    onIconButtonPress,
}) => {
    if (type == "regular") {
        const SpriteImage = item.image;

        return (
            <TouchableOpacity
                style={[globalStyles.borderBox, styles.spriteContainer]}
                onPress={() => onPress?.(item?.name!)}
            >
                <SpriteImage height={70} width={70} />
                <ThemedView style={styles.actionButton}>
                    <Button
                        title="Add Action"
                        onPress={() => onPress?.(item?.name!)}
                    />
                </ThemedView>
                <IconButton name="delete" onPress={onIconButtonPress} />
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={[globalStyles.borderBox, styles.spriteContainer]}
            onPress={onPress}
        >
            <MaterialIcons name="add" size={30} />
        </TouchableOpacity>
    );
};

interface SpriteManagerProps {
    onNewSpriteAddClick: () => void;
    onAddActionClick: (name: string) => void;
}

const SpriteManager: React.FC<SpriteManagerProps> = ({
    onNewSpriteAddClick,
    onAddActionClick,
}) => {
    const sprites = useAppStore((state) => state.sprites);
    const removeSprite = useAppStore((state) => state.removeSprite);
    console.log("sprite manager re-rendered");

    return (
        <ScrollView
            horizontal
            style={globalStyles.borderBox}
            contentContainerStyle={styles.container}
        >
            {sprites?.map((sprite, idx) => {
                return (
                    <SpriteCard
                        type="regular"
                        item={sprite}
                        key={idx.toString()}
                        onPress={onAddActionClick}
                        onIconButtonPress={() => removeSprite(sprite.name)}
                    />
                );
            })}
            <SpriteCard type="newItem" onPress={onNewSpriteAddClick} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: "row",
        paddingHorizontal: 16,
    },
    spriteContainer: {
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        minWidth: 120,
        minHeight: 120,
    },
    actionButton: {
        bottom: 0,
        marginBottom: -16,
    },
    deleteButton: {
        backgroundColor: "gray",
        padding: 4,
        borderRadius: 99,
        position: "absolute",
        right: -10,
        top: -10,
    },
});

export default SpriteManager;
