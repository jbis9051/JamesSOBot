const cheerio = require('cheerio');

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
          /* if anyone wants to pay for API keys, feel free */
         bot.standard_request('https://www.google.com/search?q=' + args.join("%20") + "%20site:developer.mozilla.org", (err, res, body) => {
              try {
                  const $ = cheerio.load(body);
                  const url = $('.r').find('a').attr('href').replace('/url?q=', '').replace(/&sa=.*/, '');
                  if(!url.match(/^https:\/\/developer\.mozilla.org\/.*$/)){
                      console.error('Invalid url ' + url);
                      bot.client.send('An error occurred with the request.');
                  }
                  bot.client.send(url);
              } catch (e) {
                  bot.client.send('An error occurred with the request.');
                  console.error(e);
              }
          });
      },
  })
};
