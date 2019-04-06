title: Android: RxJava BehaviorSubject
tags: android-rxjava,android

If you want to subcribe to something, and receive the last thing that was emitted, and then subscribe to further things, use `BehaviorSubject`:

```
BehaviorSubject<String> bs = BehaviorSubject.create();
bs.onNext("one");
bs.onNext("two");
bs.onNext("three");
bs.subscribe(value -> {
    Log.d("HIYA", "Found " + value);
});
bs.onNext("four");
```

It will print `Found three` and `Found four` only.
