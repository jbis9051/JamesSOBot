const levenshtein = require('fast-levenshtein');

module.exports = function (bot) {
    bot.on("invalid-message", msg => {
        msg.roomContext.send('This command conflicts with law #3');
    });
    bot.on("no-command", msg => {
        const commandAliases = [].concat( // deconstruct all of the objects into the contact function to create a single array
            ...Object.values(bot.commands).map(command => command.shortcuts.map(shortcut => { // get the values of all of commands and then extract the shortcuts
                return { // then map them to an object with the shortcut as well as the levenshtein score
                    score: levenshtein.get(shortcut, msg.commandCall),
                    shortcut: shortcut,
                }
            }))
        )
            .sort(((a, b) => a.score - b.score)) // then sort them based on the score
            .slice(0, 3) // then take the first 3
            .map(obj => obj.shortcut); // then map it all back to the shortcut

        msg.roomContext.send('Invalid command! ' + "Did you mean: " + commandAliases.join(", ") + "? " + 'Try `help` for a list of available commands.' + ('.‍'.repeat(Math.random() * 10))); /* there is probably a better way of doing this */
    });
    bot.on("not-authorized", msg => {
        msg.replyDirect("You are not authorized to administer this command");
    });
};
