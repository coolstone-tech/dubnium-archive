import { rmSync } from 'fs'

const deleteByTag = (tag="") => {
rmSync('./records/'+tag+'.json')
}



export {
    deleteByTag
}