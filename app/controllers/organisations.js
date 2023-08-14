const organisationModel = require('../models/organisations')

exports.list_organisations_get = (req, res) => {
  if (req.session.passport.user.organisations && req.session.passport.user.organisations.length > 1) {
    const organisations = req.session.passport.user.organisations

    res.render('../views/organisations/list', {
      organisations
    })
  } else {
    const organisationId = req.session.passport.user.organisations[0].id
    res.redirect(`/organisations/${organisationId}`)
  }
}

/// ------------------------------------------------------------------------ ///
/// ORGANISATION
/// ------------------------------------------------------------------------ ///

exports.organisation = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  // put the selected organisation into the passport object
  // for use around the service
  req.session.passport.organisation = organisation
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

/// ------------------------------------------------------------------------ ///
/// SHOW ORGANISATION
/// ------------------------------------------------------------------------ ///

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
