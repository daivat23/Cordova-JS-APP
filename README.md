1. Install cordova
- on macOS and Linux:
    1. `npm install -g cordova`
- on Windows:
    1. `C:\>npm install -g cordova`

2. Create cordova project

    `cordova create hello com.example.hello HelloWorld`

3. Navigate to project folder
    `cd hello`

4. Add platform (Window/iOS/Android)

    `cordova platform add android`

    `cordova platform add ios`

    `cordova platform add windows`

5. To check your current set of platforms:

    `cordova platform ls`

6. To check if you satisfy requirements for building the platform:

    `cordova requirements`

    Requirements check results for android:
    Java JDK: installed .
    Android SDK: installed
    Android target: installed android-19,android-21,android-22,android-23,Google Inc.:Google APIs:19,Google Inc.:Google APIs (x86 System Image):19,Google Inc.:Google APIs:23
    Gradle: installed

    Requirements check results for ios:
    Apple macOS: not installed
    Cordova tooling for iOS requires Apple macOS
    Error: Some of requirements check failed

7. Build the App

    `cordova build android`

    `cordova build ios`

8. Run the app in window browser

    `cordova run browser`