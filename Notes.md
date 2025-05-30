# Expo Notes

## Ch. 1: Create your first app

-   `Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process` - temporarily allows scripts in the PowerShell session
-   `reset-project` - script that resets the app directory structure in a project and copies the previous boilerplate files from the project's root directory to another sub-directory called app-example
-   `npx expo start` - when ran in the terminal, it starts the development server and provides a QR code inside the terminal window
    -   Scan that QR code to open the app on a device.
        -   Android:
            1. use the Expo Go
            2. Scan QR code option
        -   iOS: use the default camera app
    -   Run the web app: press 'w' in the terminal
        -   opens the web app in the default web browser

## Ch. 2 Add navigation

### Expo Router Basics

`Expo Router` - a file-based routing framework for React Native and web apps

-   manages navigation between screens
-   uses the same components across multiple platforms

`+not-found` - special route for a fallback screen display when a route does not exist

-   useful for displaying a custom screen when navigating to an invalid route on mobile instead of crashing the app or displaying a 404 error on web
-   Expo Router uses a special `+not-found.tsx` file

### [Expo Conventions](https://docs.expo.dev/router/introduction/)

1. app directory

-   contains only routes and their layouts
-   any files added to this directory become a screen inside our native app and a page on the web.

2. root layout

-   app/\_layout.tsx file
-   defines shared UI element so that they are consistent between different routes (ex. headers, tab bars, etc.)

3. File name conventions

-   index file names match their parent directory and do not add a path segment (ex. index.tsx file in the app directory matches / route)

4. route file

-   exports a React component as its default value
-   can use either .js, .jsx, .ts, or .tsx extension
-   Android, iOS, and web share a unified navigation structure

## Ch.3: Build a screen

-   `npx expo install <library-name>` - command that installs the library and adds it to the project's dependencies in package.json
-   `@` - symbol that is a custom path alias for importing custom components and other modules instead of relative paths
    -   Expo CLI automatically configures the symbol in tsconfig.json

## Ch.4: Use an image picker

-   `expo-image-picker` - Expo SDK library that provides access to the system's UI to select images and videos from the phone's library
    -   `npx expo install expo-image-picker` - install expo-image-picker
    -   need to Ctrl + c in the terminal and restart development server with npx expo start to install a new library in the project
-   `launchImageLibraryAsync()` - method to display the system UI by choosing an image or a video from the device's media library

    -   receives an object to specify different options
    -   object is ImagePickerOptions
    -   `allowsEditing` - allows the user to crop the image during the selection process on Android and IOS when set to true
    -   returns an object containing information about the selected image

        -   provides an assets array which contains the uri of the selected image
        -   Android:

            ```
            {
            "assets": [
                {
                "assetId": null,
                "base64": null,
                "duration": null,
                "exif": null,
                "fileName": "ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
                "fileSize": 4513577,
                "height": 4570,
                "mimeType": "image/jpeg",
                "rotation": null,
                "type": "image",
                "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FStickerSmash-13f21121-fc9d-4ec6-bf89-bf7d6165eb69/ImagePicker/ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
                "width": 2854
                }
            ],
            "canceled": false
            }
            ```

        -   IOS

            ```
            {
            "assets": [
                {
                "assetId": "99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7/L0/001",
                "base64": null,
                "duration": null,
                "exif": null,
                "fileName": "IMG_0004.JPG",
                "fileSize": 2548364,
                "height": 1669,
                "mimeType": "image/jpeg",
                "type": "image",
                "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FStickerSmash-13f21121-fc9d-4ec6-bf89-bf7d6165eb69/ImagePicker/ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
                "width": 1668
                }
            ],
            "canceled": false
            }
            ```

        -   web
            ```
            {
            "assets": [
                {
                "fileName": "some-image.png",
                "height": 720,
                "mimeType": "image/png",
                "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA"
                }
            ],
            "canceled": false
            }
            ```

-   `pickImageAsync()` - implemented function taht invokes the ImagePicker.launchImageLibraryAsync() method and handles the result

## References

1. [Expo tutorial](https://docs.expo.dev/tutorial/introduction/)
