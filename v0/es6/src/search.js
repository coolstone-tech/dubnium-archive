import { readFileSync, readdirSync } from "fs"
import fuzzy from 'fuzzy'

const fuzzySearchByTag = (term="",returnType=1) => {
    const list = []
    for (const f of readdirSync('./records')){
    
    list.push(f)
    
    }


    const rrrr = fuzzy.filter(term, list)
    const r = rrrr.map((st) => { return st.string })

let res

if(returnType == 1){
res = {}
for (const fff of r ){
res[fff.replace('.json','')] = JSON.parse(readFileSync('./records/'+fff,'utf8'))
}

}else if(returnType == 2){
res = []
for (const fff of r ){
    let d = JSON.stringify({"tag":fff.replace('.json',''), results:readFileSync('./records/'+fff,'utf8')})
    console.log(d)
    res.push(JSON.parse(d))
    }
}





    return res



}

export {
fuzzySearchByTag
}