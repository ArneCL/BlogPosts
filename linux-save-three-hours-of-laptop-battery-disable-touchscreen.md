title: Linux: Disable your touchscreen and use TLP to save three hours of laptop battery
tags: unix

Disabling your touch screen is done via `xinput`. I disabled my touchscreen and touchscreen pen whatever that is.

Issue `xinput -list` and then `xinput disable 100`, where 100 is the the ID you found in xinput. That should save you about an hour.

Finally install the `Linux Advanced Power Management`: 

    add-apt-repository ppa:linrunner/tlp
    apt-get update
    apt-get install tlp tlp-rdw
    tlp start

That should save your about two hours.
