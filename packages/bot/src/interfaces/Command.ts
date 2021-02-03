import { Message, MessageHandler } from "..";
import { Permission } from "./Permission";

export interface Command {
  name: string,
  args: string[],
  description: string,
  shortcuts: Array<string | RegExp>,
  examples: string[],
  creator?: string,
  ignore: boolean
  permissions: Permission[],
  cb: MessageHandler,
}
