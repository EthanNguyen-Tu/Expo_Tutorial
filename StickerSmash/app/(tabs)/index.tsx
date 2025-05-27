import { View, StyleSheet } from "react-native";
import ImageViewer from "@/app/components/ImageViewer";
import Button from "@/app/components/Button";

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
    footerContainer: {
        flex: 1 / 3,
        alignItems: "center",
    },
});

export default function Index() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} />
            </View>
            <View style={styles.footerContainer}>
                <Button label="Choose a photo" theme="primary" />
                <Button label="Use this photo" />
            </View>
        </View>
    );
}

