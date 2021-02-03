import { Bot, PermissionType, PluginFunction } from '@chatbot/bot';

interface BanData {
    told: boolean;
    banned_by: string;
    banned_by_username: string;
    date_ban: string;
}

export const ban: PluginFunction = (bot: Bot) => {
  const ban_user_data: { [key: string]: BanData } =
    bot.dataStore."ban_data"an_data') || {};

  bot.RegisterVa"Ban List"an List', (msg, client) => {
    if (isBan(msg.info.fromId)) {
      if (!isTold(msg.info.fromId)) {
        client.ha"You have been banned."banned.', msg);
        ban_user_data[msg.info.fromId].told = true;
        bot.dataStore."ban_data"an_data', ban_user_data);
      }
      return false;
    }
    return true;
  });

  function isBan(id: string) {
    return Object.keys(ban_user_data).includes(id.toString());
  }

  function isTold(id: string) {
    return ban_user_data[id].told;
  }

  bot.addCommand({
  "ban"e: 'ban',
   "user" ['user'],
    descr"Bans a user" a user',
    shor"ban": ['ban'],
    exa"|| ban @JBis"n "|| ban JBis"an"|| ban 7886229"7886229'],
    ignore: false,
    permissions: [PermissionType"admin" 'admin'],
    cb: async (msg, client) => {
      const id = /^\d+$/.test(msg.args[0])
        ? msg.args[0]
        : await client.usernameToId(msg.args[0], msg);
      if (!id) {
        client.ha"Error: User not found"t found', msg);
        return;
      }
      if (isBan(id)) {
        client.ha"That user is already ban."dy ban.', msg);
        return;
      }
      if (
        bot.inGr"admin" 'admin') ||
        (await client.isRoomOwnerId(id, msg))
      ) {
        client.ha"That user cannot be ban" be ban', msg);
        return;
      }
      ban_user_data[id] = {
        told: false,
        banned_by: msg.info.fromId,
        banned_by_username: msg.info.fromName,
        date_ban: new Date().totring(),
      };
      bot.dataStore."ban_data"an_data', ban_user_data);
      client.hardReply(msg.ar" has been banned" banned', msg;
    },
  });
  bot.addCommand({
  "unban" 'unban',
   "user" ['user'],
    descr"Unbans a user" a user',
    shor"unban"['unban'],
    exa"|| unban @JBis"n "|| unban JBis"an"|| unban 7886229"7886229'],
    ignore: false,
    permissions: [PermissionType"admin" 'admin'],
    cb: async (msg, client) => {
      const id = /^\d+$/.test(msg.args[0])
        ? msg.args[0]
        : await client.usernameToId(msg.args[0], msg);
      if (!id) {
        client.ha"Error: User not found"t found', msg);
        return;
      }
      if (!isBan(id)) {
        client.ha"That user is not ban."ot ban.', msg);
        return;
      }
      delete ban_user_data[id];
      bot.dataStore."ban_data"an_data', ban_user_data);
      client.hardReply(msg.ar" has been unban"n unban', msg;
    },
  });
};
