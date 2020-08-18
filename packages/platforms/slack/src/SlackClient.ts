import {Bot, Client, Message} from '@chatbot/bot';
import {RTMClient} from '@slack/rtm-api';

interface SlackMessage {
    type: "message",
    channel: string,
    text: string,
    ts: string
}

export class SlackClient extends Client {
    private token: string = process.env.SLACK_TOKEN!;
    private name: string = "JamesBot";
    private rtm: RTMClient = new RTMClient(this.token);
    private bot: Bot;

    constructor(bot: Bot) {
        super();
        this.bot = bot;
        this.rtm.on('message', this.handleMessage.bind(this));
    }


    init() {
        return this.rtm.start();
    }

    async handleMessage(e: SlackMessage) {
        const message = new Message({
            id: Date.now;
            rawContent: string;
            content: string;
            messageId: string;
            contextId: string;
            fromId: string;
            fromName: string;
            appData? : T;
        }, this, this.bot)
    }

    isMyMessage(msg: Message): boolean {
        throw new Error("Method not implemented.");
    }

    isRoomOwnerId(staticUID: string, context: Message): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    send(content: string, context: Message): Promise<void> {
        throw new Error("Method not implemented.");
    }

    hardReply(content: string, context: Message): Promise<void> {
        throw new Error("Method not implemented.");
    }

    softReply(content: string, context: Message): Promise<void> {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }

    link(text: string, url: string): string {
        throw new Error("Method not implemented.");
    }

    codify(text: string): string {
        throw new Error("Method not implemented.");
    }

}
