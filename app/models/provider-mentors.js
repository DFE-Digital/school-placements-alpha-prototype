const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')

// const organisationModel = require('./organisations')

const directoryPath = path.join(__dirname, '../data/mentors')

exports.findMany = (params) => {
  let mentors = []

  let documents = fs.readdirSync(directoryPath, 'utf8')

  // Only get JSON documents
  documents = documents.filter(doc => doc.match(/.*\.(json)/ig))

  documents.forEach((filename) => {
    const raw = fs.readFileSync(directoryPath + '/' + filename)
    const data = JSON.parse(raw)
    mentors.push(data)
  })

  if (params.organisationId) {
    mentors = mentors.filter(mentor => mentor.providers?.includes(params.organisationId))
  }

  return mentors
}

exports.findOne = (params) => {
  const mentors = this.findMany({ organisationId: params.organisationId })
  let mentor = {}

  if (params.mentorId) {
    mentor = mentors.find(mentor => mentor.id === params.mentorId)
  }

  return mentor
}
