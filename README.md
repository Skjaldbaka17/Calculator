# Calculator - IOS

This is a recreation of the calculator app on IOS-devices made in React Native. Made as an assignment for Smitten.

## Installation

If you do not have react-native installed follow their guide for the react-native CLI: https://reactnative.dev/docs/environment-setup

I used node v. 16.0.0 to initialize and run the application, but any version after 12.0.0 should be ok.

Now for the installation:

Clone this repo.

cd-into the created directory and install dependencies:
```bash
cd Calculator
npm install
```

then run from terminal
```bash
npx react-native run-ios
```

Or if on a Mac open the Calculator/ios project in Xcode and run it from there.

There is a possibility that the above instructions, for running from terminal, will fail with some exit code (i.e. 65) from Xcode. Then do:

```bash
cd ios
pod install
cd ..
```
and then:

```bash
npx react-native run-ios
```

that should do the trick.

## License
[MIT](https://choosealicense.com/licenses/mit/)
