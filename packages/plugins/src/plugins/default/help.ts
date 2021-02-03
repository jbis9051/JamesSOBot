import { PermissionType, PluginFunction } from '@chatbot/bot';

export const help: PluginFunction = (bot) => {
  bot.addCommand({
      name: 'help',
      args: [],
      description: 'Lists commands',
      shortcuts: ['help'],
      examples: ['|| help'],
      ignore: false,
      permissions: [PermissionType.ALL],
      cb: (msg, client) => {
          client.send(
              `Command documentation and syntax can be found ${client.link(
                  'here',
                  'https://github.com/jbis9051/SO-ChatBot/blob/master/docs/COMMANDS.md'
              )}.`,
              msg
          );
      },
  });
};
