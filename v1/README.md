# Dubnium
### A powerful local database


## Installation
[`npm i dubnium`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)

## API

Initialize
```js
const DataManager = require('dubnium')
const db = new DataManager('dir','file extension')
/*db.dir() // if you want Dubnium to create a folder for you*/
```

Create Record

```js 
db.create('tag',data)
```

 Delete Record

```js
db.delete('tag')
```

  Modify

```js
//Modify Record's value (JSON only):
db.setValue('tag','key','value')

//Modify Record's tag:
db.setTag('old','new')

//Overwrite Record:
db.overwrite('tag',data)
```

## Why use Dubnium?
Read about it [here](https://db.coolstone.dev/key-features)

## Other info
### Get more in-depth help from our [docs](https://db.coolstone.dev/) & [Discord](https://discord.gg/nzTmfZ8)

### Report feedback & bugs [here](https://forms.gle/s7Wi4pZqNbZG72mU7)

### Like our work? [Support us on Patreon](https://www.patreon.com/coolstone)