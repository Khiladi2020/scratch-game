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

export interface SpriteCardProps {
    type: "regular" | "newItem";
}

const SpriteCard: React.FC<SpriteCardProps> = ({ type = "regular" }) => {
    if (type == "regular") {
        return (
            <ThemedView
                style={[globalStyles.borderBox, styles.spriteContainer]}
            >
                <ThemedView
                    style={{
                        height: 50,
                        width: 50,
                        backgroundColor: "tomato",
                    }}
                />
                <ThemedView style={styles.actionButton}>
                    <Button title="Add Action" onPress={() => {}} />
                </ThemedView>
                <TouchableOpacity
                    style={styles.deleteButton}
                    activeOpacity={0.5}
                >
                    <MaterialIcons name="delete" size={18} color={"white"} />
                </TouchableOpacity>
            </ThemedView>
        );
    }

    return (
        <TouchableOpacity
            style={[globalStyles.borderBox, styles.spriteContainer]}
        >
            <MaterialIcons name="add" size={30} />
        </TouchableOpacity>
    );
};

interface SpriteManagerProps {
    sprites: Array<SpriteCardProps>;
}

const SpriteManager: React.FC<SpriteManagerProps> = ({ sprites }) => {
    return (
        <ScrollView
            horizontal
            style={globalStyles.borderBox}
            contentContainerStyle={styles.container}
        >
            {sprites?.map((details) => {
                return <SpriteCard type="regular" />;
            })}
            <SpriteCard type="newItem" />
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
