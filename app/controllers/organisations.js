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
      change: `/organisations/${req.params.organisationId}`,
      delete: `/organisations/${req.params.organisationId}/delete`
    }
  })
}

/// ------------------------------------------------------------------------ ///
/// EDIT ORGANISATION
/// ------------------------------------------------------------------------ ///

exports.edit_establishment_group_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_establishment_group_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_establishment_type_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_establishment_type_post = (req, res) => {
  res.send('Not implemented')
}
exports.edit_establishment_phase_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_establishment_phase_post = (req, res) => {
  res.send('Not implemented')
}
exports.edit_gender_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_gender_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_age_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_age_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_sixth_form_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_sixth_form_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_nursery_provision_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_nursery_provision_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_religious_character_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_religious_character_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_admissions_policy_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_admissions_policy_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_urban_rural_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_urban_rural_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_school_capacity_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_school_capacity_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_free_school_meals_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_free_school_meals_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_special_classes_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_special_classes_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_send_provision_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_send_provision_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_training_with_disabilities_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_training_with_disabilities_post = (req, res) => {
  res.send('Not implemented')
}
