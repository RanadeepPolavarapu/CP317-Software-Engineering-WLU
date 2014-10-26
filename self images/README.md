CP317-Assignment-2
==================

WLU CP 317 Assignment #2

#####By: Ranadeep Polavarapu, Bruno Salapic, Lee Glendenning, Ryan Burke

Checklist
=========
Requirements
------
*  [✖] Step 1: the first level page
*  [✖] Step 2: the second level page
*  [✖] Step 3: the third level pages
*  [✖] For headers and footers, use data-theme = "a". Use only single page files.
*  [✖] Your app should have a custom icon.
*  [✔] You can download the jQuery mobile package.
*  [✔] Your app should work even when the device has no internet connection (local jQuery mobile files).
*  [✖] Add link and script tags to link the JS and CSS jQuery mobile files from local directory.
*  [✖] You can download the jQuery icon pack from here.
*  [✖] Build and zip as `g4a2.zip`.


Bonus
------
*  [✖] The default navigation bar may not always reside at the bottom of the screen. If the content of the page is short (say, a sentence of text), the bar would be at the middle of the screen. Can you put the bar at the bottom regardless of the size of the content?
*  [✖] In the usual jQuery implementation, clicking on a navbar icon loads a new page, thus changing the value of the back button. This is contrary to the expected behaviour of mobile devices which is to change the content of the page but not the page itself (the purpose of a navbar is to present information in parallel, not in a hierarchy). Can you implement this expected behaviour? Hint: give an id to the div of the “content” of the page. A click on a navbar button should trigger a function that changes the content of this id element, perhaps by using the function innerHTML.

TODO
----
*  [✖] If you pursue these improvements (bonus), you should let the instructor know by leaving a message at the submission site and by commenting the codes. Otherwise, the instructor might not be aware of them.

Supplementary Notes
===================
Disable Same-Origin policy (for Chrome)
----------------------------------------
Disable same origin policy:

**OS X**: `open -a Google\ Chrome --args --disable-web-security`  
**Linux**: `google-chrome --disable-web-security`  
**WINDOWS**: `chrome.exe --disable-web-security`  
  
Chrome variation (for Chromium, the parent of Chrome browser): `chromium-browser --disable-web-security`  