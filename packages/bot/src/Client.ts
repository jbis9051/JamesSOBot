import {Message} from "./models/Message";

export abstract class Client {
    abstract isMyMessage(msg: Message): boolean

    abstract async isRoomOwnerId(staticUID: string, context: Message): Promise<boolean>

    abstract async send(content: string, context: Message): Promise<void>

    abstract async hardReply(content: string, context: Message): Promise<void>

    abstract async softReply(content: string, context: Message): Promise<void>

    abstract async delete(msg: Message): Promise<void>

    abstract async edit(content: string, context: Message): Promise<void>

    abstract async moveTo(message: Message, to: any): Promise<void>

    abstract async usernameToId(username: string, context: Message): Promise<string | undefined>

    abstract getPingString(msg: Message): string

    abstract link(text: string, url: string): string

    abstract codify(text: string): string
}
