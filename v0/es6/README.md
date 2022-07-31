# Dubnium
### A fast, simple, lightweight, and powerful local JSON-based database


## Installation
[`npm i dubnium`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)

## API

Create Record

```js 
import { Record } from 'dubnium'
new Record("tag_here",{
"data":"here"
})
```

 Delete Record

```js
import { deleteByTag } from 'dubnium'
deleteByTag("tag_here")
```

  Modify

```js
import { modifyRecordValueByTag, modifyTag } from 'dubnium'

//Modify Record's value:
modifyRecordValueByTag("tag_here","key","value")

//Modify Record's tag:
modifyTag("old_tag","new_tag")

//Overwrite Record:
overwriteByTag("tag", {"data":"here"})
```

## Get more in-depth help
[Docs](https://docs.db.coolstone.ml/) & [Discord](https://discord.gg/nzTmfZ8)

## Suggest something
[Discord](https://discord.gg/nzTmfZ8)

## Like our work?
[Support us on Patreon](https://www.patreon.com/coolstone)