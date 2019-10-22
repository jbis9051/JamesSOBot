const {Worker} = require('worker_threads');
const path = require('path');

module.exports = (code, timeout = 500) => new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, 'worker.js'), {workerData: code});
    worker.on('message', (data) => {
        finish(data)
    });
    worker.on('error', (data) => {
        console.error(data);
    });
    const timeoutTimer = setTimeout(function () {
        finish({error: true, result: 'Maximum execution time exceeded', logged: []});
    }, timeout);

    function finish(obj) {
        clearTimeout(timeoutTimer);
        worker.terminate();
        if (!obj) {
            resolve({error: "Nothing was returned"})
        } else {
            resolve(obj);
        }
    }
});
