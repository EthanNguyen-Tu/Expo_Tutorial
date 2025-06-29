# Expo Notes

## Ch. 1: Create your first app

-   `npx create-expo-app@latest project-name` - creates a new Expo app
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
-   `eas build:dev` - installs and runs a cached development build, or creates a new one if a compatible build does not exist yet

### Creating a .apk

1.  Set 'developmentClient' to true in 'eas.json' under the 'build.development' profile
2.  run `eas build` in terminal with 'android as the platform and 'development' as the build profile
    -   `eas build --platform android --profile development`
        -   can use '-p' to specify platform
3.  Press 'return' for "What would you like your Android application id to be?" to select the default value provided
    -   adds 'android.package' in 'app.json'
4.  Press 'Y' for "Generate a new Android Keystore?"

## Ch. 12: iOS development build for simulators

-   development builds for iOS simulators are generated in the .app format
    -   different from iOS devices
-   `eas build --platform ios --profile ios-simulator`

    -   Prompts:

        1.  "What would you like your iOS bundle identifier to be?"

            -   Press "return" to select the default value provided
            -   adds "ios.bundleIdentifier" in "app.json"
                -   "ios.bundleIdentifier" - property that contains a unique name of the app used by the Apple App Store with its value to identify the app on the store
                -   notation: host.owner.app-name
                    -   ex. com.owner.stickersmash where com.owner is the domain and stickersmash is the app name

        2.  iOS app only uses standard/exempt encryption?

            -   Press "Y" top select the default value provided for the prompt
            -   sets "ITSAppUsesNonExemptEncryption" in the "Info.plist" file to "NO" and manages the compliance check for the same when you are releasing your app to TestFlight/Apple App Store
            -   when you are releasing your own app, it uses encryption, so select "N" to skip the prompt

