title: Swift 3 and iOS: UIPicker
tags: swift,ios,ios-uipicker

In your view controller, use these delegates `UIPickerViewDelegate`, `UIPickerViewDataSource`. And implement the methods as follows:

    public func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }

    public func pickerView(_ pickerView: UIPickerView,
                           numberOfRowsInComponent component: Int) -> Int {
        return items.count
    }

    public func pickerView(_ pickerView: UIPickerView,
                           titleForRow row: Int,
                           forComponent component: Int) -> String? {
        return items[row]
    }    

The first method says the number of 'components' we have in each picker row. The second gives the items in our picker. And the final one gives the string for the ui picker. The `items` element here is a simple list in swift.

Finally add the picker to your storyboard, control drag it to the icon that represents the view controller, and make the view controller both the delegate and the data source for the picker.

If you want to detect when there's a change in the picker, use this method in your view controller:

    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        // Do something with the row
    }
