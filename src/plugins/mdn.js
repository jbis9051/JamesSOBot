module.exports = function (bot) {
  bot.addCommand({
      name: "mdn",
      args: [
          "query"
      ],
      description: "Searches for query on MDN",
      shortcuts: [
          "mdn"
      ],
      ignore: false,
      permissions: ["all"],
      func: (msg, args, sudo) => {
          if (args.length < 1) {
              bot.client.send("**Missing args**");
              return;
          }
          bot.google_search(args.join(" "), "developer.mozilla.org", null, /^https:\/\/developer\.mozilla.org\/.*$/,
              (url)=> {
                  bot.client.send(url || 'An error occurred with the request.');
              });
      },
  })
};
