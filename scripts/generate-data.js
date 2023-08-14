const del = require('del')
const fs = require('fs')
const path = require('path')

const sourceDirectory = path.join(__dirname, '../app/data/seed')
const destinationDirectory = path.join(__dirname, '../app/data')

const copy = (source, destination) => {
  const list = fs.readdirSync(source)
  let sourceFile, destinationFile

  list.forEach((file) => {
    sourceFile = source + '/' + file
    destinationFile = destination + '/' + file

    const stat = fs.statSync(sourceFile)
    if (stat && stat.isDirectory()) {
      try {
        console.log('Creating directory: ' + destinationFile)
        fs.mkdirSync(destinationFile)
      } catch (e) {
        console.log('Directory already exists: ' + destinationFile)
      }
      copy(sourceFile, destinationFile)
    } else {
      try {
        console.log('Copying file: ' + destinationFile)
        fs.writeFileSync(destinationFile, fs.readFileSync(sourceFile))
      } catch (e) {
        console.log('Could’t copy file: ' + destinationFile)
      }
    }
  })
}

const remove = (destination) => {
  const list = fs.readdirSync(destination)
  let destinationFile

  list.forEach((file) => {
    destinationFile = destination + '/' + file

    const stat = fs.statSync(destinationFile)
    if (stat && stat.isDirectory()) {
      if (!destinationFile.includes('/app/data/seed')) {
        console.log('Removing directory: ' + destinationFile)
        del(destinationFile)
      }
    } else {
      if (!destinationFile.includes('session-data-defaults.js') && !destinationFile.includes('settings.json') && !destinationFile.includes('README.md')) {
        try {
          console.log('Removing file: ' + destinationFile)
          fs.unlinkSync(destinationFile)
        } catch (e) {
          console.log('Could’t remove file: ' + destinationFile)
        }
      }
    }
  })
}

remove(destinationDirectory)

copy(sourceDirectory, destinationDirectory)
