let ban_user_data;
module.exports = function (bot) {
    ban_user_data = bot.loadData("ban_data") || {};

    bot.addValidatorScript("Ban List", (msg) => {
        if (isBan(msg.getStaticUserUID())) {
            if (!isTold(msg.getStaticUserUID())) {
                msg.reply("You have been ban.");
                ban_user_data[msg.getStaticUserUID()].told = true;
                bot.saveData('ban_data', ban_user_data);
            }
            return false;
        }
        return true;
    });

    function isBan(id) {
        return Object.keys(ban_user_data).includes(id.toString());
    }

    function isTold(id) {
        return ban_user_data[id].told;
    }

    bot.addCommand({
        name: "ban",
        args: ["user"],
        description: "Bans a user",
        shortcuts: [
            "ban"
        ],
        ignore: false,
        permissions: ["OWNER", "admin"],
        func: async (msg) => {
            const id = /^\d+$/.test(msg.args[0]) ? parseInt(msg.args[0]) : await bot.client.usernameToId(msg.args[0]);
            if (!id) {
                msg.reply("Error: User not found");
                return;
            }
            if (isBan(id)) {
                msg.reply("That user is already ban.");
                return;
            }
            if (bot.isAdmin(id) || bot.client.isRoomOwnerId(msg.getStaticUserUID())) {
                msg.reply("That user cannot be ban");
                return;
            }
            ban_user_data[id] = {
                banned_by: msg.getStaticUserUID(),
                banned_by_username: msg.getVariableUsername(),
                date_ban: (new Date()).toString(),
            };
            bot.saveData('ban_data', ban_user_data);
            msg.reply(msg.args[0] + " has been banned");
        }
    });
    bot.addCommand({
        name: "unban",
        args: ["user"],
        description: "Unbans a user",
        shortcuts: [
            "unban"
        ],
        ignore: false,
        permissions: ["OWNER", "admin"],
        func: async (msg) => {
            const id = /^\d+$/.test(msg.args[0]) ? parseInt(msg.args[0]) : await bot.client.usernameToId(msg.args[0]);
            if (!id) {
                msg.reply("Error: User not found");
                return;
            }
            if (!isBan(id)) {
                msg.reply("That user is not ban.");
                return;
            }
            delete ban_user_data[id];
            bot.saveData('ban_data', ban_user_data);
            msg.reply(msg.args[0] + " has been unban");
        }
    });
};
