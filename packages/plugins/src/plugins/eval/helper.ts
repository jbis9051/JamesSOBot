import crypto from 'crypto';

export const REPLACERS = {
    NaN: crypto.randomBytes(16).toString('hex'),
    Infinity: crypto.randomBytes(16).toString('hex'),
    NegInfinity: crypto.randomBytes(16).toString('hex'),
    undefined: crypto.randomBytes(16).toString('hex'),
};

export function reviver(key: string, value: string) {
    switch (
        value // return undefined has different functionality here so we can't return undefined
    ) {
        case REPLACERS.NaN:
            return NaN;
        case REPLACERS.Infinity:
            return Infinity;
        case REPLACERS.NegInfinity:
            return -Infinity;
        default:
            return value;
    }
}

export function stringifyOutput(input: any) {
    function getVal(a: any): string {
        if (a === null) {
            return 'null';
        }
        if (a === undefined || a === REPLACERS.undefined) {
            return 'undefined';
        }
        if (typeof a.toJSON === 'function') {
            return a.toJSON();
        }
        if (Array.isArray(a)) {
            return `[ ${a.map((b) => getVal(b)).join(', ')} ]`;
        }
        if (typeof a === 'object') {
            return `{ ${Object.entries(a)
                .map(([key, value]) => `${key}: ${getVal(value)}`)
                .join(', ')} }`;
        }
        if (typeof a === 'number') {
            if (Number.isNaN(a)) {
                return 'NaN';
            }
            if (!Number.isFinite(a)) {
                return a > 0 ? 'Infinity' : '-Infinity';
            }
            return a.toString();
        }
        if (typeof a === 'string') {
            return `'${a.replace(/'/g, "\\'")}'`;
        }
        return a.toString();
    }
    return getVal(input);
}
