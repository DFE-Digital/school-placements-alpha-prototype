const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')


exports.findMany = (params) => {
  let placements = []

  if (params.organisationId) {
    const directoryPath = path.join(__dirname, '../data/placements/' + params.organisationId)

    // to prevent errors when an organisation doesn't have any placements
    // create an empty placement directory for the organisation
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath)
    }

    let documents = fs.readdirSync(directoryPath, 'utf8')

    // Only get JSON documents
    documents = documents.filter(doc => doc.match(/.*\.(json)/ig))

    documents.forEach((filename) => {
      const raw = fs.readFileSync(directoryPath + '/' + filename)
      const data = JSON.parse(raw)
      placements.push(data)
    })
  }

  return placements
}

exports.findOne = (params) => {
  let placement = {}

  if (params.organisationId && params.placementId) {
    const directoryPath = path.join(__dirname, '../data/placements/' + params.organisationId)

    const filePath = directoryPath + '/' + params.placementId + '.json'

    const raw = fs.readFileSync(filePath)
    placement = JSON.parse(raw)
  }

  return placement
}

exports.insertOne = (params) => {
  const placement = {}

  if (params) {
    placement.id = uuid()

    if (params.placement.subjectLevel) {
      placement.subjectLevel = params.placement.subjectLevel
    }

    if (params.placement.subject) {
      placement.subject = params.placement.subject
    }

    if (params.placement.ageRange) {
      placement.ageRange = params.placement.ageRange
    }

    if (params.placement.keyStage) {
      placement.keyStage = params.placement.keyStage
    }

    if (params.placement.classSize) {
      placement.classSize = params.placement.classSize
    }

    if (params.placement.trainingPattern) {
      placement.trainingPattern = params.placement.trainingPattern
    }

    if (params.placement.mentorAvailability) {
      placement.mentorAvailability = params.placement.mentorAvailability
    }

    placement.createdAt = new Date()

    const directoryPath = path.join(__dirname, '../data/placements/' + params.organisationId)

    const filePath = directoryPath + '/' + placement.id + '.json'

    // create a JSON sting for the submitted data
    const fileData = JSON.stringify(placement)

    // write the JSON data
    fs.writeFileSync(filePath, fileData)
  }

  return placement
}

exports.updateOne = (params) => {

}

exports.deleteOne = (params) => {
  if (params.organisationId && params.placementId) {
    const directoryPath = path.join(__dirname, '../data/placements/' + params.organisationId)

    const filePath = directoryPath + '/' + params.placementId + '.json'
    fs.unlinkSync(filePath)
  }
}
