import ivm from 'isolated-vm';
import { REPLACERS, reviver, stringifyOutput } from './helper';

export default function (
    code: string,
    timeout = 500
): Promise<{
    error: string | false;
    result: string;
    logged: string;
    time: number;
}> {
    return new Promise((resolve, reject) => {
        // ship the data to whoever called this worker
        function sendData(
            error: string | false,
            result: string,
            logged: string,
            startTime: number,
            endTime: number
        ) {
            resolve({
                error,
                result: stringifyOutput(JSON.parse(result, reviver)),
                logged: stringifyOutput(JSON.parse(logged, reviver)),
                time: endTime - startTime,
            });
        }

        // Create a new isolate limited to 8MB
        const isolate = new ivm.Isolate({ memoryLimit: 8 });

        // Create a new context within this isolate.

        const context = isolate.createContextSync();

        // Get a Reference{} to the global object within the context.
        const jail = context.global;

        // This make the global object available in the context as `global`. We use `derefInto()` here
        // because otherwise `global` would actually be a Reference{} object in the new isolate.
        jail.setSync('global', jail.derefInto());

        // We will create a done function to be called when either we get a result or we have a runtime error
        jail.setSync(
            '_done',
            new ivm.Reference((...args: any) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                sendData(...args);
            })
        );

        jail.setSync(
            '_atob',
            new ivm.Reference((string: string) =>
                Buffer.from(string, 'base64').toString()
            )
        );

        // This will bootstrap the context. Prependeng 'new ' to a function is just a convenient way to
        // convert that function into a self-executing closure that is still syntax highlighted by
        // editors. It drives strict mode and linters crazy though.

        // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
        const sandboxed_script = require('./sandboxed-script');
        const compiled_sandbox_script = isolate.compileScriptSync(
            `new ${sandboxed_script}`
        );

        compiled_sandbox_script.runSync(context);

        const code_to_run = `runCode('${Buffer.from(code).toString(
            'base64'
        )}', '${Buffer.from(JSON.stringify(REPLACERS)).toString('base64')}')`;
        const start = Date.now();
        try {
            isolate
                .compileScriptSync(code_to_run)
                .runSync(context, { timeout });
        } catch (e) {
            sendData(
                false,
                e.toString(),
                JSON.stringify([]),
                start,
                Date.now()
            );
        }
    });
}
