const csvToJson = require('convert-csv-to-json')
const fs = require('fs')
const path = require('path')

const { DateTime } = require('luxon')

const sourceDirectoryPath = path.join(__dirname, '../data/seed/temp/')
const destinationDirectoryPath = path.join(__dirname, '../data/seed/schools/')

exports.gias_basic = (req, res) => {
  // data must have the headings
  // urn,ukprn,name,type,group,status,phase,addressLine1,addressLine2,addressLine3,town,county,postcode,latitude,longitude,regionCode,website,telephone

  const fileInputName = sourceDirectoryPath + 'gias-basic-details.csv'

  const items = csvToJson
    // .formatValueByType()
    // .fieldDelimiter(',')
    .getJsonFromCsv(fileInputName)

  const schools = []

  items.forEach(item => {
    const school = {}

    school.urn = parseInt(item.urn)

    if (item.ukprn) {
      school.ukprn = parseInt(item.ukprn)
    }

    school.name = item.name

    school.type = parseInt(item.type)

    school.group = parseInt(item.group)

    school.status = parseInt(item.status)

    school.phase = parseInt(item.phase)

    const address = {}

    if (item.addressLine1) {
      address.addressLine1 = item.addressLine1
    }

    if (item.addressLine2) {
      address.addressLine2 = item.addressLine2
    }

    if (item.addressLine3) {
      address.addressLine3 = item.addressLine3
    }

    if (item.town) {
      address.town = item.town
    }

    if (item.county) {
      address.county = item.county
    }

    if (item.postcode) {
      address.postcode = item.postcode
    }

    if (Object.keys(address).length) {
      school.address = address
    }

    const location = {}

    if (item.latitude) {
      location.latitude = parseFloat(item.latitude)
    }

    if (item.longitude) {
      location.longitude = parseFloat(item.longitude)
    }

    if (item.regionCode) {
      location.regionCode = item.regionCode
    }

    if (Object.keys(location).length) {
      school.location = location
    }

    const contact = {}

    if (item.website) {
      contact.website = item.website
    }

    if (item.telephone) {
      contact.telephone = item.telephone
    }

    if (Object.keys(contact).length) {
      school.contact = contact
    }

    console.log(school)

    if (Object.keys(school).length > 1) {
      schools.push(school)
    }
  })

  // create a JSON sting for the submitted data
  const fileData = JSON.stringify(schools)

  const filePath = destinationDirectoryPath + 'schools-basic-details.json'

  // write the JSON data
  // fs.writeFileSync(filePath, fileData)

  res.send('Working on it...')
}

