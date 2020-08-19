import {Bot, Client, Message} from '@chatbot/bot';
import {RTMClient} from '@slack/rtm-api';
import {SlackMessage} from "./interfaces/SlackMessage";
import {WebAPICallResult, WebClient} from '@slack/web-api';

export class SlackClient extends Client {
    private token: string = process.env.SLACK_TOKEN!;
    private name: string = "JamesBot";
    private rtm: RTMClient = new RTMClient(this.token);
    private bot: Bot;
    private web: WebClient;

    constructor(bot: Bot) {
        super();
        this.bot = bot;
        this.web = new WebClient(this.token);
        this.rtm.on('message', this.handleMessage.bind(this));
    }


    init() {
        return this.rtm.start();
    }

    async handleMessage(e: SlackMessage) {
        if (e.subtype) {
            return;
        }
        const message = new Message({
            id: e.ts,
            rawContent: e.text,
            content: this.bot.htmldecode(e.text),
            contextId: e.channel,
            fromId: e.user,
            fromName: e.user,
            appData: e,
        }, this, this.bot);
        if (e.channel === "C0266FRGV") {
            return;
        }
        this.bot.processMessage(message, this);
    }

    isMyMessage(msg: Message): boolean {
        return msg.info.fromId === this.rtm.activeUserId;
    }

    async isRoomOwnerId(staticUID: string, context: Message): Promise<boolean> {
        const response = await this.web.users.info({user: staticUID});
        return (response.user as any).is_admin;
    }

    send(content: string, context: string | Message, options: any = {}): Promise<WebAPICallResult> {
        const channel = typeof context === "string" ? context : context.info.contextId;
        return this.web.chat.postMessage({
            text: content,
            channel: channel,
            thread_ts: typeof context === "string" ? undefined : context.info.appData.thread_ts,
            ...options,
        });
    }

    hardReply(content: string, context: string | Message): Promise<WebAPICallResult> {
        const pingString = typeof context === "string" ? context : this.getPingString(context);
        return this.send(`${pingString} ${content}`, context);
    }

    softReply(content: string, context: string | Message): Promise<WebAPICallResult> {
        const pingString = typeof context === "string" ? context : this.getPingString(context);
        return this.send(`${pingString} ${content}`, context);
    }

    delete(msg: Message): Promise<void> {
        throw new Error("Method not implemented.");
    }

    edit(content: string, context: Message): Promise<void> {
        throw new Error("Method not implemented.");
    }

    moveTo(message: Message, to: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    usernameToId(username: string, context: Message): Promise<string | undefined> {
        throw new Error("Method not implemented.");
    }

    getPingString(msg: Message): string {
        return `<@${msg.info.fromId}>`;
    }

    link(text: string, url: string) {
        return `<${url}|${text}>`
    }
}
