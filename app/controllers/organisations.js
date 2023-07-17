const organisationModel = require('../models/organisations')

exports.show_organisation_get = (req, res) => {
  const organisation = organisationModel.findOne({
    organisationId: req.params.organisationId
  })

  res.render('../views/organisations/show', {
    organisation,
    actions: {
      back: `/organisations/${req.params.organisationId}`,
      change: `/organisations/${req.params.organisationId}/edit`,
      delete: `/organisations/${req.params.organisationId}/delete`
    }
  })
}
