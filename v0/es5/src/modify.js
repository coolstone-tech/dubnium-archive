const { readFileSync, renameSync, writeFileSync } =  require("fs")

const overwriteByTag = (tag="", data={}) => {
    writeFileSync('./records/' + tag + '.json', JSON.stringify(data))
    return    JSON.parse(readFileSync('./records/' + tag + '.json','utf8'))
}


const modifyRecordValueByTag = (tag="", key="", value) => {
let jsonObj = JSON.parse(readFileSync('./records/' + tag + '.json','utf8'))

jsonObj[key] = value

        return writeFileSync('./records/' + tag + '.json', JSON.stringify(jsonObj, null, 2))
    }

const modifyTag = (old_tag="", new_tag="") => {
renameSync('./records/' + old_tag + '.json','./records/' + new_tag + '.json')
return JSON.parse(readFileSync('./records/' + new_tag + '.json','utf8'))
}

module.exports.overwriteByTag = overwriteByTag
module.exports.modifyRecordValueByTag = modifyRecordValueByTag
module.exports.modifyTag = modifyTag