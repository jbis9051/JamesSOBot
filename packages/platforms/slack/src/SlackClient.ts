import { Bot, Client, Message } from '@chatbot/bot';
import { WebAPICallResult, WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';
import { SlackEventAdapter } from '@slack/events-api/dist/adapter';
import events from 'events';
import { SlackMessage } from './interfaces/SlackMessage';

const port = parseInt(process.env.PORT!, 10) || 3000;

export class SlackClient extends Client {
    private token: string = process.env.SLACK_TOKEN!;

    private id = '';

    private slackSigningSecret: string = process.env.SLACK_SIGNING_SECRET!;

    private name = 'JamesBot';

    private events: SlackEventAdapter &
        events.EventEmitter = createEventAdapter(
        this.slackSigningSecret
    ) as any;

    private bot: Bot;

    private web: WebClient;

    constructor(bot: Bot) {
        super();
        this.bot = bot;
        this.web = new WebClient(this.token);
        this.events.on('message', this.handleMessage.bind(this));
    }

    async init() {
        await this.events.start(port);
        const resp = await this.web.auth.test();
        this.id = resp.user_id as string;
        this.bot.clientFunctions.forEach((func) => func(this));
    }

    async handleMessage(e: SlackMessage) {
        if (e.subtype) {
            return;
        }
        const message = new Message(
            {
                id: e.ts,
                rawContent: e.text,
                content: this.bot.htmldecode(e.text),
                contextId: e.channel,
                fromId: e.user,
                fromName: e.user,
                appData: e,
            },
            this,
            this.bot
        );
        /* if (e.channel === "C0266FRGV") {
     return;
 } */
        this.bot.processMessage(message, this);
    }

    isMyMessage(msg: Message): boolean {
        return msg.info.fromId === this.id;
    }

    async isRoomOwnerId(staticUID: string, context: Message): Promise<boolean> {
        const response = await this.web.users.info({ user: staticUID });
        return (response.user as any).is_admin;
    }

    send(
        content: string,
        context: string | Message,
        options: any = {}
    ): Promise<WebAPICallResult> {
        const channel =
            typeof context === 'string' ? context : context.info.contextId;
        return this.web.chat.postMessage({
            text: content,
            channel,
            thread_ts:
                typeof context === 'string'
                    ? undefined
                    : context.info.appData.thread_ts,
            ...options,
        });
    }

    hardReply(
        content: string,
        context: string | Message
    ): Promise<WebAPICallResult> {
        const pingString =
            typeof context === 'string' ? context : this.getPingString(context);
        return this.send(`${pingString} ${content}`, context);
    }

    softReply(
        content: string,
        context: string | Message
    ): Promise<WebAPICallResult> {
        const pingString =
            typeof context === 'string' ? context : this.getPingString(context);
        return this.send(`${pingString} ${content}`, context);
    }

    delete(msg: Message): Promise<void> {
        throw new Error('Method not implemented.');
    }

    edit(content: string, context: Message): Promise<void> {
        throw new Error('Method not implemented.');
    }

    moveTo(message: Message, to: any): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async usernameToId(username: string, context: Message) {
        const match = username.match(/<@([A-Z0-9]+)>/);
        if (match) {
            return match[1];
        }
        return undefined;
    }

    getPingString(msg: Message) {
        return `<@${msg.info.fromId}>`;
    }

    link(text: string, url: string) {
        function encode(str: string) {
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        }

        return `<${encode(url)}|${encode(text)}>`;
    }
}
