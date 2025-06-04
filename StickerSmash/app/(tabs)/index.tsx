import { View, StyleSheet, ImageSourcePropType } from "react-native";
import ImageViewer from "@/app/components/ImageViewer";
import Button from "@/app/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import CircleButton from "@/app/components/CircleButton";
import IconButton from "@/app/components/IconButton";
import EmojiPicker from "@/app/components/EmojiPicker";
import EmojiList from "@/app/components/EmojiList";
import EmojiSticker from "@/app/components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(
        undefined
    );
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [pickedEmoji, setPickedEmoji] = useState<
        ImageSourcePropType | undefined
    >(undefined);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const imageRef = useRef<View>(null);

    if (status === null) {
        requestPermission();
    }

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

    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                format: "png",
                height: 440,
                quality: 1,
            });

            await MediaLibrary.saveToLibraryAsync(localUri);

            if (localUri) {
                alert("Saved!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <View ref={imageRef} collapsable={false}>
                    <ImageViewer
                        imgSource={PlaceholderImage}
                        selectedImage={selectedImage}
                    />
                    {pickedEmoji && (
                        <EmojiSticker
                            imageSize={40}
                            stickerSource={pickedEmoji}
                        />
                    )}
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
                <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                    <EmojiList
                        onSelect={setPickedEmoji}
                        onCloseModal={onModalClose}
                    />
                </EmojiPicker>
            </View>
        </GestureHandlerRootView>
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

