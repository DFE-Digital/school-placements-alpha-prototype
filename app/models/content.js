const path = require('path')
const fs = require('fs')
const matter = require('gray-matter')

const directoryPath = path.join(__dirname, '../content/')

exports.findOne = (params) => {
  let doc = fs.readFileSync(directoryPath + params.fileName + '.md', 'utf8')
  const content = matter(doc)
  return content
}
