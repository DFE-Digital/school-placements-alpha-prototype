const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, '../data/organisations/')

exports.findMany = (params) => {
  let organisations = []

  let documents = fs.readdirSync(directoryPath, 'utf8')

  // Only get JSON documents
  documents = documents.filter(doc => doc.match(/.*\.(json)/ig))

  documents.forEach((filename) => {
    const raw = fs.readFileSync(directoryPath + '/' + filename)
    const data = JSON.parse(raw)
    organisations.push(data)
  })

  if (params.query?.length) {
    const query = params.query.toLowerCase()
    return organisations.filter(organisation =>
      organisation.name.toLowerCase().includes(query)
      || organisation.code.toLowerCase().includes(query)
      || organisation.ukprn?.toString().includes(query)
      || organisation.address?.postcode?.toLowerCase().includes(query)
     )
  }

  return organisations
}

exports.findOne = (params) => {
  let organisation = {}

  if (params.organisationId) {
    const filePath = directoryPath + '/' + params.organisationId + '.json'

    const raw = fs.readFileSync(filePath)
    organisation = JSON.parse(raw)
  }

  return organisation
}

exports.insertOne = (params) => {

}

exports.updateOne = (params) => {
  let organisation

  if (params.organisationId) {
    organisation = this.findOne({ organisationId: params.organisationId })

    if (params.organisation.trainingWithDisabilities !== undefined) {
      organisation.trainingWithDisabilities = params.organisation.trainingWithDisabilities
    }

    if (params.organisation.send !== undefined) {
      organisation.send = params.organisation.send
    }

    if (params.organisation.specialClasses !== undefined) {
      organisation.specialClasses = params.organisation.specialClasses
    }

    organisation.updatedAt = new Date()

    const filePath = directoryPath + '/' + params.organisationId + '.json'

    // create a JSON sting for the submitted data
    const fileData = JSON.stringify(organisation)

    // write the JSON data
    fs.writeFileSync(filePath, fileData)
  }

  return organisation
}

exports.deleteOne = (params) => {

}
