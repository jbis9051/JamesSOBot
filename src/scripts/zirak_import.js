// this script is to import Zirak's/Cap's data for example https://gist.github.com/sochatbot/63bf8ed712ba0825dc7ea0f8fe4cc060. Put the data in config/import.json.

const fs = require('fs');

const importStuff = require('../../config/import');

const currentLearnPath = __dirname + '/../../data/stackoverflow/learn_list'

// learned stuff

const currentLearn = JSON.parse(fs.readFileSync(currentLearnPath).toString());

const learnToImport = JSON.parse(importStuff.bot_learn);

Object.entries(learnToImport).forEach(([key, value]) => {
    if (typeof value === "string") { // for some reason some are stored as a string and not an object so we need to parse it and replace it
        value = JSON.parse(value);
    }
    value.output = value.output.replace('<>', '').trim(); // because of the weird <> before some outputs

    value.description = value.description
        .replace(/(<>|<msg>)/, '')
        .trim();

    delete value["input"]; // we don't need this anymore

    value.date_created = value.date; // we renamed this
    delete value.date;

    value.imported = true; // just in case we need to check in the future

    if (currentLearn.hasOwnProperty(key)) {
        throw new Error('Duplicate key exists: ' + key);
    }
    // now we are ready to go
    currentLearn[key] = value;
});
fs.writeFileSync(currentLearnPath, JSON.stringify(currentLearn));
console.log("Import Complete!");
