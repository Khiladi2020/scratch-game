import Separator from "@/components/Separator";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import globalStyles from "@/constants/globalStyles";
import { Movement, useAppStore } from "@/store/store";
import {
    router,
    Stack,
    useLocalSearchParams,
    useNavigation,
} from "expo-router";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";

const CODE = [
    {
        name: "Move X by 50",
        action: null,
    },
    {
        name: "Move Y by 50",
        action: null,
    },
    {
        name: "Rotate 360",
        action: null,
    },
    {
        name: "Go to (0,0)",
        action: null,
    },
    {
        name: "Go to random position",
        action: null,
    },
];

type CodeData = (typeof CODE)[0];

interface CodeItemProps {
    name: CodeData["name"];
    action: CodeData["action"];
    onPress?: (data: CodeData) => void;
}
const CodeItem = ({ name, action, onPress }: CodeItemProps) => {
    return (
        <TouchableOpacity
            style={styles.codeItem}
            activeOpacity={0.8}
            onPress={() => onPress?.({ name: name, action: action })}
        >
            <ThemedText>{name}</ThemedText>
        </TouchableOpacity>
    );
};

const SpriteActionsScreen = () => {
    const { width } = useWindowDimensions();
    const { spriteName } = useLocalSearchParams<{ spriteName: string }>();

    const addMovement = useAppStore((state) => state.addMovement);
    const movements = useAppStore((state) =>
        state.movements.filter((val) => val.spriteName == spriteName)
    );
    const CARD_WIDTH = width * 0.47;
    console.log("ravil", spriteName, movements);

    const onCodeItemPress = (data: CodeData) => {
        addMovement({
            spriteName: spriteName,
            action: { name: data.name, data: data.action },
        });
    };

    return (
        <ThemedView style={styles.screen}>
            <Stack.Screen options={{ presentation: "modal" }} />
            <ThemedView
                style={[
                    styles.card,
                    { flexBasis: CARD_WIDTH },
                    globalStyles.borderBox,
                ]}
            >
                <ThemedText style={styles.heading}>Code</ThemedText>
                <FlatList
                    data={CODE}
                    contentContainerStyle={{ flex: 1 }}
                    renderItem={({ item }) => (
                        <CodeItem
                            name={item.name}
                            action={item.action}
                            onPress={onCodeItemPress}
                        />
                    )}
                    ItemSeparatorComponent={<Separator height={10} />}
                />
            </ThemedView>
            <ThemedView
                style={[
                    styles.card,
                    { flexBasis: CARD_WIDTH },
                    globalStyles.borderBox,
                ]}
            >
                <ThemedText style={styles.heading}>Actions</ThemedText>
                <FlatList
                    data={movements}
                    contentContainerStyle={{ flex: 1 }}
                    renderItem={({ item }) => (
                        <CodeItem
                            name={item.action.name}
                            action={item.action}
                        />
                    )}
                    ItemSeparatorComponent={<Separator height={10} />}
                />
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 16,
    },
    card: {
        backgroundColor: "tomato",
        padding: 16,
        paddingHorizontal: 8,
        // alignItems: "center",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
    },
    codeItem: {
        backgroundColor: "dodgerblue",
        padding: 8,
        borderRadius: 4,
        alignItems: "center",
    },
});

export default SpriteActionsScreen;
