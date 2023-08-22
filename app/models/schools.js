const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, '../data/schools/')

exports.findMany = (params) => {
  let schools = []

  let documents = fs.readdirSync(directoryPath, 'utf8')

  // Only get JSON documents
  documents = documents.filter(doc => doc.match(/.*\.(json)/ig))

  documents.forEach((filename) => {
    const raw = fs.readFileSync(directoryPath + '/' + filename)
    const data = JSON.parse(raw)
    schools.push(data)
  })

  if (params.query?.length) {
    const query = params.query.toLowerCase()
    return schools.filter(school =>
      school.name.toLowerCase().includes(query)
      || school.urn?.toString().includes(query)
      || school.address?.postcode?.toLowerCase().includes(query)
     )
  }

  return schools
}

exports.findOne = (params) => {
  let school = {}

  if (params.schoolId) {
    const filePath = directoryPath + '/' + params.schoolId + '.json'

    const raw = fs.readFileSync(filePath)
    school = JSON.parse(raw)
  }

  return school
}

exports.insertOne = (params) => {

}

exports.updateOne = (params) => {

}

exports.deleteOne = (params) => {

}
