module.exports = function (bot) {
    bot.addCommand({

        name: "kill",
        args: [
            "person"
        ],
        description: "",
        shortcuts: [
            "kill"
        ],
        ignore: false,
        permissions: ["all"],
        func: async (msg, args, sudo) => {
            if (args.length < 1) {
                bot.client.send("**Missing args**");
                return;
            }
            if (args[0] === "yourself" || args[0] === "self") {
                if (!bot.permissionCheck('selfDestruct', msg)) {
                    bot.client.send("Your are not authorized to administer this command");
                    return;
                }
                bot.getCommand('selfDestruct').func(msg, args, sudo);
                return;
            }
            const person = await bot.client.fetchUser(args[0].match(/[0-9]+/));
            bot.client.send(`\`sudo rm -rf /\` <@${person.id}>`);
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            const old_nicname = person.nickname;
            await msg.guild.members.get(person.id).setNickname('Died ' + today);
            setTimeout(async () => {
                await msg.guild.members.get(person.id).setNickname(old_nicname);
            }, 300000);
        }
    });
};
