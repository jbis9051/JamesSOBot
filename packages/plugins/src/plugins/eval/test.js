const evaler = require('./index');

async function _run(code, msg) {
    const val = await evaler(code);
    if (val.error) {
        msg.replyDirect(`Error running script: \`${val.result}\``);
        return;
    }
    const logged = val.logged.join(', ');
    msg.replyDirect(`\`${val.result}\` Logged: \`${val.logged}\``);
}

const msg = {
    replyDirect: (e) => console.log(e),
    code: `
   
    `,
};
_run(msg.code, msg);
