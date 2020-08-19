import {Client} from "../Client";
import {Bot} from "../Bot";

export interface IMessage<T = any> {
    id: string,
    rawContent: string;
    content: string;
    contextId: string
    fromId: string,
    fromName: string,
    appData: T
}

export class Message {
    info: IMessage;
    client: Client;
    readonly prefix: string | undefined;
    sudo: boolean;
    commandCall: string | undefined;
    args: string[] = [];
    quotedArgsList: string[] = [];

    constructor(messageProps: IMessage, client: Client, bot: Bot) {
        this.info = messageProps;

        this.client = client;
        const msgSplit = this.info.content.split(" ");
        this.prefix = msgSplit.shift();

        if (this.prefix) {
            const match = this.prefix.match(/^(\|\|>?|!!>?)([^ >]+)/);  // correct commands without space

            if (match) {
                this.prefix = match[1];
                msgSplit.unshift(match[2]);
                this.info.content = this.prefix + " " + msgSplit.join(" ")
            }
        }

        if (msgSplit[0] === "sudo") {
            this.sudo = true;
            msgSplit.shift();
        } else {
            this.sudo = false;
        }

        this.commandCall = msgSplit.shift();
        this.args = msgSplit;
        this.quotedArgsList = Message._quotedArgsSplit(msgSplit.join(" "));
    }

    static _quotedArgsSplit(string: string): string[] {
        return Array.from(
            string
                .matchAll(/(["'])((?:(?!\1).)*)(\1)|([^\s]+)/g) // match all args https://stackoverflow.com/a/8057827/7886229
        )
            .map(matches => {
                if (matches[2]) { // we have a quoter
                    return matches[2].substring(0, matches[2].length) // am i the only one that has to look this up everytime i use it?
                } else {
                    return matches[4] // otherwise just return the match
                }
            });
    }

}
