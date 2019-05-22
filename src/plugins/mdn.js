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
      func: (msg) => {
          if (msg.args.length < 1) {
              bot.client.send("**Missing args**");
              return;
          }
          bot.google_search(msg.args.join(" "), "developer.mozilla.org", null, /^https:\/\/developer\.mozilla\.org\/.*$/,
              (data)=> {
                  if (data) {
                      bot.client.send(data.url);
                  } else {
                      bot.client.send('An error occurred with the request.');
                  }
              });
      },
  })
};
