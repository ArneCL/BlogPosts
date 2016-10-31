title: Swift 3 and iOS: Simple UITableView and UITableViewController with expandable sections
tags: ios,swift,ios-uitableview

You can animate expanding sections by adding or removing all the rows in that section.

Create a UIViewController in your storyboard with a UITableView and a UITableViewCell named `LabelCell`. Give it a custom class like below.


    class SomeViewController : UIViewController, UITableViewDataSource, UITableViewDelegate {

        @IBOutlet var tableView:UITableView?
        var hidden:[Bool] = [true, true]

        func numberOfSections(in tableView: UITableView) -> Int {
            return 2
        }

        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = tableView.dequeueReusableCell(withIdentifier: "LabelCell", for: indexPath)
            cell.textLabel?.text = "A row!"
            return cell
        }

        func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
            return 30
        }
    ...

This is fairly basic. It has an table view IBOutlet. It returns two sections, creates a reusable row cell as named above, and defines the section height as 30 pixels (I'm sure there's an autolayout fix here...) The `hidden` property is the only interesting one. It's a list of the hidden sections. We're hiding everything currently.

Let's look at the code that creates the section header:

      func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
          let label = UILabel()
          label.textAlignment = .left
          label.text = "I'm a test label"
          label.tag = section

          let tap = UITapGestureRecognizer(target: self, action: #selector(SomeViewController.tapFunction))
          label.isUserInteractionEnabled = true
          label.addGestureRecognizer(tap)

          return label
      }

It creates a `UILabel` which has a tag as the section number, and gives that a tap recogniser. Let's look at the tap recogniser method:

      func tapFunction(sender:UITapGestureRecognizer) {
          let section = sender.view!.tag
          let indexPaths = (0..<3).map { i in return IndexPath(item: i, section: section)  }

          hidden[section] = !hidden[section]

          tableView?.beginUpdates()
          if hidden[section] {
              tableView?.deleteRows(at: indexPaths, with: .fade)
          } else {
              tableView?.insertRows(at: indexPaths, with: .fade)
          }
          tableView?.endUpdates()
      }

This toggles the section's hidden property, then depending on that animates adding or removing that section's rows. It gets the section number from the view tag that we set above, and creates index paths to define the rows we want to remove or add.

You'll notice the `0..<3`. The three would vary depending on your section's rows. In our case we're hard coding three as seen below:

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if hidden[section] {
            return 0
        } else {
            return 3
        }
    }

In `numberOfRowsInSection` when we're hiding a section we show zero rows for that, otherwise we show three, or however many are in your table.

And voila.
