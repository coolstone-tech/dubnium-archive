const { rmSync } =  require('fs')

const deleteByTag = (tag="") => {
rmSync('./records/'+tag+'.json')
}



module.exports = deleteByTag