-   [iOS build process](https://docs.expo.dev/build-reference/ios-builds/)

## [Ch. 13: Create and run a cloud build for iOS device](https://docs.expo.dev/tutorial/eas/ios-development-build-for-devices/)

-   development builds for iOS devicdes are generated in .ipa format, standard for iOS app installations
-   [Necessary App Credentials](https://docs.expo.dev/app-signing/app-credentials/#ios)
-   [iOS Developer Mode](https://docs.expo.dev/guides/ios-developer-mode/)
-   `eas device:create` - register a new Apple device
-   Question Prompts:
    -   "Would you like to use the your-account-name account?
        -   Press "Y"
    -   "Apple ID"
        -   Enter Apple ID to then log in to the Apple Developer Account
    -   "How would you like to register your devices?"
        -   Select "Website" to generate a registration URL that can be opened on the iOS device
            -   the provisioning profil link can be shared with multiple devices for downloading and installing the profile
-   `eas build --platform ios --profile development`

    -   prompts:

        1.  "What would you like your iOS bundle identifier to be?"

            -   Press "return" to select the default value
            -   adds ios.bundleIdentifier in app.json if not already defined

        2.  "Do you want to log into your Apple account?"

            -   if creating a development build for the first time, also asks to "Generate a new Apple Distribution Certificate"
            -   Press "Y" to both prompts

        3.  "Select a device for ad hoc build"

            -   Select one or all registered devices and press "return" to install the build on the devices later

        4.  CASE: Skipped iOS Simulator chapter

            -   "iOS app only uses standard/exempt encryption?"
                -   Press Y to select the default value
                    -   If app doesn't use encryption, it sets ITSAppUsesNonExemptEncryption in the Info.plist file to NO and manages the compliance check for the same when you are releasing your app to TestFlight/Apple App Stores
                    -   When releasing own app, and it uses encryption, select "N" to skip this prompt next time

## Ch. 14: Multiple app variants

-   changing the Android Application ID and/or iOS Bundle Identifier causes the EAS CLI to prompt the genreate of a new Keystore for Android and a new provisioning profile for iOS
-   script: "APP_VARIANT=development npx expo start"
    -   run with `npm run dev`
    -   evaluates app.config.js locally and loads the environment variable for the development profile
-   "app.json" for static values
-   "app.config.js" for dynamic values

## Ch. 15: Internal distribution build

-   Internal sharing of apps:
    -   Android = Google Play beta
    -   iOS = TestFlight
        -   limits to one active build at a time
-   EAS Build - creates shareable links for builds and provides instructions on using them
    -   has a default configuation designed to facilitate internal distribution
    -   setting in "eas.json" build.distribution to "internal" allows sharing build URLs with anyone so they can install it on their device and does not require a development server to run the app
    -   internal distribution builds requires Android to be in .apk and iOS in .ipa formats
        -   distribution set to internal automatically creates the app binary in these file formats for devices
-   creating an internal distribution build requires [app signing credentials](https://docs.expo.dev/app-signing/app-credentials/)
    -   Android allows installing any compatible .apk file
        -   app signing is non-restrictive
        -   a new Android Keystore is generated when a development build is created, so there is no need to generate a new keystore for preview builds
    -   For Apple, an ad hoc provisioning profile that explicitly lists the devices allowed to run the app is needed
        -   [Apple Developer Enterprise Program](https://developer.apple.com/programs/enterprise/) can be used by some organizations whose apps meet specific requirements to distribute apps internally to a larger audience
            -   costs $299 USD/year and not all organizations are eligible
    -   Apps signed with an ad hoc provisioning profile can be installed by an iOS devices whose UDID is registered with the provisioning profile
    -   `eas device:create` - used to register more iOS devices and gives a URL/QR code to share for device registration
    -   `eas build:resign` - command that can be used to re-sign an existing iOS .ipa with a new ad hoc provisioning profile, eliminate the need for a full rebuild

# Ch. 16: Manage app versions

-   an app version is composed of:
    1. developer facing value
        - represented by `versionCode` for Android
        - represented by `buildNumber` for iOS
        - relied on to identify each unique build
            - if an app is uploaded with a certain app version, another build cannot be submitted with the same app version
                - submitting builds with duplicate app version numbers results in a failed submission
        - located in app.config.js
        - EAS Build automates adding and managing these values
            - utilizes [remote version source](https://docs.expo.dev/build-reference/app-versions/#remote-version-source) to automatically increment the developer facing values whenever a new production release is made
                - need to set `cli.appVersionSource` to remote in eas.json and `autoIncrement` property to true under the production build profile to enable
                    - EAS CLI automatically adds the properties when a project is initialized with `eas init`
        - when migrating an app to use EAS Build, run `eas build:version:set`
            - select the platform when prompted (Android or iOS)
            - select "yes" to "Do you want ot set app version source to remote now?" to set the cli.appVersionSource to remote in eas.json
            - enter the last version numbner set in the app stores when prompted with "What version would you like to initialize with?"
            - syncs app versions to EAS Build remotely
                - setting build.production.autoIncrement to true in eas.json automatically increments the developer facing values automatically when you create a new production build
    2. user facing value
        - represented by `version` in app.config.js
        - not handled by EAS
        - defined in the app store developer portals before submitting the production app for review

## Ch. 17: Android production build

-   publishing and distributing an app on the Google Play Store requirements:
    1. [Google Play Developer Account (paid)](https://play.google.com/apps/publish/signup/)
    2. [Google Service Account key](https://expo.fyi/creating-google-service-account)
        - required for automating the release process, optional otherwise
    3. Production build profile
        - Added by default, but should be ensured that it is present in eas.json
-   a production Android build is in .aab format
    -   optimized for distribution on the Google Play Store
    -   .aab files can only be distributed and installed through the Google Play Store
-   can use [EAS Submit](https://docs.expo.dev/submit/introduction/) to automate releasese and avoid the manual process
    1. Add service account key to project's eas.json
        1. Copy the JSON file from Google Service Account to the project's root directory
        2. Exclude the file from version control by listing it in .gitignore
    2. for internal release, add the path to the Google Service Account fiel path in eas.json
        1. `submit.production` profile, add `android.serviceAccountKeyPath` and the relative file path as its value
        2. Adding the "track" property
            - setting its value to "internal" enables `eas submit` to upload the production build and release it for internal testing on the Google Play Store
            - setting its value to "production" releases the app for production
        3. `eas submit --platform android` - automatically creates a neww internal release version in the Google Play console
-   using the `--auto-submit` flag with `eas build` streamlines the process of subsequent releases by combining build creation and Play Store submission into a single step
    -   `eas build --platform android --auto-submit`

## Ch. 18: Create a production build for iOS

-   [Apple Developer Portal](https://developer.apple.com/account/)
-   produciton build profile
    -   in eas.json
    -   added by default
-   production iOS build - optimized for Apple's App Store Connect
    -   Apple's App Store Connect - allows distributing builds to testers with TestFlight and public end users through the App Store
    -   build type cannot be side-loaded on a simulator or device
    -   build type can only be distributed through App Store Connect
-   distribution provisioning profile
    -   run the `eas credentials` command in the terminal
        -   Platform? iOS
        -   Build Profile? production
        -   Log in to Apple Account? Y -> log in to Apple Developer Account
        -   Want to do? build credentials -> All: Set up all the required credentials to build your product
        -   Reuse previous Distribution Certificate? Y
        -   Generate a new Apple Provisioning Profile? Y -> creates the provisioning profile for the production app -> cntrl + c to exit EAS CLI
-   `eas build --platform ios` - creates an iOS produc tion build using the default production profile
    -   no need to explicitly specify production with the `--profile` flag because production is set as the default profile in the EAS configuration
    -   command queues the build and auto increments the Build Number if configured to do so
-   `eas submit --platform ios` - submits the app binary created from the latest EAS build
    -   needs to select the latest build id
    -   after logging into the Apple account, Y to reuse this App Store Connect API Key to trigger the submission process
-   `eas build --platform ios --auto-submit` - combines build creation and App Store submission into a sigle step

## Ch. 19: Share previews with your team

-   EAS Update - allows sharing changes with a team
    -   `eas update:configure` - command that adds the "updates" and "runtimeVersion" properties with their values from EAS to make a project compatible with EAS Update
        -   using dynamic app.config.js, manually copy the values to app.config.js before rerunning `eas update:configure` to continue the setup process
        -   a channel should be added to every build profile in eas.json (ex. "channel": "development")
            -   if a build profile extends another profile, removing the added "channel" property safely prevents the profile from having a separate channel
            -   channel - a name given to multiple builds used to group builds together and identify them easily
                -   defined in eas.json
                -   allows telling EAS Update to target a specific channel, which causes the update to affect all builds with the same specific channel
-   expo-updates - library that allows initialiizing a project and sending updates
    -   `npx expo install expo-updates`
    -   a new development build needs to be created, since hte last build does not contain the expo-updates library
        -   `eas build --platform all --profile development`
            -   all can be ios or android for a specific platform
    -   `eas update --channel development --message "Message"` - updates the builds with the specified channel of development
        -   when an EAS Update chanel is made, it automatically gets mapped to a branch with the same name
        -   the CLI prompts with information about an update after it is published
-   Steps to preview a live update in a development build:
    1.  log in to the Expo account within the development build
    2.  open the Extensions tab
    3.  look for Branch: development listed under EAS Update
    4.  tap on Open to access the update
-   updates for non-development builds like preview or production are automatically downloaded to the device when the app starts up and makes a request for any new updates
    -   to test an update when the app is currently open, force close and reopen the app twice to download and view the changes

## Ch. 20: Configure Expo GitHub app

-   Open the Connect GitHub accounts page by going to expo.dev/settings in the EAS dashboard under Connections > GitHub > Connect
-   Click the Get started button which opens a popup to authorize the Expo GitHub app > Click Install and Authorize
-   Click Link installation once the app is installed on the GitHub account to link it to the Expo account
    -   when linked, it will show under GitHub
-   Connect a GitHub repositroy to a project in the EAS dashboard to enable triggering builds from the repository
    -   EAS dashboard > Projects > Select project > Project Settings > GitHub
    -   Connect a GitHub repository (lists GitHub repos) > Connect the correct project repository
-   Expo GitHub app needs to know where to find the source code for a project and selects the root directory using "/" as default
-   Expo GitHub app provides [multiple options](https://docs.expo.dev/build/building-from-github/#trigger-a-build-from-github) to trigger a build:
    -   manually from teh builds page for a specific platform
    -   automatically when new code is pushed to the repository
    -   automatically using GitHub PR labels
-   to automatically trigger a build using a GitHub PR label, specify the build image in eas.json
    -   add android.image and ios.image properties and set their values to "latest"
    -   create a new branch called dev
    -   after a change is made, commit and push it, and create a PR from that branch
    -   under labels in the PR link, create a label called "eas-build-all:development"
    -   the Expo GitHub app will start the process of creating a developmetn build once "Create pull request" button is pressed

## References

1. [Expo tutorial](https://docs.expo.dev/tutorial/introduction/)
2. [EAS tutorial](https://docs.expo.dev/tutorial/eas/introduction/)
3. [How EAS Update works](https://docs.expo.dev/eas-update/how-it-works/)
