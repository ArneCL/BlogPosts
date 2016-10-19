title: Swift 3 and iOS: Using a UIViewTable
tags: ios,ios-uiviewtable,swift

First create a normal `UIViewController`. It could be a `UITableViewController`, but by using the `UITableViewDataSource` and `UITableViewDelegate` protocols we achieve the desired effect:

    class ATableViewController : UIViewController, UITableViewDataSource, UITableViewDelegate {

        func numberOfSections(in tableView: UITableView) -> Int {
            return 3
        }

        func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            return 3
        }

        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = tableView.dequeueReusableCell(withIdentifier: "LabelCell", for: indexPath)

            cell.textLabel?.text = "Section \(indexPath.section) Row \(indexPath.row)"

            return cell
        }

        func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
            return "Section \(section)"
        }

    }

The first method is the number of section headers in the table view. The second is the rows in each section. And the fourth returns the title for each of our three sections.

The third method says: "Get a named cell for the row we want". We then give that some text and finally return that.

Next create a `UIViewController` in your storyboard. Give it a `custom class` as the one you just created above. Then to its view add a `UITableView`. Give that auto layout margins to match its parent if you're using auto layout.

Within that `UITableView` add a `UITableViewCell` and give that a `Restoration Identifier` as `LabelCell`, as referenced above.

From this point, once you goto that controller, you should see your table view.
