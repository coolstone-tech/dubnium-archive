const { wipeRecords } = require('./src/wipe.js')
const Record = require('./src/create.js')
const { modifyRecordValueByTag, modifyTag, overwriteByTag } =  require('./src/modify.js')
const { getRecordFromTag, getAllRecords, doesRecordExistByTag, getRecordFromValue } = require ('./src/get.js')
const { fuzzySearchByTag } = require  ("./src/search.js")
const { openRecordDir, openDir }  =require('./src/o')
const deleteByTag = require('./src/delete')

const apiList = (log=false) => {
return log ? console.log(module.exports) : module.exports
}

module.exports = {
wipeRecords,
Record,
modifyRecordValueByTag,
overwriteByTag,
modifyTag,
getRecordFromTag,
getAllRecords,
fuzzySearchByTag,
openRecordDir,
openDir,
deleteByTag,
doesRecordExistByTag,
getRecordFromValue,
apiList
}
