#! /usr/bin/env node
// command syntax: [npx] dubnium <command> <dir> <...args>
const args = process.argv
const cmd = args[2]
const dir = args[3]
const db = new (require('./index'))(dir)
if(typeof db[cmd] != 'function') return console.error(`${cmd} is not a command`)
const c = db[cmd](args[4],args[5],args[6],args[7])
console.log(`\nRan ${cmd}!`, c ? ' \n\n' : '', c ? c : '','\n')