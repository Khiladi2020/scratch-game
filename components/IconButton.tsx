import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { MaterialIcons } from "@expo/vector-icons";

interface IconButtonProps {
    name: string;
    size?: number;
    color?: string;
    onPress?: () => void;
    customStyles?: StyleProp<ViewStyle>;
}
const IconButton = ({
    name = "delete",
    size = 18,
    color = "white",
    customStyles = {},
}: IconButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.iconButton, customStyles]}
            activeOpacity={0.5}
        >
            <MaterialIcons name={name as any} size={size} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        backgroundColor: "gray",
        padding: 4,
        borderRadius: 99,
        position: "absolute",
        right: -10,
        top: -10,
    },
});

export default IconButton;