exports.gias_contrast_factors = (req, res) => {
  // data must have the headings:
  // urn,minAge,maxAge,gender,boarders,officialSixthForm,nurseryProvision,childcareFacilities,religiousCharacter,admissionsPolicy,schoolCapacity,totalPupils,totalBoys,totalGirls,specialClasses,percentageFreeSchoolMeals,trustSchool,trustCode,schoolSponsorCode,federationCode,furtherEducationType,localAuthorityCode,urbanRural,updatedAt

  const fileInputName = sourceDirectoryPath + 'gias-contrast-factors.csv'
  const items = csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName)

  const schools = []


  items.forEach(item => {
    const school = {}

    school.urn = parseInt(item.urn)

    if (item.minAge) {
      school.minAge = parseInt(item.minAge)
    }

    if (item.maxAge) {
      school.maxAge = parseInt(item.maxAge)
    }

    if (item.gender) {
      school.gender = parseInt(item.gender)
    }

    if (item.boarders) {
      school.boarders = parseInt(item.boarders)
    }

    if (item.officialSixthForm) {
      school.officialSixthForm = parseInt(item.officialSixthForm)
    }

    if (item.nurseryProvision) {
      school.nurseryProvision = parseInt(item.nurseryProvision)
    }

    if (item.childcareFacilities) {
      school.childcareFacilities = parseInt(item.childcareFacilities)
    }

    if (item.religiousCharacter) {
      school.religiousCharacter = parseInt(item.religiousCharacter)
    }

    if (item.admissionsPolicy) {
      school.admissionsPolicy = parseInt(item.admissionsPolicy)
    }

    if (item.schoolCapacity) {
      school.schoolCapacity = parseInt(item.schoolCapacity)
    }

    if (item.totalPupils) {
      school.totalPupils = parseInt(item.totalPupils)
    }

    if (item.totalBoys) {
      school.totalBoys = parseInt(item.totalBoys)
    }

    if (item.totalGirls) {
      school.totalGirls = parseInt(item.totalGirls)
    }

    if (item.specialClasses) {
      school.specialClasses = parseInt(item.specialClasses)
    }

    if (item.percentageFreeSchoolMeals) {
      school.percentageFreeSchoolMeals = parseFloat(item.percentageFreeSchoolMeals)
    }

    if (item.trustSchool) {
      school.trustSchool = parseInt(item.trustSchool)
    }

    if (item.trustCode) {
      school.trustCode = parseInt(item.trustCode)
    }

    if (item.schoolSponsorCode) {
      school.schoolSponsorCode = parseInt(item.schoolSponsorCode)
    }

    if (item.federationCode) {
      school.federationCode = parseInt(item.federationCode)
    }

    if (item.furtherEducationType) {
      school.furtherEducationType = parseInt(item.furtherEducationType)
    }

    if (item.localAuthorityCode) {
      school.localAuthorityCode = parseInt(item.localAuthorityCode)
    }

    if (item.urbanRural) {
      school.urbanRural = item.urbanRural
    }

    if (item.updatedAt) {
      school.updatedAt = DateTime
        .fromFormat(item.updatedAt, 'D', { locale: 'en-GB' })
        .toISO({ includeOffset: false })
    }

    console.log(school)

    if (Object.keys(school).length > 1) {
      schools.push(school)
    }
  })

  // create a JSON sting for the submitted data
  const fileData = JSON.stringify(schools)

  const filePath = destinationDirectoryPath + 'schools-contrast-factors.json'

  // write the JSON data
  // fs.writeFileSync(filePath, fileData)

  res.send('Working on it...')
}

exports.gias_combine_data = (req, res) => {
  const items = require('../data/seed/schools/schools-basic-details')

  const contrastFactors = require('../data/seed/schools/schools-contrast-factors')
  const ofstedRatings = require('../data/seed/schools/schools-ofsted')
  const sendDetails = require('../data/seed/schools/schools-send')
  const headDetails = require('../data/seed/schools/schools-head')

  const schools = []

  items.forEach(item => {
    let school = {}

    const factors = contrastFactors.find(f => f.urn === item.urn)

    if (factors) {
      school = {...item, ...factors}
    } else {
      school = item
    }

    const head = headDetails.find(h => h.urn === item.urn)

    if (head) {
      school.head = head.head
    }

    const send = sendDetails.find(s => s.urn === item.urn)

    if (send) {
      school.send = send.send
    }

    const rating = ofstedRatings.find(o => o.urn === item.urn)

    if (rating) {
      school.ofsted = rating.ofsted
    }

    school.createdAt = school.updatedAt

    console.log(school)

    if (Object.keys(school).length > 1) {
      schools.push(school)
    }
  })

  // create a JSON sting for the submitted data
  const fileData = JSON.stringify(schools)

  const filePath = destinationDirectoryPath + 'schools.json'

  // write the JSON data
  // fs.writeFileSync(filePath, fileData)

  res.send('Working on it...')

}

exports.providers = (req, res) => {
  const providers = require('../data/seed/temp/providers')

  const destinationDirectoryPath = path.join(__dirname, '../data/seed/organisations/')

  providers.forEach(provider => {

    console.log(provider)

    // create a JSON sting for the submitted data
    const fileData = JSON.stringify(provider)

    const filePath = destinationDirectoryPath + provider.id + '.json'

    // write the JSON data
    // fs.writeFileSync(filePath, fileData)

  })

  res.send('Working on it...')

}

exports.lead_schools = (req, res) => {
  const providers = require('../data/seed/temp/lead-schools')

  const destinationDirectoryPath = path.join(__dirname, '../data/seed/organisations/')

  providers.forEach(provider => {

    console.log(provider)

    // create a JSON sting for the submitted data
    const fileData = JSON.stringify(provider)

    const filePath = destinationDirectoryPath + provider.id + '.json'

    // write the JSON data
    // fs.writeFileSync(filePath, fileData)

  })

  res.send('Working on it...')

}
