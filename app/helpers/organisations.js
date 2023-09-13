const organisationModel = require('../models/organisations')

exports.getOrganisationName = (organisationId) => {
  let name

  if (organisationId) {
    name = organisationModel.findOne({ organisationId }).name
  }

  return name
}
