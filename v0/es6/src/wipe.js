import {execSync} from 'child_process'

const wipeRecords = () => {
    execSync(`
    rm -r ./records
    mkdir records
    `)
}

export { wipeRecords }