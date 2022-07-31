import { readFileSync, existsSync, readdirSync } from "fs"

const getRecordFromTag = (tag="") => {
    if(existsSync('./records/' + tag + '.json')){ 
    return JSON.parse(readFileSync('./records/' + tag + '.json','utf8'))
}else{
return "Record not found" 
} 
}


const getAllRecords = () => {
let array_of_filenames = []
for (const f of readdirSync('./records')){

array_of_filenames.push(f)

}

const obj_of_data = {}

array_of_filenames.forEach(filename => {
obj_of_data[filename.replace('.json','')] = JSON.parse(readFileSync('./records/'+filename,'utf8'))
})

return (obj_of_data)
}

const doesRecordExistByTag = (tag="") => {
if(existsSync('./records/' + tag + '.json')){ 
return true
}else{
return false
} 
}

const getRecordFromValue = (key="",value,onlyFirst=false) => {
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


export {
    getRecordFromTag,
    getAllRecords,
    doesRecordExistByTag,
    getRecordFromValue
}