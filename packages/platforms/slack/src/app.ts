import { SlackClient } from "./SlackClient";
import { Bot } from "@chatbot/bot";
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
  timeout
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

bot.addPlugin(mdn, clapper, evalPlugin, obama, joke, w3schools, random, wiki, betterecho, status, info, learn, adoc, funfact, calc, applesupport, selfDestruct, life, kill, timeout, rules, ban, help, errors);

const slackClient = new SlackClient(bot);
slackClient.init().then(() => console.log("ready"));
