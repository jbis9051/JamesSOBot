import {SlackClient} from './SlackClient';
import {Bot} from "@chatbot/bot";
import {
    mdn,
    evalPlugin,
    errors,
    joke,
    w3schools,
    STOP,
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
    applesupport,
    selfDestruct,
    life,
    kill,
    rules
} from '@chatbot/plugins';

const bot = new Bot("slack", {
    users_groups: {
        "admin": ["U018SKR0J3S"],
        "second": []
    } as Record<any, any[]>,
    plugin: {
        "welcome_msg": {},
        "code_check": []
    },
    client: {}
});

bot.addPlugin(mdn, evalPlugin, joke, w3schools, STOP, random, wiki, betterecho, status, info, learn, adoc, funfact, calc, applesupport, selfDestruct, life, kill, rules, help, errors);

const slackClient = new SlackClient(bot);
slackClient.init().then(() => console.log("ready"));
