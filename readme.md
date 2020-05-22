# My First React Native

## Getting Started

### Prerequisites

You need to add your google maps API key to the file (`android/app/src/main/AndroidManifest.xml`)

```
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>
  
   <!-- You will also only need to add this uses-libray tag -->
   <uses-library android:name="org.apache.http.legacy" android:required="false"/>
</application>
```

For details: [Build configuration on Android: react-native-maps](https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md)


### Installing & Running

```
$ git clone https://github.com/seonkyuKim/My-First-React-Native.git
# cd My-First-React-Native
$ npm install
$ npm run android
```

