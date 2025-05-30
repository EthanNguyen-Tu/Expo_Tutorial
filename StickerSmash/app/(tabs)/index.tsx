import { View, StyleSheet } from "react-native";
import ImageViewer from "@/app/components/ImageViewer";
import Button from "@/app/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

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
    const [selectedImage, setSelectedImage] = useState<string | undefined>(
        undefined
    );
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert("You did not select any iamge.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer
                    imgSource={PlaceholderImage}
                    selectedImage={selectedImage}
                />
            </View>
            <View style={styles.footerContainer}>
                <Button
                    label="Choose a photo"
                    theme="primary"
                    onPress={pickImageAsync}
                />
                <Button label="Use this photo" />
            </View>
        </View>
    );
}

