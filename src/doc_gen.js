const config = require('../config/config');

const {Bot} = require('./bot.js');
const {Client} = require('./Client.js');

const bot = new Bot([], "fake");

let md_doc = `
# Command Documentation

*A better version of the help menu*

[Learned Commands can be found here](#learned-commands)

To interact with the bot simply enter your command with the following prefix:\`||\`.

\`\`\`
|| commandName arg1 arg2 arg3
\`\`\`

The [eval](#eval) command has a shortcut of \`||>\`. See the examples in the eval section for how to use this.

The eval is sandboxed. If you find a vulnerability please contact me or a Room Owner immediately. They will be able to shut down the bot until it is fixed.

----

`;

let defaults = [];
let plugins = [];

let learned = Object.values((new Bot([], "stackoverflow")).loadData("learn_list"));

config.plugins.forEach(plugin => {
    if (plugin.startsWith("default/")) {
        bot.addCommand = defaults.push.bind(defaults);
    } else if (plugin === "learn.js") {
        return;
    } else {
        bot.addCommand = plugins.push.bind(plugins);
    }
    require('../src/plugins/' + plugin)(bot);
});
bot.addCommand = command => {
    if (command.name === "learn" || command.name === "unlearn") {
        plugins.push(command);
    }
};
require('../src/plugins/learn.js')(bot);


defaults.sort(localSort);
plugins.sort(localSort);
learned.sort(localSort);

md_doc += `
# Default Plugins

`;

defaults.forEach(command => {
    md_doc += `
## ${command.name}

${command.description}

**Permissions**

${command.permissions.map(el => "- " + el).join("\n")}
           
**Example**

${command.examples.map(el => "- \`" + el + "\`").join("\n")}

**Shortcuts**

${command.shortcuts.map(el => "- `" + el + "`").join("\n")}
`
});

md_doc += `
# Plugins

`;


plugins.forEach(command => {
    md_doc += `
## ${command.name}

${command.description}

**Permissions**

${command.permissions.map(el => "- " + el).join("\n")}
           
**Example**

${command.examples.map(el => "- `" + el + "`").join("\n")}

**Shortcuts**

${command.shortcuts.map(el => "- `" + el + "`").join("\n")}
`
});

md_doc += `
# Learned Commands

These are commands created by users of the bot, not by me. Many were imported from the previous bot. I am not responsible for these commands, however, if you find one that is offensive and/or against Stack Exchange's policy please open an issue and it may be removed. 

`;


learned.forEach(command => {
    md_doc += `
## \`|| ${command.name}\`

${command.description}

**Creator:** ${command.creator}

**Creator ID:** ${command.creatorID}

**Date Created:** ${command["date_created"]}

`
});

bot.saveData("documentation_gen.md", md_doc);

function localSort(a, b) {
    return a.name.localeCompare(b.name)
}
