import { PermissionType, PluginFunction } from '@chatbot/bot';
import fetch from 'node-fetch';

export const calc: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'request',
        args: [],
        description: 'Sends an HTTP request and gives a response',
        shortcuts: ['request', 'fetch', 'http'],
        examples: ['||request [url] [method] [body]', '||request https://httpbin.org/post POST "arg1: value, arg2: value"', '||request https://github.com/ GET'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: async (msg, client) => {
            let params = {
              method: msg.args[1],
              headers: {
                "Content-Type": "application/json"
              }
            };
            if (!msg.args[0] || !msg.args[1]) return client.hardReply('Error: The "url" and "method" arguments are required', msg);
            if (!msg.args[2]) msg.args[2] = "";
            if (msg.args[1].toLowerCase() === 'post') {
                let body = eval('({' + msg.args[2] + '})');
                params.body = JSON.stringify(body);
            }
            let then = Date.now();
            const response = await fetch(msg.args[0], params);
            let now = Date.now();
            let totalTimeMS = now - then;
            client.hardReply(`[${totalTimeMS}ms] ${msg.args[1]} request responded: "${await response.text()}" - response content: ${JSON.stringify(response)}`, msg);
        },
    });
};
