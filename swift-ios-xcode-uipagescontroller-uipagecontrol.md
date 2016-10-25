title: Swift 3, iOS and Xcode 8: UIPageController and UIPageControl
tags: swift,ios

These two elements allow you to swipe through UIViewControllers with little dots at the bottom of the screen.

First drag a `UIPageController` onto your storyboard. And give it a custom class. That custom class will look like this:

    class MyPagesViewController : UIPageViewController, UIPageViewControllerDelegate, UIPageViewControllerDataSource {

        let pages = ["PagesContentController1", "PagesContentController2"]

        override func viewDidLoad() {
            super.viewDidLoad()
            self.delegate = self
            self.dataSource = self
            
            ...
        }

        func pageViewController(_ pageViewController: UIPageViewController,
                                viewControllerBefore viewController: UIViewController) -> UIViewController? {
          ...
        }

        func pageViewController(_ pageViewController: UIPageViewController,
                                viewControllerAfter viewController: UIViewController) -> UIViewController? {
          ...
        }
    
        func presentationCount(for pageViewController: UIPageViewController) -> Int {
          ...
        }

        func presentationIndex(for pageViewController: UIPageViewController) -> Int {
          ...
        }
    }

We're extending from `UIPageViewController` and we have a delegate and data source protocols for our page view controller. We're setting ourself as the delegate and datasource.

The `pages` array references view controller restoration identifiers. So create two new view controllers in your story board and ensure they have those identifiers. 

The first thing we want to do is initialise our first view controller to show in `viewDidShow`.

      let vc = self.storyboard?.instantiateViewController(withIdentifier: "PagesContentController1")
      setViewControllers([vc!], // Has to be a single item array, unless you're doing double sided stuff I believe
                         direction: .forward,
                         animated: true,
                         completion: nil)

If you start the app now, you'll get your first screen. Our first two delegate methods will allow us to page to the next screen, however:

    func pageViewController(_ pageViewController: UIPageViewController,
                            viewControllerBefore viewController: UIViewController) -> UIViewController? {
        if let identifier = viewController.restorationIdentifier {
            if let index = pages.index(of: identifier) {
                if index > 0 {
                    return self.storyboard?.instantiateViewController(withIdentifier: pages[index-1])
                }
            }
        }
        return nil
    }
    
    func pageViewController(_ pageViewController: UIPageViewController,
                            viewControllerAfter viewController: UIViewController) -> UIViewController? {
        if let identifier = viewController.restorationIdentifier {
            if let index = pages.index(of: identifier) {
                if index < pages.count - 1 {
                    return self.storyboard?.instantiateViewController(withIdentifier: pages[index+1])
                }
            }
        }
        return nil
    }

In both, we look for the restoration identifiers we set previously, then get get the index of such in our `pages` array, and we then return the previous view controller, if we're in the method that says `viewControllerAfter`, otherwise we attempt to go forwards.

The other two delegate methods deal with the `UIPageControl`, which is automatically given to us when we created the `UIPageViewController`, although it does not appear in the storyboard.

    func presentationCount(for pageViewController: UIPageViewController) -> Int {
        return pages.count
    }
    
    func presentationIndex(for pageViewController: UIPageViewController) -> Int {
        if let identifier = viewControllers?.first?.restorationIdentifier {
            if let index = pages.index(of: identifier) {
                return index
            }
        }
        return 0
    }

We're returning the number of pages, and in the latter we look for our current view controller, get its restoration id, and return the index of that to designate the page we're on currently.

Finally, in your storyboad, on the `UIPageViewController` set the transition type to 'scroll', thereby showing those little dots on the bottom of the screen. To make them transparent this voodoo code that I found in a youtube video seems to work:

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        for view in view.subviews {
            if view is UIScrollView {
                view.frame = UIScreen.main.bounds // Why? I don't know.
            }
            else if view is UIPageControl {
                view.backgroundColor = UIColor.clear
            }
        }
    }

And voila.
