title: Swift 3 and RxSwift: Wrapping a URLRequest in RxSwift.
tags: swift,ios,rxswift

Let's assume we have request called `r`, let's first create an `Observable`:

    let ob:Observable<Something> = Observable.create { observer in
        let task = URLSession.shared.dataTask(with: r) { data, response, error in 
            ...
        }
        task.resume()
        
        return Disposables.create {
            task.cancel()
        }        
    }
    .subscribeOn(ConcurrentDispatchQueueScheduler(globalConcurrentQueueQOS: .background))
    .observeOn(MainScheduler.instance)
    
We're starting the task in our observable, and returning a `Disposable` that simply cancels our task. And we're subscribing the a scheduler suitable for background tasks, and observing in our main thread.

These are the bare bones of our RxSwift stuff, but we're not actually doing anything with the task, we're not returning either `onNext` or an error. Let's do that:

    if let e = error {
        observer.onError(e)
    } else if let r = response as? HTTPURLResponse {
        if(r.statusCode >= 200 && r.statusCode < 300) {
            if let d = data {
                observer.onNext(Response(data: d, response: r))
            } else {
                observer.onNext(Response(data: Data(), response: r))
            }
        } else {
            observer.onError(ResponseError(data: Data(), response: r))
        }
    } else {
        observer.onError(ResponseError(data: Data(), response: HTTPURLResponse()))
    }

Firstly, we're looking for an error, and if there's one, we return that, otherwise if we have a response, we look at the status codes, and return as appropriate.

`Response` and `ResponseError` are simple data objects, and you probably want to do something with `Observable.onComplete`.

This is mostly stolen from [here] (https://medium.com/@gonzalezreal/consuming-web-services-with-swift-and-rx-71b87b0f9a4e#.o2sjtb6jd).
