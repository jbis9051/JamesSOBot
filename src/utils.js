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
