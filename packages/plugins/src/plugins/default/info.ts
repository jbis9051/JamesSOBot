import { PermissionType, PluginFunction } from '@chatbot/bot';

export const info: PluginFunction = (bot) => {
  bot.addCommand({
      name: 'info',
      args: [],
      description: 'Gives information about the bot',
      shortcuts: ['info'],
      examples: ['|| info'],
      ignore: false,
      permissions: [PermissionType.ALL],
      cb: (msg, client) => {
          client.send(
              `I'm a bot. I am owned and operated by ${client.link(
                  '@JBis',
                  'https://stackoverflow.com/users/7886229/jbis'
              )}. I am ${client.link(
                  'open source',
                  'https://github.com/jbis9051/SO-ChatBot/'
              )}. I am written in JavaScript.`,
              msg
          );
      },
  });
};
