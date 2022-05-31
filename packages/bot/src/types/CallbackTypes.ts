import { Client } from '../Client';
import { Message } from '../models/Message';

export type MessageHandler<T = void, U extends Client = Client> = (msg: Message, client: U) => T;
