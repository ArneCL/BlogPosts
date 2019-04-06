title: Android: Deep linking basics
tags: android

Let's say you have an Activity in your manifest that has `VIEW` action and that's in the `DEFAULT` and `BROWSABLE` category:

```
<activity android:name=".TwoActivity">
    <intent-filter>
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data android:scheme="https"
            android:host="someurl.com"
            android:path="/new" />
    </intent-filter>
</activity>
```

Note we have a new `data` tag. It has a `scheme` and a `host` and a `path`. It points to a URL.

Now if you make a `<a>` link to `https://someurl.com/new` and press on it in your browser, it will open the above activity.

If you want to open the deep link programmatically you can:

```
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://someurl.com/new"));
startActivity(intent);
```
