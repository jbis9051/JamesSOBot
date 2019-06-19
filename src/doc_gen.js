const config = require('../config/config.json');
const {Bot} = require("./bot.js");
const {Client} = require("./Client.js");
let md_doc = `
# Command Documentation

*A better version of the help menu*

----

`;

let defaults = [];
let plugins = [];
const bot = new Bot(new Client("", "", []));
let learned = Object.values(bot.loadData("learn_list"));

config.plugins.forEach(plugin => {
    if (plugin.includes("default/")) {
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
