import { View, StyleSheet } from "react-native";
import ImageViewer from "../components/ImageViewer";

const PlaceholderImage = require("@/assets/images/background-image.png");

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
    imageContainer: {
        flex: 1,
    },
});

export default function Index() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} />
            </View>
        </View>
    );
}

