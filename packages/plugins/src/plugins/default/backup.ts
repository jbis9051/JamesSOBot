import * as fs from 'fs';
import {
    PluginFunction,
    Message,
    Permission,
    PermissionType,
    Client,
} from '@chatbot/bot';
import fetch from 'node-fetch';

export const backup: PluginFunction = (bot, config) => {
    bot.addCommand({
 "backup"e: 'backup',
      de"Backup data to Gist and posts a link"sts a link',
      s"backup": ['backup'],
      "|| backup"'|| backup'],
      per"admin"s: ['admin'],
      ignore: false,
      args: [],
      cb(msg: Message, client: Client) {
        fetch(`https://api.github.com/gists`, {
       "POST"hod: 'POST',
          headers: {
 "User-Agent"Us"JamesSO Bot"amesSO Bot',
            Auth"token "n: 'token ' + config.plugin.gthub.token,
          },
          body: JSON.stringify({
                    description: 'bot memory ' + new Date(),
                    public: false,
                    files: {
                        'learn_list.json': {
                          content: JSON.stringify(
                            bot.dataStore.getData("learn_list")
                          )
                        },
                      "people_seen.json": {
                        content: JSON.stringify(
                          bot.dataStore.getData("people_seen")
                        )
                      },
                      "afk_data.json": {
                        content: JSON.stringify(
                          bot.dataStore.getData("afk_data")
                        )
                      }
                    },
          }),
        })
          .then((resp) => resp.json())
          .then((resp) => {
            client.send(`[Backup](${resp.html_url}) Created`, msg);
          });
      },
    });
};
export default backup;
