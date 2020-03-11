const fetch = require('node-fetch');

const max_attempts = 20;

module.exports = function (bot) {
    bot.addCommand({
        name: "obama",
        args: [],
        description: "talktobama wrapper. (Converts text to a video of obama saying that text)",
        shortcuts: [
            "obama",
            "obamaize",
            "talkobama"
        ],
        examples: ["|| obama Hey, I'm Obama!"],
        ignore: false,
        permissions: ["all"],
        func: async (msg) => {
            if (msg.args.length === 0) {
                return msg.roomContext.send("Obama is silent.");
            }
            const text = msg.args.join("+");
            const response = await fetch("http://talkobamato.me/synthesize.py", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'input_text=' + text,
            });
            const key = response.url.match(/speech_key=(.*)/)[1];
            if (await isReady(key)) {
                return msg.roomContext.send("http://talkobamato.me/synth/output/" + key + '/obama.mp4');
            }
            waitForReady(key, 1, function (success) {
                if (success) {
                    msg.roomContext.send("http://talkobamato.me/synth/output/" + key + '/obama.mp4');
                } else {
                    msg.roomContext("Obama Timed Out")
                }
            });
        }
    });
};

function waitForReady(key, amount, callback) {
    setTimeout(async function () {
        if (await isReady(key)) {
            return callback(true);
        }
        if (amount > max_attempts) {
            return callback(false);
        }
        waitForReady(key, amount + 1, callback);
    }, 10000)

}

async function isReady(key) {
    const response = await fetch('http://talkobamato.me/synth/output//' + key + '/video_created.txt', {method: 'HEAD'});
    return response.status !== 404;
}
