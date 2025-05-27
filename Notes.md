# Expo Notes

## Create your first app

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

## Expo Router Basics

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

## Ch.3

-   `npx expo install <library-name>` - command that installs the library and adds it to the project's dependencies in package.json
-   `@` - symbol that is a custom path alias for importing custom components and other modules instead of relative paths
    -   Expo CLI automatically configures the symbol in tsconfig.json
