CP317-Assignment-2
==================

WLU CP 317 Assignment #3

#####By: Ranadeep Polavarapu, Bruno Salapic, Lee Glendenning, Ryan Burke

Checklist
=========
Requirements
------
*  [✔] A text field or a label with value “Enter postal code”
*  [✔] An input field for the user to enter the postal code, the hint of the input filed is “enter postal code”.
*  [✔] A button with label "Get Location". When the user click on the button, the app makes an http request to a server (specified below) on hopper to retrieve the city and province. The http request must have the form below: http://hopper.wlu.ca/~choang/iPhone/http/getLocationFromFile.php?zip=N2J0A1 The last six characters of the http request are the input entered by the user in the input field.
*  [✔] The response will be displayed in an alert box.

Other Requirements
------
*  [✔] Test your app on the following postal codes: H7A4B6, A1Y1A4, B3K5L8, V3K3V9, N2J0A1, N 2T2J8 (If the postal code is not in the database, the server will say so.)
*  [✔] You must use the jQuery API to make the HTTP requests.
