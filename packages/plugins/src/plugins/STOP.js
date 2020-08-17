module.exports = function (bot) {
    const hammers = {
        STOP: 'HAMMERTIME!',
        STAHP: 'HAMMAHTIME!',
        HALT: 'HAMMERZEIT!',
        STOY: 'ZABIVAT\' VREMYA!',
        SISTITE: 'MALLEUS TEMPUS!'
    };
    const re = new RegExp(
        '([\\s.]+|^)(' +
        Object.keys(hammers).map(escape).join('|') +
        ')[\\.!?]?$'
    );
    bot.RegisterListener({
        func: msg => true,
        callback: (msg) => {
            const sentence = msg.getContent().toUpperCase(),
                res = re.exec(sentence);

            if (res) {
                msg.roomContext.send(hammers[res[2]]);
            }
        }
    })
};

// takes a string and escapes any special regexp characters
function escape(str) {
    // do I smell irony?
    return str.replace(/[-^$\\\/\.*+?()[\]{}|]/g, '\\$&');
    // using a character class to get away with escaping some things. the - in
    // the beginning doesn't denote a range because it only denotes one when
    // it's in the middle of a class, and the ^ doesn't mean negation because
    // it's not in the beginning of the class
}
