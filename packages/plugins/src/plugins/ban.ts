import {Bot, PluginFunction} from "@chatbot/bot";

interface BanData {
    told: boolean
    banned_by: string,
    banned_by_username: string,
    date_ban: string,
}

let ban_user_data: { [key: string]: BanData };

const ban: PluginFunction = (bot: Bot) => {
    ban_user_data = bot.dataStore.getData("ban_data") || {};

    bot.RegisterValidator("Ban List", (msg, client) => {
        if (isBan(msg.info.fromId)) {
            if (!isTold(msg.info.fromId)) {
                client.hardReply("You have been banned.", msg)
                ban_user_data[msg.info.fromId].told = true;
                bot.dataStore.setData('ban_data', ban_user_data);
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
        name: "ban",
        args: ["user"],
        description: "Bans a user",
        shortcuts: [
            "ban"
        ],
        examples: ["|| ban @JBis", "|| ban JBis", "|| ban 7886229"],
        ignore: false,
        permissions: ["OWNER", "admin"],
        cb: async (msg, client) => {
            const id = /^\d+$/.test(msg.args[0]) ? msg.args[0] : await client.usernameToId(msg.args[0], msg);
            if (!id) {
                client.hardReply("Error: User not found", msg);
                return;
            }
            if (isBan(id)) {
                client.hardReply("That user is already ban.", msg);
                return;
            }
            if (bot.isAdmin(id) || await client.isRoomOwnerId(id, msg)) {
                client.hardReply("That user cannot be ban", msg);
                return;
            }
            ban_user_data[id] = {
                told: false,
                banned_by: msg.info.fromId,
                banned_by_username: msg.info.fromName,
                date_ban: (new Date()).toString(),
            };
            bot.dataStore.setData('ban_data', ban_user_data);
            client.hardReply(msg.args[0] + " has been banned", msg);
        }
    });
    bot.addCommand({
        name: "unban",
        args: ["user"],
        description: "Unbans a user",
        shortcuts: [
            "unban"
        ],
        examples: ["|| unban @JBis", "|| unban JBis", "|| unban 7886229"],
        ignore: false,
        permissions: ["OWNER", "admin"],
        cb: async (msg, client) => {
            const id = /^\d+$/.test(msg.args[0]) ? msg.args[0] : await client.usernameToId(msg.args[0], msg);
            if (!id) {
                client.hardReply("Error: User not found", msg);
                return;
            }
            if (!isBan(id)) {
                client.hardReply("That user is not ban.", msg);
                return;
            }
            delete ban_user_data[id];
            bot.dataStore.setData('ban_data', ban_user_data);
            client.hardReply(msg.args[0] + " has been unban", msg);
        }
    });
};
export default ban;
