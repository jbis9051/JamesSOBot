Object.defineProperty(Array.prototype, 'random', {
    value: function () {
        return this[Math.floor(Math.random() * this.length)];
    },

    configurable: true,
    writable: true
});

module.exports = function (bot) {
    bot.addCommand({
        name: "wiki",
        args: ["query"],
        description: "Looks query up on Wikipedia",
        shortcuts: [
            "wiki",
            "lookup",
            "search",
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg, args, client, sudo) => {
            if (args.length < 1) {
                bot.client.send("**Missing args**");
                return;
            }
            bot.json_request('https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&format=json&search=' + args.join("%20"), (err, response, resp) => {
                // the result will look like this:
                // [search_term, [title0], [description0], [link0]]
                // we only asked for one result, so the inner arrays will have only
                // 1 item each
                var res = resp[3][0],
                    found = true;

                if (!res) {
                    found = false;
                    res = [
                        'No result found',
                        'The Wikipedia contains no knowledge of such a thing',
                        'The Gods of Wikipedia did not bless us'
                    ].random();
                }
                bot.client.send(res);
            });
        }
    });
};
