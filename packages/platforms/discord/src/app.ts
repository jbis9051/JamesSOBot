import { Bot } from '@chatbot/bot';
import {
    mdn,
    evalPlugin,
    errors,
    joke,
    w3schools,
    wiki,
    random,
    betterecho,
    help,
    info,
    status,
    learn,
    funfact,
    adoc,
    calc,
    clapper,
    applesupport,
    selfDestruct,
    obama,
    life,
    kill,
    rules,
    ban,
    timeout,
} from '@chatbot/plugins';
import { DiscordClient } from './DiscordClient';

const bot = new Bot('slack', {
    users_groups: {
        admin: [],
        second: [],
    } as Record<any, any[]>,
    plugin: {
        welcome_msg: {},
        code_check: [],
    },
    client: {},
});

bot.addPlugin(
    mdn,
    evalPlugin,
    obama,
    joke,
    w3schools,
    random,
    wiki,
    betterecho,
    status,
    info,
    learn,
    adoc,
    funfact,
    calc,
    applesupport,
    selfDestruct,
    life,
    kill,
    timeout,
    rules,
    ban,
    help,
    errors
);

const discordClient = new DiscordClient('923120706030551092', bot);
discordClient.init().then(() => console.log('ready'));
