/**
 * Remove application specific formatting and use internal STH tags instead.
 * 
 * @param {String} input Text to be formatted
 * @returns {String}
 */
function formatter(input: String): String {
    return input.replace(/<sth:b>(\w+)\<\/sth:b>/, '**$1**')
        .replace(/<sth:i>(\w+)\<\/sth:i>/, '*$1*')
        .replace(/<sth:s>(\w+)\<\/sth:s>/, '~~$1~~')
        .replace(/<sth:u>(\w+)\<\/sth:u>/, '__$1__');
}

export default formatter;