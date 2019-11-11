String.prototype.isJSON = function () {
    try {
        JSON.parse(this);
    } catch (e) {
        return false;
    }
    return true;
};
const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
const translate = {
    "nbsp": " ",
    "amp": "&",
    "quot": "\"",
    "lt": "<",
    "gt": ">"
};
String.prototype.htmldecode = function () {
    return this.replace(translate_re, function (match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function (match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
};

const tags_to_markdown = {
    i: '*',
    b: '**',
    strike: '---',
    code: '`',
    a: function (entire_string, tag, innerText) {
        const href = /href="([^"]+?)"/.exec(entire_string);
        if (!href) {
            return entire_string;
        }
        return '[' + innerText + '](' + href[1] + ')';
    }
};
const htmlRe = /<(\S+)[^>]*>([^<]+)<\/\1>/g;

/* adapted from https://github.com/Zirak/SO-ChatBot/blob/d1fa258912a03931bd069406242fcd18721810dd/source/IO.js#L110 */
String.prototype.htmlToMarkdown = function () {
    // A string value is the delimiter (what replaces the tag)


    let delim;
    return this.replace(htmlRe, decodeHtml);

    function decodeHtml(entire_string, tag, innerText) {
        if (!tags_to_markdown.hasOwnProperty(tag)) {
            return entire_string;
        }
        delim = tags_to_markdown[tag];
        if (typeof delim === "function") {
            return tags_to_markdown[tag].apply(tags_to_markdown, [entire_string, tag, innerText]);
        }
        return delim + innerText + delim;
    }
};
