import globalStyles from "@/constants/globalStyles";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { StyleSheet, TextInput } from "react-native";
import { forwardRef, useImperativeHandle, useState } from "react";

const SpriteDetails = forwardRef((props, ref) => {
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [name, setName] = useState("Cat");

    useImperativeHandle(ref, () => {
        return {
            updatePositionX: (val: number) => {
                // console.log(" i am called bro", val);
                setPositionX(val);
            },

            updatePositionY: (val: number) => {
                setPositionY(val);
            },

            updateName: (val: string) => {
                setName(val);
            },
        };
    });

    console.log(" details re-rendered ");

    return (
        <ThemedView style={[globalStyles.borderBox, styles.container]}>
            <ThemedView style={styles.itemContainer}>
                <ThemedText style={styles.itemTitle}>Sprite</ThemedText>
                <ThemedView style={styles.valueBox}>
                    <TextInput value={name} />
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.itemContainer}>
                <ThemedText style={styles.itemTitle}>X</ThemedText>
                <ThemedView style={styles.valueBox}>
                    <ThemedText>{positionX}</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.itemContainer}>
                <ThemedText style={styles.itemTitle}>Y</ThemedText>
                <ThemedView style={styles.valueBox}>
                    <ThemedText>{positionY}</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    valueBox: {
        borderRadius: 16,
        borderWidth: 2,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderColor: "#D8D8D8",
    },
    itemTitle: {
        fontWeight: "bold",
    },
});

export default SpriteDetails;
