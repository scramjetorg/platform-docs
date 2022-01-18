/**
 * Remove application specific formatting and use internal STH tags instead.
 * 
 * @param {String} input Text to be formatted
 * @returns {String}
 */
function formatter(input: String): String {
    return input.replace(/<sth:b>(\w+)\<\/sth:b>/, '*$1*')
        .replace(/<sth:i>(\w+)\<\/sth:i>/, '_$1_')
        .replace(/<sth:s>(\w+)\<\/sth:s>/, '~$1~')
        .replace(/<sth:u>(\w+)\<\/sth:u>/, '_$1_');
}

export default formatter;