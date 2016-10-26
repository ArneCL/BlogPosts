title: Swift 3, iOS and Xcode 8: UISplitViewController
tags: swift,ios

`UISplitViewController` is similar to the `UINavigationController` on the iPhone: it shows a master page and you can navigate to child views. However, on the iPad and suchlike the master and detail pages can be shown side-by-side.

Drag one onto your storyboard. It will create four controllers. The `UISplitViewController` has a "master view controller" relationship to a `UINavigationController` and a "detail view" relationship to a normal `UIViewController`. The `UINavigationController` has a "root view controller" relationship to a `UITableViewController`.

Let's create a custom class for the `UITableViewController` which will just show a normal table:

    class SplitTableController : UITableViewController {

        override func numberOfSections(in tableView: UITableView) -> Int {
            return 1
        }

        override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            return 5
        }

        override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = tableView.dequeueReusableCell(withIdentifier: "LabelCell", for: indexPath)
            cell.textLabel?.text = "Section \(indexPath.section) Row \(indexPath.row)"
            return cell
        }

        override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
            return "Section \(section)"
        }

        override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
            self.performSegue(withIdentifier: "showDetail", sender: nil)
        }
    }

Opening the app won't do something, except show the detail view controller first, and you'll be able to back out to our table as populated above. 

Let's drag a "show detail" segue, called "showDetail", from the `UITableViewController` to normal view controller working as our detail view. Now create a method that does something with that segue:

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.performSegue(withIdentifier: "showDetail", sender: nil)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showDetail" {
            let index = self.tableView.indexPathForSelectedRow! as NSIndexPath
            let vc = segue.destination as! SplitDetailController
            vc.name = "hiya: "+String(index.row)
        }
    }

This assumes you've created a custom class for our destination view controller called `SplitDetailController` and it has a outlet called `name`, which affects the view somehow. So create that now.

When you open the app now, the same will happen as before, except when you back out into the master view controller, you'll be able to click on a cell and affect, and go to, the destination view controller as above.
