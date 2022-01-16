/**
 * Remove application specific formatting and use internal STH tags instead.
 * 
 * @param {String} input Text to be formatted
 * @returns {String}
 */
function formatter(input: String): String {
    return input.replace(/\*\*(\w+)\*\*/, '<sth:b>$1</sth:b>')
        .replace(/\*(\w+)\*/, '<sth:i>$1</sth:i>')
        .replace(/~~(\w+)~~/, '<sth:s>$1</sth:s>')
        .replace(/__(\w+)__/, '<sth:u>$1</sth:u>');
}

export default formatter;