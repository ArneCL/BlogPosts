title: Android: A debug build signed with a constant keystore
tags: android,android-keystore,keytool

Each debug build of your android application will be signed with the debug keystore.

This is a problem because in continous integration environments, like travis-ci or docker, the debug keystore is regenerated on each creation of the environment.

This means if someone has a debug version of your application, they won't be able to upgrade to a more recent version, because the keystores will be different.

To get around this, let's create and add a keystore to our repository for continuous integration environments. Create this in the `app/` directory. And ensure the key password is the same as the keystore password.

    keytool -genkey -v -keystore ci-key.keystore -alias ci-key-alias -keyalg RSA -keysize 2048 -validity 10000

Now in your `app/build.gradle` file add this to the android block:

    signingConfigs {
      ci {
        keyAlias "ci-key-alias"
        keyPassword System.getEnv("CI_KEYSTORE_PASSWORD")
        storeFile "ci-key.keystore"
        storePassword System.getEnv("CI_KEYSTORE_PASSWORD")
      }
    }

We give it the alias and reference to the file we created. We'll get the keystore key from the environment, one injected into the contiuous integration environment, for example.

In the same `android` block, create a new build variant, initalised as the debug variable, called `debug_with_ci_keystore`:

    buildTypes {
        debug_with_ci_keystore.initWith(buildTypes.debug)
        debug_with_ci_keystore {
            if(System.getenv("CI_KEYSTORE_PASSWORD")) signingConfig signingConfigs.ci
            minifyEnabled false
        }
    ...
    }

We give the variant the `ci` signing config above if we have the correct environment variable, `CI_KEYSTORE_PASSWORD`. This means, if we don't, we only create `app/build/outputs/apk/app-debug_with_ci_keystore-unsigned.apk`, not the signed `app-debug_with_ci_keystore.apk`.

Now on `./gradlew build`, if we have `CI_KEYSTORE_PASSWORD` set in our environment, we will create `app/build/outputs/apk/app-debug_with_ci_keystore.apk`, which will have a constant keystore.

The above obviously works for a release signing: just change the build type to `release`, although you may not want to keep your release keystore in your repository.
