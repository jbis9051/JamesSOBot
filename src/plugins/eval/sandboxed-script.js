module.exports = function () {
    // security reasons, we don't want it in the global context
    let done = _done;
    delete _done;

    global.done = function (...args) {
        done.applyIgnored(undefined, args);
    };


    /* most extra functions could be possibly unsafe*/
    const whitey = {
        Array: 1,
        Boolean: 1,
        Date: 1,
        Error: 1,
        EvalError: 1,
        Function: 1,
        Infinity: 1,
        JSON: 1,
        Map: 1,
        Math: 1,
        NaN: 1,
        Number: 1,
        Object: 1,
        Promise: 1,
        Proxy: 1,
        RangeError: 1,
        ReferenceError: 1,
        RegExp: 1,
        Set: 1,
        String: 1,
        SyntaxError: 1,
        TypeError: 1,
        URIError: 1,
        WeakMap: 1,
        WeakSet: 1,
        atob: 1,
        btoa: 1,
        console: 1,
        decodeURI: 1,
        decodeURIComponent: 1,
        encodeURI: 1,
        encodeURIComponent: 1,
        eval: 1,
        isFinite: 1,
        isNaN: 1,
        parseFloat: 1,
        parseInt: 1,
        /* typedarrays and shit */
        ArrayBuffer: 1,
        Blob: 1,
        Float32Array: 1,
        Float64Array: 1,
        Int8Array: 1,
        Int16Array: 1,
        Int32Array: 1,
        Uint8Array: 1,
        Uint16Array: 1,
        Uint32Array: 1,
        Uint8ClampedArray: 1,
    };

    function clearObj(obj, prop) {
        try {
            Object.defineProperty(obj, prop, {
                get: function () {
                    /* TEE HEE */
                    throw new ReferenceError(prop + ' is not defined');
                },
                configurable: false,
                enumerable: false
            });
        } catch (e) {
            delete obj[prop];

            if (obj[prop] !== undefined) {
                obj[prop] = null;
            }
        }
    }

    [Object.getPrototypeOf(global)].forEach(function (obj) {
        Object.getOwnPropertyNames(obj).forEach(function (prop) {
            if (whitey.hasOwnProperty(prop) || prop === "hasOwnProperty") {
                return;
            }
            clearObj(obj, prop);
        });
    });


    const console = {
        _items: [],
        log: function () {
            console._items.push.apply(console._items, Array.from(arguments).map(e => JSON.stringify(e)));
        }
    };
    console.error = console.info = console.debug = console.log;

    function exec(code) {
        return eval(`undefined;\n${code}`);
    }

    function execIIFE(code) {
        return eval(`undefined;\n(()=> { ${code} })()`);
    }


    global.runCode = function (code) {
        try {
            global.done(false, JSON.stringify(exec(code)), JSON.stringify(console._items));
        } catch (e) {
            try {
                if (e.message !== "Illegal return statement") {
                    throw e;
                }
                global.done(false, JSON.stringify(execIIFE(code)), JSON.stringify(console._items));
            } catch (e) {
                global.done(false, JSON.stringify(e.toString()), JSON.stringify(console._items));
            }
        }
    }
};
