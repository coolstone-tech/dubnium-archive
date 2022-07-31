import { wipeRecords } from './src/wipe.js'  
import { Record } from './src/create.js'
import { modifyRecordValueByTag, modifyTag, overwriteByTag } from './src/modify.js'
import { getRecordFromTag, getAllRecords, doesRecordExistByTag, getRecordFromValue } from './src/get.js'
import { fuzzySearchByTag } from "./src/search.js"
import { openRecordDir, openDir } from './src/o.js'
import { deleteByTag } from './src/delete.js'

export {
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
getRecordFromValue
}
