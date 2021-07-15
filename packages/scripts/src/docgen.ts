import fs from 'fs';
import { Bot, PermissionType } from '@chatbot/bot';
import {
    adoc,
    afk,
    applesupport,
    backup,
    ban,
    betterecho,
    calc,
    choose,
    debug,
    define,
    errors,
    evalPlugin,
    funfact,
    help,
    info,
    joke,
    kill,
    learn,
    life,
    mdn,
    obama,
    random,
    rules,
    selfDestruct,
    stat,
    status,
    STOP,
    timeout,
    timer,
    unformattedCode,
    w3schools,
    welcome,
    wiki,
    man,
} from '@chatbot/plugins';

const bot = new Bot('docs', {
    users_groups: {} as Record<any, any[]>,
    plugin: {},
    client: {},
});

bot.addPlugin(
    backup,
    define,
    errors,
    help,
    info,
    life,
    selfDestruct,
    status,
    welcome,
    evalPlugin,
    adoc,
    afk,
    applesupport,
    ban,
    betterecho,
    calc,
    choose,
    debug,
    funfact,
    joke,
    kill,
    learn,
    mdn,
    obama,
    random,
    rules,
    stat,
    STOP,
    timeout,
    timer,
    unformattedCode,
    w3schools,
    wiki,
    man
);

function getPermName(perm: PermissionType | string) {
    switch (perm) {
        case PermissionType.ALL:
            return 'all';
        case PermissionType.OWNER:
            return 'owner';
        default:
            return perm;
    }
}

let md_doc = `# Command Documentation

*A better version of the help menu*

To interact with the bot simply enter your command with the following prefix:\`||\`.

\`\`\`
|| commandName arg1 arg2 arg3
\`\`\`

The [eval](#eval) command has a shortcut of \`||>\`. See the examples in the eval section for how to use this.
The eval is sandboxed. If you find a vulnerability please contact me or a Room Owner immediately. They will be able to shut down the bot until it is fixed.
----
`;

let plugins = [];

const learned = Object.values(
    new Bot('so', {
        users_groups: {} as Record<any, any[]>,
        plugin: {},
        client: {},
    }).dataStore.getData('learn_list') || {}
);

plugins = Object.values(bot.commands);

plugins.sort(localSort);
learned.sort(localSort);

md_doc += `
# Default Plugins
`;

md_doc += `
# Plugins
`;

plugins.forEach((command) => {
    md_doc += `
## ${command.name}
${command.description}

**Permissions**
${command.permissions.map((el) => `- ${getPermName(el)}`).join('\n')}
           
**Example**
${command.examples.map((el) => `- \`${el}\``).join('\n')}

**Shortcuts**
${command.shortcuts.map((el) => `- \`${el}\``).join('\n')}
`;
});
/*
md_doc += `
# Learned Commands
These are commands created by users of the bot, not by me. Many were imported from the previous bot. I am not responsible for these commands, however, if you find one that is offensive and/or against Stack Exchange's policy please open an issue and it may be removed.
`;

learned.forEach((command: any) => {
    md_doc += `
## \`|| ${command.name}\`
${command.description}
**Creator:** ${command.creator}
**Creator ID:** ${command.creatorID}
**Date Created:** ${command.date_created}
`;
}); */

fs.writeFileSync(`${__dirname}/../../docs/COMMANDS.md`, md_doc);

function localSort(a: any, b: any) {
    return a.name.localeCompare(b.name);
}
