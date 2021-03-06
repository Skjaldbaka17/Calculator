# Calculator - IOS

This is a recreation of the calculator app on IOS-devices made as an assignment to test out React Native and compare the framework with Flutter.

### Note

This is my first React Native project, therefore it may include unneccessary files.

## Dependencies:

(for running on ios - Mac)

- [nodeJS](https://nodejs.org/en/), I used node v. 16.0.0 to initialize and run the application, but any version after 12.0.0 should be ok.
- [cocoapods](https://cocoapods.org), v. 1.10.1
```bash
sudo gem install cocoapods
```
- [xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12), tested on version 12.5 

## Installation

Clone this repo.

```bash
git clone https://github.com/Skjaldbaka17/Calculator.git
```

cd-into the created directory and install dependencies:
```bash
cd Calculator
npm install
```

then cd into ./ios and install the pods
```bash
cd ios
pod install
```

cd out of ios and run the app
```bash
cd ..
npx react-native run-ios
```

Or open the Calculator/ios project in Xcode and run it from there.

## License
[MIT](https://choosealicense.com/licenses/mit/)
