import { Client, Message, PermissionType, PluginFunction } from "@chatbot/bot";

interface ChannelSettings {
}

interface ChannelInfo {
  channelId: string;
  settings: ChannelSettings;
  members: string[];
}

interface ClapData {
  [key: string]: ChannelInfo;
}

// this only works for slack (evidently)
export const clapper: PluginFunction = (bot) => {
  const channelInfo: ClapData = bot.dataStore.getData<ClapData>("clap") || {};

    function saveData() {
      bot.dataStore.setData<ClapData>("clap", channelInfo);
    }

    function getMember(msg: Message, client: Client & any) {
      if (!channelInfo[msg.info.contextId]) {
        client.send("This channel is not managed by clap.", msg);
        return;
      }
      if (!msg.args[0]) {
        client.send("Please supply a user.", msg);
        return;
      }
      const memberMatch =
        msg.args[0].match(/<@(.*)>/) && msg.args[0].match(/<@(.*)>/)!;
      if (!memberMatch) {
        client.send("Invalid user.", msg);
        return;
      }
      const member = memberMatch[1];
      if (client.id === member) {
        client.send(`Can't add myself.`, msg);
        return;
      }
      return member;
    }

    function kickMember(client: Client & any, channel: string, user: string) {
      return client.web.conversations
        .kick({ channel, user })
        .then((res: any) => {
          client.send("User has been removed.", channel);
        })
        .catch((res: any) => {
          client.send("Kick Error: " + res.data.error, channel);
        });
    }

    async function enforce(client: Client & any, channel: string) {
      const resp = await client.web.conversations.members({ channel });
        resp.members.forEach((user: string) => {
            if (!channelInfo[channel].members.includes(user)) {
                kickMember(client, channel, user);
            }
        });
    }

    async function snapshot(client: Client & any, channel: string) {
      const resp = await client.web.conversations.members({ channel });
      channelInfo[channel] = {
        channelId: channel,
        settings: {},
        members: resp.members
      };
      saveData();
      client.send(
        `Snapshot completed with ${resp.members.length} members`,
        channel
      );
    }

    bot.addCommand({
      name: "clap",
      args: [""],
      description: "Clap help",
      shortcuts: ["clap"],
      examples: ["|| clap"],
      ignore: false,
      permissions: [PermissionType.ALL],
      cb: (msg, client: Client & any) => {
        client.send("Please call a method by doing clap.<method>", msg);
      }
    });

    bot.addCommand({
      name: "clap.status",
      args: [""],
      description: "Checks the clap status",
      shortcuts: ["clap.status"],
      examples: ["|| clap.status"],
      ignore: false,
      permissions: ["admin"],
      cb: async (msg, client: Client & any) => {
        if (channelInfo[msg.info.contextId]) {
          client.send(
            `This channel is managed by clap with ${
              channelInfo[msg.info.contextId].members.length
            } members.`,
            msg
          );
          return;
        }
        client.send(`This channel is not managed by clap.`, msg);
        return;
      }
    });

    bot.addCommand({
      name: "clap.init",
      args: [""],
      description: "Clap initiate",
      shortcuts: ["clap.init"],
      examples: ["|| clap.init"],
      ignore: false,
      permissions: ["admin"],
      cb: async (msg, client: Client & any) => {
        if (channelInfo[msg.info.contextId]) {
          client.send("This channel is already initiated.", msg);
          return;
        }
        client.send("Initiating...", msg);
        snapshot(client, msg.info.contextId);
      }
    });

    bot.addCommand({
      name: "clap.add",
      args: ["user"],
      description: "Adds a member to a channel managed by clap",
      shortcuts: ["clap.add"],
      examples: ["|| clap.add"],
      ignore: false,
      permissions: ["admin"],
      cb: async (msg, client: Client & any) => {
        const member = getMember(msg, client);
        if (!member) {
          return;
        }
        if (channelInfo[msg.info.contextId].members.includes(member)) {
          client.send(
            `This member has already been added. You can add them manually.`,
            msg
          );
          return;
        }
        client.send("Adding and inviting...", msg);
        channelInfo[msg.info.contextId].members.push(member);
        saveData();
        client.web.conversations
          .invite({ channel: msg.info.contextId, users: member })
          .then((res: any) => {
            client.send("User has been added.", msg);
          })
          .catch((res: any) => {
            client.send("Add Error: " + res.data.error, msg);
          });
      }
    });

    bot.addCommand({
      name: "clap.kick",
      args: ["user"],
      description: "Kick a member from a channel managed by clap",
      shortcuts: ["clap.kick"],
      examples: ["|| clap.kick"],
      ignore: false,
      permissions: ["admin"],
      cb: async (msg, client: Client & any) => {
        const member = getMember(msg, client);
        if (!member) {
          return;
        }
        if (!channelInfo[msg.info.contextId].members.includes(member)) {
          client.send(
            `This member should not be here. Kick them manually or run ${client.codify(
              "|| clap.enforce"
            )}.`,
            msg
          );
          return;
        }
        client.send("Removing and kicking...", msg);
        channelInfo[msg.info.contextId].members = channelInfo[
          msg.info.contextId
          ].members.filter((mem) => mem != member);
        saveData();
        kickMember(client, msg.info.contextId, member);
      }
    });

    bot.addCommand({
      name: "clap.enforce",
      args: [],
      description: "Enforce policy",
      shortcuts: ["clap.enforce"],
      examples: ["|| clap.enforce"],
      ignore: false,
      permissions: ["admin"],
      cb: async (msg, client: Client & any) => {
        if (!channelInfo[msg.info.contextId]) {
          client.send("This channel is not managed by clap.", msg);
          return;
        }
        client.send("Enforcing...", msg);
        enforce(client, msg.info.contextId).then(() => {
          client.send("Enforced.", msg);
        });
      }
    });

    bot.addCommand({
      name: "clap.cancel",
      args: [],
      description: "Unmanages the current room",
      shortcuts: ["clap.cancel"],
      examples: ["|| clap.cancel"],
      ignore: false,
      permissions: ["admin"],
      cb: async (msg, client: Client & any) => {
        if (!channelInfo[msg.info.contextId]) {
          client.send("This channel is not managed by clap.", msg);
          return;
        }
        delete channelInfo[msg.info.contextId];
        saveData();
        client.send("Unmanaged");
      }
    });

    bot.addCommand({
      name: "clap.snapshot",
      args: [],
      description: "Snapshots the current members in the room",
      shortcuts: ["clap.snapshot"],
      examples: ["|| clap.snapshot"],
      ignore: false,
      permissions: ["admin"],
      cb: async (msg, client: Client & any) => {
        if (!channelInfo[msg.info.contextId]) {
          client.send("This channel is not managed by clap.", msg);
          return;
        }
        snapshot(client, msg.info.contextId);
      }
    });

    bot.RegisterClientFunction((client: Client & any) => {
      client.events.on("member_joined_channel", (event: any) => {
        if (
          channelInfo[event.channel] &&
          !channelInfo[event.channel].members.includes(event.user)
        ) {
          kickMember(client, event.channel, event.user).then(() => {
            client.send(
              `Member must be added using the ${client.codify(
                "|| clap.add <member>"
              )}`,
              event.channel
            );
          });
        }
      });
      Object.keys(channelInfo).forEach((id) => {
        enforce(client, id);
      });
    });
};
