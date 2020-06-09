const fs = require('fs');

const currentLearnPath = __dirname + '/../../data/stackoverflow/learn_list'
const currentLearn = JSON.parse(fs.readFileSync(currentLearnPath).toString());

Object.entries(currentLearn).forEach(([key, value]) => {
    if (value.imported) {
        value.output = value.output
            .replace(/\$encode\(\$([0-9+])\)/g, (match, num) => `[${parseInt(num) + 1}]`)
            .replace(/\$([0-9+])/g, (match, num) => `{${parseInt(num) + 1}}`);
    }
});

fs.writeFileSync(currentLearnPath, JSON.stringify(currentLearn));
console.log("Learn transformation Complete!");
