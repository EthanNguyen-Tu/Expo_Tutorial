import { Text, View } from "react-native";
import { styles } from "./index";

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the About Screen!</Text>
        </View>
    );
}
