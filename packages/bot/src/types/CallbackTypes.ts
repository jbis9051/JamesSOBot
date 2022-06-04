import { Client } from '../Client';
import { Message } from '../models/Message';

export type MessageHandler<T extends Client = Client> = (msg: Message, client: T) => boolean | void | Promise<void>;
