const { execSync } = require("child_process")

const openDir = (path="") => {
    let command = '';
    switch (process.platform) {
      case 'darwin':
        command = 'open';
        break;
      case 'win32':
        command = 'explore';
        break;
      default:
        command = 'xdg-open';
        break;
    }
    return execSync(`${command} "${path}"`);
  }

  const openRecordDir = () => {
    openDir('./records')
  }

 module.exports.openDir = openDir
 module.exports.openRecordDir = openRecordDir