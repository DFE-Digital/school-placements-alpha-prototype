const fs = require('fs')
const path = require('path')

const directoryPath = path.join(__dirname, '../data/users/')

exports.findOne = (params) => {
  const users = []
  let user = {}

  let documents = fs.readdirSync(directoryPath, 'utf8')

  // Only get JSON documents
  documents = documents.filter(doc => doc.match(/.*\.(json)/ig))

  documents.forEach((filename) => {
    const raw = fs.readFileSync(directoryPath + '/' + filename)
    const data = JSON.parse(raw)
    users.push(data)
  })

  user = users.find(user =>
    user.username === params.username &&
    user.password === params.password &&
    user.active === params.active
  )

  return user
}
