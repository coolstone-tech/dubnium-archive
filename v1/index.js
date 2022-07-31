/*
Copyright 2022 CoolStone Technologies
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/



const { existsSync, writeFileSync, rmSync, readFileSync, readdirSync, renameSync, statSync, mkdirSync  } = require('fs')
const path = require('path')

const stringify = (data) => { return typeof data == 'object' ? JSON.stringify(data) : String(data) }
const walkDir = (dir, callback) => { readdirSync(dir).forEach( f => { let dirPath = path.join(dir, f); let isDirectory = statSync(dirPath).isDirectory(); isDirectory ? this.walkDir(dirPath, callback) : callback(path.join(dir, f))})}
const searchArray = (arr, val) => { return arr.filter(el => { return el.match(new RegExp(val, 'gi'))})}

process.title = 'dubnium'

 module.exports = class extends require('events') {
    folderPath = ''
    ext = ''

    constructor(dirPath="",ext=""){
    super()
    this.folderPath = dirPath
    this.emit('start',dirPath,ext)
    if(!ext){ this.ext = 'json' }else{this.ext = ext.toLowerCase()}
    }


    setDir(folderPath="") {
    console.warn(`Use "db.folderPath = ${folderPath}"`)
    this.folderPath = folderPath
    }

    locateRecord(tag="") {
        return `${this.folderPath}/${tag}.${this.ext}`
        }
        

    create(tag="",data) {
        if(this.exists(tag)) return this.get(tag)
        this.emit("create",tag,stringify(data))
        writeFileSync(this.locateRecord(tag), stringify(data))
        return this.get(tag)
      }


        delete(tag="") {
            this.emit("delete",tag,this.get(tag))
            rmSync(this.locateRecord(tag))
        }

        exists(tag="") { return existsSync(this.locateRecord(tag)) }

            get(tag=""){
                if(!this.locateRecord(tag)) return null
                const d = readFileSync(this.locateRecord(tag),'utf8')
                return this.ext == 'json' ? JSON.parse(d) : d
            }


            getAll(returnType=1) {
                let array_of_filenames = []
                for (const f of readdirSync(this.folderPath)){
                    if(f != '.DS_Store'){
                    if(path.extname(f).toLowerCase().replace(".",'') == this.ext){
                    array_of_filenames.push(f)
                    }
                    }
                }
                
                let obj_of_data
                
                if(returnType == 1){
                 obj_of_data = {}
                
                array_of_filenames.forEach(filename => {
                obj_of_data[filename.replace('.'+this.ext,'')] = this.get(path.basename(filename).replace(path.extname(filename),""))
                })
                }else if(returnType == 2){
                obj_of_data = []
                array_of_filenames.forEach(f => {
                    let d = JSON.stringify({"tag":path.basename(f).replace(path.extname(f),""), data:this.get(path.basename(f).replace(path.extname(f),""))})
                    obj_of_data.push(JSON.parse(d))
                })
                }
                
                return obj_of_data
                }


    getFromValue(key="",value,onlyFirst=false) {
    if(this.ext != 'json') return
        let theData = []
        this.getAll(2).forEach(d => {
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


        overwrite(tag="", data) {
            this.emit("overwrite",tag,this.get(tag), data)
            writeFileSync(this.locateRecord(tag), stringify(data))
            return data
        }

        setValue(tag="", key="", value) {
            if(this.ext != 'json') { console.log("Use overwrite for your file type"); return }else{
            this.emit("change",tag,key,value)

            let jsonObj = this.get(tag)
            
            jsonObj[key] = value
            
                    return writeFileSync(this.locateRecord(tag), JSON.stringify(jsonObj, null, 2))
        }
                }


                setTag(old_tag="", new_tag="") {
                    this.emit("retagged",old_tag,new_tag)
                    renameSync(this.locateRecord(old_tag),this.locateRecord(new_tag))
                    return this.get(new_tag)
                    }

                    searchTags(term="",returnType=1) {
                        const list = []
                        for (const f of readdirSync(this.folderPath)){
                            if(f != '.DS_Store'){
                                if(path.extname(f).toLowerCase().replace(".",'') == this.ext){
                        list.push(f.replace(path.extname(f),''))
                                }}
                        }


                    const r = searchArray(list,term)
                    let res = []
                    if(returnType && returnType == 1){
                    res = {} 
                    r.forEach(f => { 
                        res[f] = this.get(f)
                    })
                    }else{
                    res = []
                    r.forEach(f => { 
                    res.push({tag:f, data:this.get(f)})
                    })
                    }
                        return res
                }        
          
                deleteMany = {
                    byAge( options ={ time:{ ms:0, seconds:0, minutes:0, hours:0, days:0 } })  {
                    let ms = 0
                    if(days) ms += days * 86400000
                    if(hours) ms += hours * 3600000
                    if(minutes) ms += minutes * 60000
                    if(seconds) ms += seconds * 1000
                    if(ms){
                    this.emit("byage",ms)
                    walkDir(this.folderPath, (filePath) => {
                        const stat = statSync(filePath)
                        if (new Date().getTime() > new Date(stat.mtime).getTime() + options.time.ms) {
                        this.emit("delete",tag,this.get(path.basename(filePath).replace(this.ext,'')))
                        this.delete(path.basename(filePath).replace(this.ext,''))
                        return
                        }
                      }) 
                    }
                },
                wipe(){
                    this.emit('wipe',this.folderPath)
                        for (const file of readdirSync(this.folderPath)) {
                            rmSync(this.locateRecord(file.replace(this.ext,'')))
                          }
                    },
                    close() {
                        this.emit('close',this.folderPath)
                        rmSync(this.folderPath, { recursive: true })
                }
                }

                dir(){
                if(!existsSync(this.folderPath)){
                this.emit('dir',this.folderPath)
                mkdirSync(this.folderPath)
                }
                }


                 move(tag="",dir="") {
                    if(existsSync(dir)){
                this.emit('move',tag,this.folderPath,dir)
                writeFileSync(dir+'/'+id+this.ext, this.get(tag))
                    rmSync(this.locateRecord(tag))
               }
                }


                clone(tag="",dir="") {
                this.emit('clone',tag,this.folderPath,dir)
                return writeFileSync(dir+'/'+tag+this.ext, this.get(tag)) 
                }
    }