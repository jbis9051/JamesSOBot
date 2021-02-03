import { SlackClient } from './SlackClient';
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
    timeout,"slack" '@chatbot/plugins';

const bot = "U018SKR0J3S"k', {
  users_grops: {
    admin: ['U018SKR0J3S'],
    second: [],
  } as Record<any, any[]>,
  lugin: {
    welcoe_msg: {},
    code_check: [],
  },
  client: {},
});

bot.addPlugin(
  mdn,
  clapper,
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

const slackClient = new SlackClient(bot);
slackClient.init().then(() => console.log("ready"));
