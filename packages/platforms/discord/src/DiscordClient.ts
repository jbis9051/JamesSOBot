import * as Discord from 'discord.js';

import { Bot, Client, Message } from '@chatbot/bot';

export class DiscordClient extends Client {
    private token: string = process.env.DISCORD_TOKEN!;

    private id = '';

    private name = 'JamesBot';

    private mainRoomName: string;

    private mainRoom: Discord.TextChannel | undefined;

    private bot: Bot;

    private discordClient: Discord.Client;

    constructor(mainRoomName: string, bot: Bot) {
        super();
        this.bot = bot;
        this.mainRoomName = mainRoomName;
        this.discordClient = new Discord.Client({
            intents: [
                Discord.Intents.FLAGS.GUILDS,
                Discord.Intents.FLAGS.GUILD_MESSAGES,
            ],
        });
        this.discordClient.on('ready', () => this.ready());
        this.discordClient.on('message', (msg: Discord.Message) =>
            this.handleMessage(msg)
        );
    }

    async ready() {
        this.id = this.discordClient.user!.id;
        this.mainRoom = (await this.discordClient.channels.fetch(
            this.mainRoomName
        )) as Discord.TextChannel;
        /* this.discordClient.user.setPresence({
            game: {
                name: `Selling Your Data`,
                type: 'Streaming',
                url: 'https://facebook.com',
            },
        }); */
        this.discordClient.user!.setUsername('JamesBot');
    }

    async init() {
        this.bot.clientFunctions.forEach((func) => func(this));
        await this.discordClient.login(this.token);
    }

    async handleMessage(e: Discord.Message) {
        const message = new Message(
            {
                id: e.id,
                rawContent: e.content,
                content: e.content,
                contextId: e.channelId,
                fromId: e.author.id,
                fromName: e.author.username,
                appData: e,
            },
            this,
            this.bot
        );
        this.bot.processMessage(message, this);
    }

    isMyMessage(msg: Message): boolean {
        return msg.info.fromId === this.id;
    }

    async isRoomOwnerId(staticUID: string, context: Message): Promise<boolean> {
        return false;
    }

    async send(content: string, context: string | Message): Promise<any> {
        const channelId =
            typeof context === 'string' ? context : context.info.contextId;
        const channel = this.discordClient.channels.cache.get(channelId);
        if (!channel || !channel.isText()) {
            return undefined;
        }
        return channel.send(content);
    }

    hardReply(content: string, context: string | Message): Promise<any> {
        return this.send(content, context);
    }

    softReply(content: string, context: string | Message): Promise<any> {
        return this.send(content, context);
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

        return `[${encode(text)}](${encode(url)})`;
    }

    codify(content: string) {
        return `\`\`\`
        ${content}
        \`\`\`
        `;
    }
}
