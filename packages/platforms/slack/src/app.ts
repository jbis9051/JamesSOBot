import {SlackClient} from './SlackClient';

const slackClient = new SlackClient();
slackClient.init().then(() => console.log("ready"));
