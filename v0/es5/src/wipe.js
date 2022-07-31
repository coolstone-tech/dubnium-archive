const {execSync} = require('child_process')

const wipeRecords = () => {
    execSync(`
    rm -r ./records
    mkdir records
    `)
}

module.exports.wipeRecords = wipeRecords