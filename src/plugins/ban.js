let ban_user_data;
module.exports = function (bot) {
    ban_user_data = bot.loadData("ban_data") || {};

    bot.addValidatorScript("Ban List", (msg) => {
        if (isBan(msg.getStaticUserUID())) {
            if (!isTold(msg.getStaticUserUID())) {
                msg.replyDirect("You have been banned.");
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
        examples: ["|| ban @JBis", "|| ban JBis", "|| ban 7886229"],
        ignore: false,
        permissions: ["OWNER", "admin"],
        func: async (msg) => {
            const id = /^\d+$/.test(msg.args[0]) ? parseInt(msg.args[0]) : await msg.roomContext.usernameToId(msg.args[0]);
            if (!id) {
                msg.replyDirect("Error: User not found");
                return;
            }
            if (isBan(id)) {
                msg.replyDirect("That user is already ban.");
                return;
            }
            if (bot.isAdmin(id) || await msg.roomContext.isRoomOwnerId(id)) {
                msg.replyDirect("That user cannot be ban");
                return;
            }
            ban_user_data[id] = {
                banned_by: msg.getStaticUserUID(),
                banned_by_username: msg.getVariableUsername(),
                date_ban: (new Date()).toString(),
            };
            bot.saveData('ban_data', ban_user_data);
            msg.replyDirect(msg.args[0] + " has been banned");
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
        func: async (msg) => {
            const id = /^\d+$/.test(msg.args[0]) ? parseInt(msg.args[0]) : await msg.roomContext.usernameToId(msg.args[0]);
            if (!id) {
                msg.replyDirect("Error: User not found");
                return;
            }
            if (!isBan(id)) {
                msg.replyDirect("That user is not ban.");
                return;
            }
            delete ban_user_data[id];
            bot.saveData('ban_data', ban_user_data);
            msg.replyDirect(msg.args[0] + " has been unban");
        }
    });
};
