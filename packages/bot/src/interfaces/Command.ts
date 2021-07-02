import { MessageHandler } from '..';
import { Permission } from './Permission';

export interface Command {
    name: string; // Name of the command. Docs only.
    args: string[]; // Docs only.
    description: string; // Docs only.
    shortcuts: Array<string | RegExp>; // Aliases for the command. Name is not automatically included here. The first one should probably be the name of the command.
    examples: string[]; // Docs only
    creator?: string; // Learned commands only
    ignore: boolean; // Should it be included in the docs? False - Included in docs, True - not included in docs
    permissions: Permission[]; // Who can call this command.
    cb: MessageHandler; // The handler for the command
}
