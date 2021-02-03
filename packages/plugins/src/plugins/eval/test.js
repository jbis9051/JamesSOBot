const eval = require('./index');

async function _run(code, msg) {
    const val = await eval(code);
    if (val.error) {
        msg.replyDirect(`Error running script: \`${val.result}\``);
        return;
    }
    let logged = val.logged.join(", ");
    msg.replyDirect(`\`${val.result}\` Logged: \`${val.logged}\``);
}

const msg = {
  replyDirect: (e) => console.log(e),
  code: `
   
    `
};
_run(msg.code, msg);
