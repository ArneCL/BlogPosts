Title: Android: Setting network latency
{{wl-tags:android|android-networking}}{{wl-publish: 2012-12-22 17:07:19 -0500 | Denevell }}

You can create network latency on either the emulator via telnet. Telnetting to port 5554 on localhost will give you access to the first emulator connected. (http://developer.android.com/tools/devices/emulator.html#console see there for more information)

Then type 'network status' to see what's currently set. 'network delay [num]' allows you to set it by a predefined about. 'newwork delay gprs' allows you to set the delay to the range gprs would give you.

     $ telnet localhost 5554
     Trying 127.0.0.1...
     Connected to localhost. Escape character is '^]'.
     Android Console: type 'help' for a list of commands
     OK
     network status
     Current network status:
       download speed:          0 bits/s (0.0 KB/s)
       upload speed:            0 bits/s (0.0 KB/s)
       minimum latency:  0 ms
       maximum latency:  0 ms
     OK
     network delay gprs
     OK
     network status
     Current network status:
       download speed:          0 bits/s (0.0 KB/s)
       upload speed:            0 bits/s (0.0 KB/s)
       minimum latency:  150 ms
       maximum latency:  550 ms
     OK
     network delay 7000
     OK
     network status
     Current network status:
       download speed:          0 bits/s (0.0 KB/s)
       upload speed:            0 bits/s (0.0 KB/s)
       minimum latency:  7000 ms
       maximum latency:  7000 ms
     OK

