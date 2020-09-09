import {Bot, Permission, PermissionType} from '@chatbot/bot';
import {SOClient} from './SOClient';
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
    rules,
    ban,
    timeout
} from '@chatbot/plugins';

const bot = new Bot("so", {
    users_groups: {
        "admin": [
            "7886229",
            "491439471972057089"
        ],
        "second": [
            2172566,
            400654,
            871050
        ]
    } as Record<any, any[]>,
    plugin: {
        "welcome_msg": {
            "193540": "@{USERNAME} Welcome to the Test My Bot chat. Feel free to test @JamesBot using `|| command args` syntax. You can also discuss and ask questions about bot creation.  StackOverflow and StackOverflow Chat rules apply. Be nice and don't ask to ask, just ask. Chat API Documentation can be found [here](https://github.com/jbis9051/JamesSOBot/blob/master/docs/CHAT_API.md)",
            "17": "@{USERNAME} Welcome to the JavaScript chat! Please review the [room rules](https://rlemon.github.com/so-chat-javascript-rules/). If you have a question, just post it, and if anyone's free and interested they'll help. If you want to report an abusive user or a problem in this room, visit our [meta](https://github.com/JavaScriptRoom/culture/)."
        },
        "code_check": [
            17, 193540
        ]
    },
    client: {}
});

bot.addPlugin(mdn, evalPlugin, joke, w3schools, STOP, random, wiki, betterecho, status, info, learn, adoc, funfact, calc, applesupport, selfDestruct, life, kill, timeout, rules, ban, help, errors);


const client = new SOClient("https://stackoverflow.com", "https://chat.stackoverflow.com", [193540, 1, 169987, 15, 17, 7], bot);
client.init().then(() => client.send("I am currently alive", "193540"));

