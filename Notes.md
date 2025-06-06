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

## Ch. 6: Add Gestures

-   [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/) - library that provides built-in native components taht can handle gestures
    -   recognizes pan, tap, rotation, etc.
    -   double tap scales the size of the emoji sticker and double tapping again reduces the scale
    -   pan allows the smoji sticker to move aroudn the screen, allowing users to place the sticker anywhere in the image
-   an `Animated` component looks at the style prop of a component and determines which values to animate and apply updates to create an animation
    -   `<Animated.View>`, `<Animated.Text>`, `<Animated.ScrollView>`
-   `useSharedValue()` - hook that helps mutate data and run animations based on the current value
    -   can access and modify a shared value using the .value property
    -   `Gesture.Tap()` - allows animatintg the transition when scaling a ticker image
    -   `numberofTaps(#)` - specifying '#' determines the number of taps required
-   `withSpring()` - function provided by react-native-reanimated that provides an animatino based on the real-world physics of a spring
-   `useAnimatedStyle()` - hook that creates a style object
    -   allows updating sytles using shared values when an animation happens
    -   allows scaling image size by manipulating 'width' and 'height' properties

## Ch.7: Take a screenshot

-   react-native-view-shot - allows taking a screenshot within an app
    -   captures the screenshot of a `<View>` as an image using the 'captureRef()' method
    -   `captureRef()` method from react-native-view-shot that returns the URI of the captured screenshot image file
        -   also returns a promise that fulfills with the screenshot's URI
        -   passing the returned URI as a parameter to 'MediaLibrary.saveToLibraryAsync()' saves the screenshot to the device's media library
-   expo-media-library - allows saving an image onto the device's media library
    -   `usePermissions()` - hook to propt for permission to allow or deny access
        -   value of status is 'null' on default when the app loads for the first time and permission status is neither granted or denied
        -   status is 'granted' when access is given
-   [React Native Directory](https://reactnative.directory/)

## Ch. 8: Handle platform differences

-   Android and iOS can capture a screenshot with react-native-view-shot library but web browsers cannot
-   `dom-to-image` - library that takes a screenshot of any DOM node and turns it into a vector (SVG) or raster (PNG or JPEG) image
-

## Ch. 9: Configure status bar, splash screen, and app icon

-   `expo-status-bar` - library that comes pre-installed in every project created using create-expo-app
    -   provides a status bar component to confdigure the app's status bar style
-   'icon.png' - 1024x1024 px image for the app icon
    -   the "icon" property in the app.json file configures the app icon's path
        -   default for a new Expo project defines the correct path as "./assets/images/icon.png"
    -   splash screen - the screen visible before the app's content is loaded that hides once the app's content is ready to be displayed
        -   `expo-splash-screen` - plugin preinstalled in every project created using create-expo-app
            -   library that provides a config plugin to configure the splash screen

## Ch. 10: Configure a development build

-   development build - a debug version of a project optimized for quick iterations when creating an app
    -   contains the 'expo-dev-client' library
        -   'expo-dev-client' - library that offers a robust and complete development environment
        -   allows integrating any library or change code inside the native directories as required

|           Feature           |                                                   Development Builds                                                    |                                               Expo Go                                               |
| :-------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
|      Development phase      |                               Offers web-like iteration speed for mobile app development                                |          Allows for quick iteration and testing of Expo SDK projects using the client app           |
|        Collaboration        |                                  Facilitates team testing with shared native runtime.                                   |                            Easy project sharing via QR codes on a device                            |
| Third-party library support |                Full support for any third-party library, including those that require custom native code                |        Limited to libraries within the Expo SDK, not suitable for custom native dependencies        |
|        Customization        |                      Extensive customization wiht config plugins and direct access to native code                       | Limited customization with a focus on Expo SDK capabilities without direct native code modificaiton |
|        Intended use         | Ideal for full-fledged app development aimed at store deployment, offering a complete development environment and tools |     Ideal for learning, prototyping, and experimenting <br> Not recommended for production apps     |

### Login to Expo Account

-   `eas login` - terminal command that asks for Expo account email or username and password to login
-   `eas init` - termianl command that initializes and links a project to EAS servers
-   'projectId' - a unique identifier for a project in app.json under extra.eas.projectId
    -   property's value is used to identify the project on EAS servers
-   `eas build:configure` - command that prompts to select a platform: Android, iOS, or All and creates eas.json in the root of the project directory
    -   'eas.json' - defines the curerent EAS CLI version and adds three build profiles: development, preview, and production
        -   is a collection of different build profiles
            -   each profile is tailored with distinct configurations to produce specific build types
            -   each profile can include platform=spoecific settings for Android and iOS
        -   development profile:
            -   configuration: 'developmentClient' - enabled true for creating a debug build
                -   loads the app using the expo-dev-client library
                    -   provides development tools and generates a build artifact for device or emulator/simulator installation
                    -   supports updating JavaScript on the fly
            -   configuration: 'distribution' - configured as 'internal' to indicate that we want to share the build internally instead of uploading it on app stores
        -   [customizing build profiles](https://docs.expo.dev/build/eas-json/#build-profiles)

## Ch. 11: Android development build

-   the development build must be in the .apk
    -   the default Android format of .aab, ideal for Google Play Store distribution, cannot be installed on devices or emulators
-   Android application ID - the package name for the Android app stored in DNS reverse notation format (com.owner.appname)
    -   each component should start with a lowercase letter
-   a build details page displays the build type, profile, Expo SDK version, app version, version code, last commit hash, and the identify of the developer or account owner who initiated the build

### Creating a .apk

1.  Set 'developmentClient' to true in 'eas.json' under the 'build.development' profile
2.  run `eas build` in terminal with 'android as the platform and 'development' as the build profile
    -   `eas build --platform android --profile development`
        -   can use '-p' to specify platform
3.  Press 'return' for "What would you like your Android application id to be?" to select the default value provided
    -   adds 'android.package' in 'app.json'
4.  Press 'Y' for "Generate a new Android Keystore?"

## References

1. [Expo tutorial](https://docs.expo.dev/tutorial/introduction/)
2. [EAS tutorial](https://docs.expo.dev/tutorial/eas/introduction/)
