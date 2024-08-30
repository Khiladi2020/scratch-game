import { View } from "react-native";

interface SeparatorProps {
    height?: number;
}
const Separator = ({ height = 20 }: SeparatorProps) => (
    <View style={{ height: height }} />
);

export default Separator;
