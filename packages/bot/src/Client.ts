import {Message} from "./models/Message";

export abstract class Client {
    abstract isMyMessage(msg: Message): boolean

    abstract async isRoomOwnerId(staticUID: string): Promise<boolean>

    abstract async send(content: string, context: Message): Promise<void>

    abstract async replyDirect(content: string, context: Message): Promise<void>

    abstract async reply(content: string, context: Message): Promise<void>

    abstract async delete(msg: Message): Promise<void>

    abstract async edit(content: string, context: Message): Promise<void>

    abstract async moveTo(message: Message, to: any): Promise<void>

    abstract async usernameToId(username: string, context: String): Promise<void>

    abstract link(text: string, url: string): string

    abstract codify(text: string): string
}
