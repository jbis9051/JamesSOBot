module.exports = function () {
    // security reasons, we don't want it in the global context
    let done = _done;
    let atob = _atob;
    _done = undefined;
    _atob = undefined;

    global.done = function (...args) {
        done.applyIgnored(undefined, args);
    };

    global.atob = function (...args) {
        return atob.apply(undefined, args, { result: { copy: true } });
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

    // https://github.com/laverdet/isolated-vm/issues/107
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
    Object.defineProperty(Array.prototype, 'fill', {
        value: function (value) {

          if (value > 10000) {
            throw new Error("Array size to being. Ran out of memory.");
          }

          // Steps 1-2.
          if (this == null) {
            throw new TypeError("this is null or not defined");
          }

          var O = Object(this);

          // Steps 3-5.
          var len = O.length >>> 0;

          // Steps 6-7.
          var start = arguments[1];
          var relativeStart = start >> 0;

          // Step 8.
          var k = relativeStart < 0 ?
            Math.max(len + relativeStart, 0) :
            Math.min(relativeStart, len);

          // Steps 9-10.
          var end = arguments[2];
          var relativeEnd = end === undefined ?
            len : end >> 0;

          // Step 11.
          var final = relativeEnd < 0 ?
            Math.max(len + relativeEnd, 0) :
            Math.min(relativeEnd, len);

          // Step 12.
          while (k < final) {
            O[k] = value;
            k++;
          }

          // Step 13.
          return O;
        }
    });


    const console = {
      _items: [],
      log: function() {
        console._items.push.apply(console._items, Array.from(arguments).map(e => JSON.stringify(e)));
      }
    };
    console.error = console.info = console.debug = console.log;

    async function exec(code) {
        return await eval(`undefined;${code}`);
    }

    async function execIIFE(code) {
        return await eval(`(async ()=> { ${code} })()`);
    }

    async function execAsyncIIFE(code) {
        return await eval(`(async ()=> { return ${code} })()`);
    }


    global.runCode = async function (base64EncodedCode) {
        const code = await global.atob(base64EncodedCode);
        let startTime;
        try {
          startTime = Date.now();
          global.done(false, JSON.stringify(await exec(code)), JSON.stringify(console._items), startTime, Date.now());
        } catch (e) {
            try {
              if (e.message !== "Illegal return statement" && e.message !== "await is only valid in async function") {
                throw e;
              }
              if (e.message === "Illegal return statement") {
                startTime = Date.now();
                global.done(false, JSON.stringify(await execIIFE(code)), JSON.stringify(console._items), startTime, Date.now());

              } else {
                startTime = Date.now();
                global.done(false, JSON.stringify(await execAsyncIIFE(code)), JSON.stringify(console._items), startTime, Date.now());
              }
            } catch (e) {
              global.done(false, JSON.stringify(e.toString()), JSON.stringify(console._items), startTime, Date.now());
            }
        }
    }
};
