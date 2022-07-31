const { existsSync, mkdirSync, writeFileSync } = require("fs")

const Record = class {
constructor (tag="tag",data={}) {
if(!existsSync('./records')){mkdirSync('./records')}
if(existsSync('./records/' + tag + '.json')){ return console.error('Record already exists. Modify it instead.') }
return writeFileSync('./records/' + tag + '.json', JSON.stringify(data, null, 2))
}
}



module.exports = Record