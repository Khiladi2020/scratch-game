import globalStyles from "@/constants/globalStyles";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { StyleSheet, TextInput } from "react-native";

const SpriteDetails = () => {
    return (
        <ThemedView style={[globalStyles.borderBox, styles.container]}>
            <ThemedView style={styles.itemContainer}>
                <ThemedText style={styles.itemTitle}>Sprite</ThemedText>
                <ThemedView style={styles.valueBox}>
                    <TextInput value="Cat" />
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.itemContainer}>
                <ThemedText style={styles.itemTitle}>X</ThemedText>
                <ThemedView style={styles.valueBox}>
                    <ThemedText>12.4</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.itemContainer}>
                <ThemedText style={styles.itemTitle}>Y</ThemedText>
                <ThemedView style={styles.valueBox}>
                    <ThemedText>18.44</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
};

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
        padding: 8,
        paddingVertical: 4,
        borderColor: "#D8D8D8",
    },
    itemTitle: {
        fontWeight: "bold",
    },
});

export default SpriteDetails;
