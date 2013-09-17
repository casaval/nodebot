/**
 * Scripts should use these functions to populate the regex parameter
 * of the listen function in a standardized way.
 */

var config = require("config");
var _ = require("lodash");

// http://stackoverflow.com/a/6969486
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function ensureArray(stringOrArray) {
    if (typeof stringOrArray === "string") {
        return [stringOrArray];
    } else {
        return stringOrArray;
    }
}

function makePrefix(prefixed) {
    if (prefixed === false) {
        return "";
    } else {
        return "(?:"
            + escapeRegExp(config.command_prefix) + " ?"
            + "|"
            + escapeRegExp(config.nickname) + " *[:,]? +"
            + ")"
            + (prefixed === "optional" ? "?" : "");
    }
}

function matchAny(strings) {
    return "(?:"
        + _.map(strings, function (s) { return escapeRegExp(s); }).join("|")
        + ")";
}

exports.only = function (keywords, prefixed) {
    keywords = ensureArray(keywords);

    return new RegExp(
        "PRIVMSG [^ ]+ :" + makePrefix(prefixed) + matchAny(keywords) + "$", "i");
};

exports.any = function(keywords, prefixed){
    keywords = ensureArray(keywords);
        matchAny(keywords, "i");
};

exports.startsWith = function (keywords, prefixed) {
    keywords = ensureArray(keywords);
    return new RegExp(
        "PRIVMSG [^ ]+ :" + makePrefix(prefixed) + matchAny(keywords) + "\\b ?(.*)$", "i");
};

