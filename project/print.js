/*
    File: javascript/print.js
    
    Copyright 2011,
    Richard Rasala,
    College of Computer and Information Science
    Northeastern University, Boston, MA 02115
    rasala@ccs.neu.edu
    
    July 20, 2011
*/


/*
This file is essentially the same as the older file

    javascript/jQueryPrint.js

but is independent of jQuery.

Instead, this file uses an object Print
for the namespace in which all functions are defined.

Further, as a convenience, the functions check if the
message argument is a string.  If not, the toString()
method is called on that parameter.
*/


/*
The Print.print function is taken almost verbatim from
jQuery 1.4 Reference Guide
Karl Swedberg and Jonathan Chaffer
PACKT Publishing
pp. 260-261

The Print.print function behaves as follows:

Print.print(message)
First the function searches for a wrapper div with the
id 'print-output'.  If this wrapper does not exist, it
is created at the end of the body.
    
Then the message is placed in its own div with CSS class
'output-message' and this div is appended to the wrapper.

This file also has three more specialized print functions
that are not in Swedberg and Chaffer:

Print.printEncoded(message)
HTML encode the message.
Then pass the result to Print.print.
  
Print.printEncodedInPreTag(message)
HTML encode the message.
Wrap the encoded message in a pre tag pair.
Then pass the result to Print.print.
  
Print.printLines(message, start, stop)
Print the lines in the message starting at
line = start up to but not including
line = stop.

To be consistent with end user conventions,
the first line will have index 1.

Print.printEncodedInPreTag will be used to
print.
  

This file also exposes its helper functions for other possible
uses:

Print.htmlEncode(message)
Return the HTML encoded message.
  
Print.pre(message)
Return the message wrapped in a pre tag pair.
  
Print.preHtmlEncode(message)
Return Print.pre(Print.htmlEncode(message))
  
Print.getLines(s, start, stop)
Return the lines in the string s starting at
line = start up to but not including
line = stop.
*/


// Initialize the Print namespace object.

Print = {};


Print.print = function (message) {
    if (!message)
        return;

    if (typeof message != "string")
        message = message.toString();

    var $output = jQuery('#print-output');

    if ($output.length === 0) {
        $output = jQuery('<div id="print-output"></div>')
            .appendTo('body');
    }

    jQuery('<div class="output-message"></div>')
            .html(message)
            .appendTo($output);
}


/*
The Print.printEncoded  function will:
HTML encode the message.
Then pass the result to Print.print.
*/
Print.printEncoded = function (message) {
    if (!message)
        return;

    if (typeof message != "string")
        message = message.toString();

    Print.print(Print.htmlEncode(message));
}


/*
The Print.printEncodedInPreTag function will:
HTML encode the message.
Wrap the encoded message in a pre tag pair.
Then pass the result to Print.print.
*/
Print.printEncodedInPreTag = function (message) {
    if (!message)
        return;

    if (typeof message != "string")
        message = message.toString();

    Print.print(Print.preHtmlEncode(message));
}


/*
The Print.printLines function will:
Print the lines in the message starting at
line = start up to but not including
line = stop.

To be consistent with end user conventions,
the first line will have index 1.

Print.printEncodedInPreTag will be used to
print.
*/
Print.printLines = function (message, start, stop) {
    if (!message)
        return;

    if (typeof message != "string")
        message = message.toString();

    Print.printEncodedInPreTag(Print.getLines(message, start, stop));
}


/*
Return the HTML encoding of the given message.

Replaces each &, <, >, " with their HTML encodings.
All other characters pass through as is.

Return "" if the given message is null, undefined,
or empty.
*/
Print.htmlEncode = function (message) {
    if (!message)
        return "";

    if (typeof message != "string")
        message = message.toString();

    var encoding = "";
    var length = message.length;

    for (var index = 0; index < length; index++) {
        var c = message.charAt(index);

        if (c == "&")
            encoding = encoding + "&amp;";
        else if (c == "<")
            encoding = encoding + "&lt;";
        else if (c == ">")
            encoding = encoding + "&gt;";
        else if (c == '"')
            encoding = encoding + "&quot;";
        else
            encoding = encoding + c;
    }

    return encoding;
}


/*
Return the message wrapped in a pre tag pair.

Return "" if the given message is null, undefined,
or empty.
*/
Print.pre = function (message) {
    if (!message)
        return "";

    if (typeof message != "string")
        message = message.toString();

    return "<pre>" + message + "</pre>";
}


/*
Return Print.pre(Print.htmlEncode(message))
*/
Print.preHtmlEncode = function (message) {
    if (!message)
        return "";

    if (typeof message != "string")
        message = message.toString();

    return Print.pre(Print.htmlEncode(message));
}


/*
Return the substring of s consisting of the
lines with index i where start <= i < stop.

To be consistent with end user conventions,
the first line will have index 1.

If start is undefined, we set start = 1.

If stop is undefined or stop <= 0, then
we return all lines starting at start.
*/
Print.getLines = function (s, start, stop) {
    if (!s || !(typeof s == "string") || (s.length == 0))
        return "";

    if (!start || !(typeof start == "number") || isNaN(start) || (start < 1))
        start = 1;

    if (!stop || !(typeof stop == "number") || isNaN(stop) || (stop < 1))
        stop = 0;

    if ((stop <= start) && (stop != 0))
        return "";

    var RETURN = "\r";
    var LINEFEED = "\n";

    var length = s.length;
    var position = 0;
    var line = 1;
    var c;

    // Find the first character of the line with index start
    while (line < start) {
        if (position >= length)
            break;

        c = s.charAt(position);

        if (c == RETURN) {
            line++;
            position++;

            c = s.charAt(position);

            if (c == LINEFEED) {
                position++;
            }
        }
        else if (c == LINEFEED) {
            line++;
            position++;
        }
        else {
            position++;
        }
    }

    if (line < start)
        return "";

    if (stop == 0) {
        return s.substring(position);
    }

    var anchor = position;

    // Find the first character of the line with index stop
    while (line < stop) {
        if (position >= length)
            break;

        c = s.charAt(position);

        if (c == RETURN) {
            line++;
            position++;

            c = s.charAt(position);

            if (c == LINEFEED) {
                position++;
            }
        }
        else if (c == LINEFEED) {
            line++;
            position++;
        }
        else {
            position++;
        }
    }

    return s.substring(anchor, position);
}