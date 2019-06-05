# Documentation for Creating Your Own Both

These docs suck. I will make them better later.

## Setup 

1. Install [node](https://nodejs.org/en/)
2. Download this repo
3. Extract the file
4. `cd /path/to/JamesSOBot-master`
5. `npm install`
6. Edit the config file. Enter a username, password, and replace admin user id with your own. 
7. In `app.js`,

 ```javascript
 bot.client = new Client(1);
 ```
change `1` to the room you would like to join. `1` is the sandbox room. `193540` is the Test My Bot Room.

8. Run `node app.js`

You should see a message from the account in the room you selected saying "I am alive!".

## Prefix

Adjust the prefix in `./config/lang.json`.

## Plugins

Commands are loaded through plugins in the plugin folder. Plugins in the `default` folder are recommended and should not be removed. However, the bot WILL work without them. They should be adapted for your use. For example, you should change the welcome messages in `./plugins/default/welcome.js`.

You can remove all the other commands or keep them or change them. 

### Creating Your Own Plugins

The plugin API is both simple and powerful! 

Lets start with the basics. Lets create a command that will reply pong when `|| pong` is run

```javascript
module.exports = function (bot) { /* the bot will be passed through here. No need to import */
    bot.addCommand({ /* we wan't to add a command */
            name: "ping-pong", /* Name the command. This has nothing to do with calling the actual command only with naming it */
            args: [],
            description: "Replies with `Pong!`.",
            shortcuts: [
                "ping" /* Shortcuts */
            ],
            ignore: false, /* we want this command to be displayed in help and other information menus */
            permissions: ["all"], /* everyone can call ping-pong */
            func: async (msg) => {
               await bot.client.send(`Pong!`); /* send the message */
            }
        },
    )
};
```

That wasn't too bad. Lets see what everything does:

#### `name`

This is the name of the command. It is **not** used for calling the command, only for descriptive purposes.

#### `args`

An array of descriptions of args required. Only used for descriptive purposes.

#### `description`

A description of what the command does. Only used for descriptive purposes.

#### `ignore`

Whether the command should be ignored in descriptive and informational menus. Used in the `help` menu plugin.

#### `permissions`

Permissions is an array of groups of users that can use the command. If any match the user, they will be allowed to run the command.

Groups can be specified in `config.json` under user groups.

##### Special Groups

| Name | Description |
| ---- | ------ |
| `all` | Everyone can use the command |
| `OWNER` | Owners of the current room can run this command |

----

Let's take a look at another more complicated example:

```javascript
//TODO finish this
```
