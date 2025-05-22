import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { styles } from "./index";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Not found!" }} />
            <View style={styles.container}>
                <Link href="/" style={styles.button}>
                    Go back to the Home Screen!
                </Link>
            </View>
        </>
    );
}
