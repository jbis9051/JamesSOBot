const { workerData: code, parentPort } = require('worker_threads');
let ivm = require('isolated-vm');

async function sendData(error, result) {
    parentPort.postMessage({
        error: error,
        result: result,
        logged: console._items,
    });
}

// Create a new isolate limited to 8MB
let isolate = new ivm.Isolate({ memoryLimit: 8 });

// Create a new context within this isolate.

let context = isolate.createContextSync();

// Get a Reference{} to the global object within the context.
let jail = context.global;

// This make the global object available in the context as `global`. We use `derefInto()` here
// because otherwise `global` would actually be a Reference{} object in the new isolate.
jail.setSync('global', jail.derefInto());

// We will create a done function to be called when either we get a result or we have a runtime error
jail.setSync(
    '_done',
    new ivm.Reference(function (...args) {
        sendData(...args);
    })
);

// This will bootstrap the context. Prependeng 'new ' to a function is just a convenient way to
// convert that function into a self-executing closure that is still syntax highlighted by
// editors. It drives strict mode and linters crazy though.

const sandboxed_script = require('./sandboxed-script');
const compiled_sandbox_script = isolate.compileScriptSync(
    'new ' + sandboxed_script
);

compiled_sandbox_script.runSync(context);

const code_to_run = `runCode('${Buffer.from(code).toString('base64')}')`;

try {
    isolate.compileScriptSync(code_to_run).runSync(context);
} catch (e) {
    sendData(false, e.toString(), JSON.stringify([]));
}
