import "dotenv/config";


export default {
    "expo": {
        "name": "TuneSwap",
        "slug": "tune-swap-ios",
        "version": "1.4.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "userInterfaceStyle": "light",
        "scheme": "tuneswap",
        "splash": {
            "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "assetBundlePatterns": [
            "**/*"
        ],
        "ios": {
            "supportsTablet": false,
            "bundleIdentifier": "com.gkasdorf.tuneswap",
            "buildNumber": "20",
            "associatedDomains": ["applinks:tuneswap.app"]
        },
        "android": {
            "package": "com.gkasdorf.tuneswap",
            "icon": "./assets/icon.png",
            "adaptiveIcon": {
                "foregroundImage": "./assets/icon.png"
            },
            "intentFilters": [
                {
                    "action": "VIEW",
                    "data": {
                        "scheme": "https",
                        "host": "tuneswap.app"
                    },
                    "category": ["BROWSABLE", "DEFAULT"]
                }
            ],
            "buildNumber": "18",
            "versionCode": "18"
        },
        "web": {
            "favicon": "./assets/favicon.png"
        },
        "runtimeVersion": {
            "policy": "sdkVersion"
        },
        "updates": {
            "url": "https://u.expo.dev/f570499f-39be-4ae1-bc54-bc35def7f87c"
        },
        "extra": {
            "eas": {
                "projectId": "f570499f-39be-4ae1-bc54-bc35def7f87c"
            },

            "apiUrl": process.env.API_URL,
            "appUrl": process.env.APP_URL,
            "admobAppId": process.env.ADMOB_APP_ID,
            "admobBannerId": process.env.ADMOB_BANNER_ID,
            "admobInterId": process.env.ADMOB_INTER_ID,
            "admobRewardedId": process.env.ADMOB_REWARDED_ID,
            "spotifyRedirectUrl": process.env.SPOTIFY_REDIRECT_URL
        },
        "plugins": [
            "expo-apple-authentication",
            [
                "expo-build-properties",
                {
                    "android": {
                        "extraProguardRules": "-keep class com.google.android.gms.internal.consent_sdk.** { *; }"
                    }
                }
            ],
            "./plugins/withAndroidStrategiesPlugin.js",
            "react-native-iap"
        ]
    },
    "react-native-google-mobile-ads": {
        "ios_app_id": "ca-app-pub-6422592423352564~7519899737",
        "user_tracking_usage_description": "This permission will be used to deliver personalized ads to you.",
        "android_app_id": "ca-app-pub-6422592423352564~6022605332"
    }
};
