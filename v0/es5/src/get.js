const { readFileSync, existsSync, readdirSync } = require("fs")

const getRecordFromTag = (tag="") => {
    if(existsSync('./records/' + tag + '.json')){ 
    return JSON.parse(readFileSync('./records/' + tag + '.json','utf8'))
}else{
return "Record not found" 
} 
}


const getAllRecords = (returnType=1) => {
let array_of_filenames = []
for (const f of readdirSync('./records')){

array_of_filenames.push(f)

}

let obj_of_data

if(returnType == 1){
 obj_of_data = {}

array_of_filenames.forEach(filename => {
obj_of_data[filename.replace('.json','')] = JSON.parse(readFileSync('./records/'+filename,'utf8'))
})
}else if(returnType == 2){
obj_of_data = []
array_of_filenames.forEach(f => {
    let d = JSON.stringify({"tag":f.replace('.json',''), data:JSON.parse(readFileSync('./records/'+f,'utf8'))})
    obj_of_data.push(JSON.parse(d))
})
}

return obj_of_data
}

const doesRecordExistByTag = (tag="") => {
if(existsSync('./records/' + tag + '.json')){ 
return true
}else{
return false
} 
}


const getRecordFromKeyValue = (key="",value,onlyFirst=false) => {
let theData = []
getAllRecords(2).forEach(d => {
if(d.data[key] == value){
if(onlyFirst == true && theData.length){
return
}
if(onlyFirst == true){
theData = d
}else{
theData.push(d)
}
}

})
return theData
}

module.exports.getRecordFromValue = getRecordFromKeyValue
module.exports.getRecordFromTag = getRecordFromTag
module.exports.getAllRecords =    getAllRecords
module.exports.doesRecordExistByTag =    doesRecordExistByTag
