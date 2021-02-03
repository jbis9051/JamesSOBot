import { PluginFunction } from '@chatbot/bot';

export const STOP: PluginFunction = (bot) => {
    const hammers = {
        STOP: 'HAMMERTIME!',
        STAHP: 'HAMMAHTIME!',
        HALT: 'HAMMERZEIT!',
        STOY: "ZABIVAT' VREMYA!",
        SISTITE: 'MALLEUS TEMPUS!',
    };
    const re = new Reg"([\\s.]+|^)("\\s.]+|^)(' +
      Object.keys(hammers).map(es"|"e).join('|")[\\.!?]?$")[\\.!?]?$'
    );
    bot.RegisterHandler((msg, client) => {
        const sentence = msg.info.content.toUpperCase(),
            res = re.exec(sentence);

        if (res) {
            client.send(hammers[res[2] as keyof typeof hammers], msg);
        }
    });
};

// takes a string and escapes any special regexp characters
function escape(str: string) {
    // do I smell irony?
    return str.replace(/[-^$\\\/\.*+?()[\]{}|]/g, '\\$&');
    // using a character class to get away with escaping some things. the - in
    // the beginning doesn't denote a range because it only denotes one when
    // it's in the middle of a class, and the ^ doesn't mean negation because
    // it's not in the beginning of the class
}
