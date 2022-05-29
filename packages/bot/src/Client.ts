import events from 'events';
import { Message } from './models/Message';

export abstract class Client extends events.EventEmitter {
    abstract isMyMessage(msg: Message): boolean;

    abstract isRoomOwnerId(
        staticUID: string,
        context: Message
    ): Promise<boolean>;

    abstract send(
        content: string,
        context: Message | string
    ): Promise<any>;

    abstract hardReply(
        content: string,
        context: Message | string
    ): Promise<any>;

    abstract softReply(
        content: string,
        context: Message | string
    ): Promise<any>;

    abstract delete(msg: Message): Promise<void>;

    abstract edit(
        content: string,
        context: Message | string
    ): Promise<void>;

    abstract moveTo(message: Message, to: any): Promise<void>;

    abstract usernameToId(
        username: string,
        context: Message
    ): Promise<string | undefined>;

    abstract getPingString(msg: Message): string;

    escape(content: string) {
        return content.replace(/([`*_()[\]])/g, '\\$1');
    }

    link(text: string, url: string): string {
        return `[${this.escape(text)}](${url})`;
    }

    codify(content: string): string {
        const tab = '    ';
        const spacified = content.replace('\t', tab);
        const lines = spacified.split(/[\r\n]/g);

        if (lines.length === 1) {
            return `\`${lines[0]}\``;
        }

        return lines.map((line) => tab + line).join('\n');
    }
}
