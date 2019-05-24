# SO-ChatBot
# Description

I could not find a simple and easy to understand StackExchange chat bot API so I decided to create my own. This can be easily used to create your own bot, simply remove the plugins and add your own!

I am also planning on writing full documentation for the how SO Chat works, as none currently exists. 

# Usage
```
|| command args 
```

**[Bot Documentation Here](https://jbis9051.github.io/SO-ChatBot/documentation.html)**


**[Commands Documentation Here](https://jbis9051.github.io/SO-ChatBot/documentation.html#src/plugins/applesupport.js)**

**Note:** The format for commands on the documentation page is wrong. It is displayed like to make it easier to understand (aka I couldn't figure out how to make it the proper format with the docs generator I am using). Instead it is the format above (`|| command args`). Any return values listed are sent in the chat.
# Plugin API Function Documentation

*More in depth explanation coming soon*

Most plugins will require just a simple `addCommand` function. For more advanced functions see below:

- [RegisterListener](https://jbis9051.github.io/SO-ChatBot/documentation.html#src-bot.js-registerlistener)
- [ClientListener](https://jbis9051.github.io/SO-ChatBot/documentation.html#src-bot.js-registerclientlistener)


```
module.exports = function (bot) {
    bot.addCommand({
        name: "name",
        args: ["some","args"],
        description: "description",
        shortcuts: [ /* aliases of the command */
            "diffname",
            "morenames"
        ],
        ignore: false, /* should be ignored in help menu */
        permissions: ["all"], /* who can run this command */
        func: (msg, args, client, sudo) => {
            if (!sudo) { /* is sudo required? */
              bot.client.send("Try `sudo`");
              return;
            }
            bot.json_request('https://example.com', (err, res, body) => { /* make a JSON request */
                bot.client.send(body.text); /* Send message */
            });
        }
    });
    bot.RegisterListener({ /* register custom listner for the msg */
            func: (msg) =>{ /* returns true if you want to activate the callback, false otherwise
                return (msg.content.toLowerCase().includes("java"));
            },
            callback:(msg) => {
                bot.client.send(`Hey @${msg.user_name}...`); /* get msg's author's username */
                setTimeout(() => bot.client.send(`Did you know...`), 1500);
                setTimeout(() => bot.client.send(`__***3 BILLION DEVICES RUN JAVA***__`), 2000);
            }
        });
       
};

```
