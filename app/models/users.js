const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')

const organisationModel = require('./organisations')

const directoryPath = path.join(__dirname, '../data/users/')

exports.findMany = (params) => {
  let users = []

  let documents = fs.readdirSync(directoryPath, 'utf8')

  // Only get JSON documents
  documents = documents.filter(doc => doc.match(/.*\.(json)/ig))

  documents.forEach((filename) => {
    const raw = fs.readFileSync(directoryPath + '/' + filename)
    const data = JSON.parse(raw)
    users.push(data)
  })

  if (params.organisationId) {
    users = users.filter(user => {
      return user.organisations.find(organisation => organisation.id === params.organisationId)
    })
  }

  return users
}

exports.findOne = (params) => {
  const users = this.findMany({ organisationId: params.organisationId })
  let user = {}

  if (params.userId) {
    user = users.find(user => user.id === params.userId)
  }

  if (params.email) {
    user = users.find(user => user.email === params.email)
  }

  return user
}

exports.saveOne = (params) => {
  let user = {}

  if (params.organisationId) {
    if (params.userId) {
      user = this.updateOne(params)
    } else {
      const userExists = this.findOne({ email: params.user.email })

      if (userExists) {
        user = this.updateOne(params)
      } else {
        user = this.insertOne(params)
      }
    }
  }

  return user
}

exports.insertOne = (params) => {
  const user = {}

  if (params.organisationId) {
    user.id = uuid()

    if (params.user.firstName) {
      user.firstName = params.user.firstName
    }

    if (params.user.lastName) {
      user.lastName = params.user.lastName
    }

    if (params.user.email) {
      user.email = params.user.email
      user.username = params.user.email
    }

    user.password = 'bat'

    user.organisations = []

    const o = organisationModel.findOne({ organisationId: params.organisationId })

    const organisation = {}
    organisation.id = o.id
    organisation.code = o.code
    organisation.name = o.name

    organisation.permissions = []

    organisation.notifications = []

    user.organisations.push(organisation)

    user.active = true
    user.createdAt = new Date()

    const filePath = directoryPath + '/' + user.id + '.json'

    // create a JSON sting for the submitted data
    const fileData = JSON.stringify(user)

    // write the JSON data
    fs.writeFileSync(filePath, fileData)
  }

  return user
}

exports.updateOne = (params) => {
  let user
  if (params.userId) {
    user = this.findOne({ userId: params.userId })
  } else {
    user = this.findOne({ email: params.user.email })
  }

  if (user) {
    if (params.user.firstName) {
      user.firstName = params.user.firstName
    }

    if (params.user.lastName) {
      user.lastName = params.user.lastName
    }

    if (params.user.email) {
      user.email = params.user.email
    }

    const organisationExists = user.organisations.find(
      organisation => organisation.id === params.organisationId
    )

    if (!organisationExists) {
      const o = organisationModel.findOne({ organisationId: params.organisationId })

      const organisation = {}
      organisation.id = o.id
      organisation.code = o.code
      organisation.name = o.name

      organisation.permissions = []

      organisation.notifications = []

      user.organisations.push(organisation)
    }

    user.active = true
    user.updatedAt = new Date()

    const filePath = directoryPath + '/' + user.id + '.json'

    // create a JSON sting for the submitted data
    const fileData = JSON.stringify(user)

    // write the JSON data
    fs.writeFileSync(filePath, fileData)
  }

  return user
}

exports.deleteOne = (params) => {
  if (params.organisationId && params.userId) {
    const user = this.findOne({ userId: params.userId })

    user.organisations = user.organisations.filter(
      organisation => organisation.id !== params.organisationId
    )

    user.updatedAt = new Date()

    const filePath = directoryPath + '/' + user.id + '.json'

    if (user.organisations.length) {
      // create a JSON sting for the submitted data
      const fileData = JSON.stringify(user)
      // write the JSON data
      fs.writeFileSync(filePath, fileData)
    } else {
      // remove the user altogether since they're no longer associated with an
      // organisation
      fs.unlinkSync(filePath)
    }
  }
}
