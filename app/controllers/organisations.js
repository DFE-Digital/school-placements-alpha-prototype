const organisationModel = require('../models/organisations')

const giasHelper = require('../helpers/gias')

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
  const organisation = organisationModel.findOne({
    organisationId: req.params.organisationId
  })

  let selectedSpecialClasses
  if (organisation?.specialClasses) {
    selectedSpecialClasses = organisation.specialClasses
  }

  const specialClassesOptions = giasHelper.getSpecialClassesOptions(selectedSpecialClasses)

  res.render('../views/organisations/special-classes', {
    organisation,
    specialClassesOptions,
    actions: {
      back: `/organisations/${req.params.organisationId}/show`,
      save: `/organisations/${req.params.organisationId}/special-classes`,
      cancel: `/organisations/${req.params.organisationId}/show`
    }
  })
}

exports.edit_special_classes_post = (req, res) => {
  let selectedSpecialClasses
  if (req.session.data.organisation?.specialClasses) {
    selectedSpecialClasses = req.session.data.organisation.specialClasses
  }

  const specialClassesOptions = giasHelper.getSpecialClassesOptions(selectedSpecialClasses)

  const errors = []

  if (!req.session.data.organisation.specialClasses) {
    const error = {}
    error.fieldName = 'special-classes'
    error.href = '#special-classes'
    error.text = 'Select if you have special classes'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/organisations/special-classes', {
      organisation: req.session.data.organisation,
      specialClassesOptions,
      actions: {
        back: `/organisations/${req.params.organisationId}/show`,
        save: `/organisations/${req.params.organisationId}/special-classes`,
        cancel: `/organisations/${req.params.organisationId}/show`
      },
      errors
    })
  } else {
    organisationModel.updateOne({
      organisationId: req.params.organisationId,
      organisation: req.session.data.organisation
    })

    delete req.session.data.organisation

    req.flash('success', 'Special classes updated')
    res.redirect(`/organisations/${req.params.organisationId}/show`)
  }
}

exports.edit_send_provision_get = (req, res) => {
  const organisation = organisationModel.findOne({
    organisationId: req.params.organisationId
  })

  let selectedSendProvision
  if (organisation?.send) {
    selectedSendProvision = organisation.send
  }

  const sendOptions = giasHelper.getSENDProvisionOptions(selectedSendProvision, true)

  res.render('../views/organisations/send-provision', {
    organisation,
    sendOptions,
    actions: {
      back: `/organisations/${req.params.organisationId}/show`,
      save: `/organisations/${req.params.organisationId}/send-provision`,
      cancel: `/organisations/${req.params.organisationId}/show`
    }
  })
}

exports.edit_send_provision_post = (req, res) => {
  let selectedSendProvision
  if (req.session.data.organisation?.send) {
    selectedSendProvision = req.session.data.organisation.send
  }

  const sendOptions = giasHelper.getSENDProvisionOptions(selectedSendProvision, true)

  const errors = []

  if (!req.session.data.organisation.send) {
    const error = {}
    error.fieldName = 'send-provision'
    error.href = '#send-provision'
    error.text = 'Select at least one SEND provision'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/organisations/send-provision', {
      organisation: req.session.data.organisation,
      sendOptions,
      actions: {
        back: `/organisations/${req.params.organisationId}/show`,
        save: `/organisations/${req.params.organisationId}/send-provision`,
        cancel: `/organisations/${req.params.organisationId}/show`
      },
      errors
    })
  } else {
    organisationModel.updateOne({
      organisationId: req.params.organisationId,
      organisation: req.session.data.organisation
    })

    delete req.session.data.organisation

    req.flash('success', 'SEND provision updated')
    res.redirect(`/organisations/${req.params.organisationId}/show`)
  }
}

exports.edit_training_with_disabilities_get = (req, res) => {
  const organisation = organisationModel.findOne({
    organisationId: req.params.organisationId
  })

  const wordCount = 250

  res.render('../views/organisations/training-with-disabilities', {
    organisation,
    wordCount,
    actions: {
      back: `/organisations/${req.params.organisationId}/show`,
      save: `/organisations/${req.params.organisationId}/training-with-disabilities`,
      cancel: `/organisations/${req.params.organisationId}/show`
    }
  })
}

exports.edit_training_with_disabilities_post = (req, res) => {
  const wordCount = 250
  const errors = []

  if (!req.session.data.organisation.trainingWithDisabilities.length) {
    const error = {}
    error.fieldName = 'training-with-disabilities'
    error.href = '#training-with-disabilities'
    error.text = 'Enter details about training with disabilities'
    errors.push(error)
  } else if (req.session.data.organisation.trainingWithDisabilities?.split(' ').length > wordCount) {
    const error = {}
    error.fieldName = 'training-with-disabilities'
    error.href = '#training-with-disabilities'
    error.text = `Details about training with disabilities must be ${wordCount} words or fewer`
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/organisations/training-with-disabilities', {
      organisation: req.session.data.organisation,
      wordCount,
      actions: {
        back: `/organisations/${req.params.organisationId}/show`,
        save: `/organisations/${req.params.organisationId}/training-with-disabilities`,
        cancel: `/organisations/${req.params.organisationId}/show`
      },
      errors
    })
  } else {
    organisationModel.updateOne({
      organisationId: req.params.organisationId,
      organisation: req.session.data.organisation
    })

    delete req.session.data.organisation

    req.flash('success', 'Training with disabilities updated')
    res.redirect(`/organisations/${req.params.organisationId}/show`)
  }
}
