import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#25292e",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
    },
    button: {
        fontSize: 20,
        textDecorationLine: "underline",
        color: "#fff",
    },
});

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello World!</Text>
            <Link href="/about" style={styles.button}>
                Go to About Screen
            </Link>
        </View>
    );
}

