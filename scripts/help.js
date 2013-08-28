// (c) 2011 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     ~help - output a list of commands

listen(regexFactory.only("help"), function(match, data, replyTo) {
    irc.privmsg(replyTo,
        "No.");
});
