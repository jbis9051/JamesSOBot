import { Client } from "../Client";
import { Message } from "../models/Message";

export type MessageHandler<T = void> = (msg: Message, client: Client) => T
