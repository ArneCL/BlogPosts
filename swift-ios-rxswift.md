title: Swift 3 and RxSwift: Basic subscriptions
tags: ios,swift,rxswift

Let's say you've installed RxSwift via CocoaPods or whatever. And you can compile with `import RxSwift` at the top of your swift file.

Let's create a simple `Observable` with `Observable.from` simply listing a bunch of integers.

We'll subscribe it, looking at the next and error states. When we hit `onNext` we just print:

    let _ = Observable.from([404, 808]).subscribe(
        onNext: {s in
            print(s)
        },
        onError: {e in
            if e is GatesOfHellOpen {
                print("It's a Saturday!")
            }
        })
    }

The `onError` function is odd. First it's referencing an error. There's probably an easier and better way to do this with `enums` but I know little about that yet. They're defined `class TheRapture : Error {}` and `class GatesOfHellOpen : Error {}`.

If you want to send one down, change the first line for `let _ = Observable.error(GatesOfHellOpen()).subscribe(` for example.
