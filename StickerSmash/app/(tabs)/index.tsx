import { View, StyleSheet } from "react-native";
import ImageViewer from "@/app/components/ImageViewer";
import Button from "@/app/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import CircleButton from "@/app/components/CircleButton";
import IconButton from "@/app/components/IconButton";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(
        undefined
    );
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            alert("You did not select any iamge.");
        }
    };

    const onReset = () => {
        setShowAppOptions(false);
    };

    const onAddSticker = () => {};

    const onSaveImageAsync = async () => {};

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer
                    imgSource={PlaceholderImage}
                    selectedImage={selectedImage}
                />
            </View>
            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton
                            icon="refresh"
                            label="Reset"
                            onPress={onReset}
                        />
                        <CircleButton onPress={onAddSticker} />
                        <IconButton
                            icon="save-alt"
                            label="Save"
                            onPress={onSaveImageAsync}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.footerContainer}>
                    <Button
                        theme="primary"
                        label="Choose a photo"
                        onPress={pickImageAsync}
                    />
                    <Button
                        label="Use this photo"
                        onPress={() => setShowAppOptions(true)}
                    />
                </View>
            )}
        </View>
    );
}

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
    optionsContainer: {
        position: "absolute",
        bottom: 80,
    },
    optionsRow: {
        alignItems: "center",
        flexDirection: "row",
    },
});

