const mentorModel = require('../models/mentors')
const organisationModel = require('../models/organisations')
const schoolModel = require('../models/schools')

const ageRangeHelper = require('../helpers/age-ranges')
const giasHelper = require('../helpers/gias')
const keyStageHelper = require('../helpers/key-stages')
const paginationHelper = require('../helpers/pagination')
const subjectHelper = require('../helpers/subjects')
const utilsHelper = require('../helpers/utils')
const validationHelper = require('../helpers/validators')

exports.list_mentors_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentors = mentorModel.findMany({ organisationId: req.params.organisationId })

  delete req.session.data.mentor

  mentors.sort((a,b) => {
    return a.firstName.localeCompare(b.firstName)
      || a.lastName.localeCompare(b.lastName)
  })

  res.render('../views/mentors/list', {
    organisation,
    mentors,
    actions: {
      new: `/organisations/${req.params.organisationId}/mentors/new`,
      find: `/find/organisations/${req.params.organisationId}/mentors/search`,
      view: `/organisations/${req.params.organisationId}/mentors`
    }
  })
}

/// ------------------------------------------------------------------------ ///
/// SHOW mentor
/// ------------------------------------------------------------------------ ///

exports.show_mentor_details_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  res.render('../views/mentors/details', {
    organisation,
    mentor,
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors`,
      change: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      delete: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/delete`,
      description: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/description`
    }
  })
}

exports.show_mentor_additional_details_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  res.render('../views/mentors/description', {
    organisation,
    mentor,
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors`,
      change: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      details: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
    }
  })
}

/// ------------------------------------------------------------------------ ///
/// NEW mentor
/// ------------------------------------------------------------------------ ///

exports.new_mentor_get = (req, res) => {
  const mentor = req.session.data.mentor

  let back = `/organisations/${req.params.organisationId}/mentors`
  let save = `/organisations/${req.params.organisationId}/mentors/new`
  if (req.query.referrer === 'check') {
    back = `/organisations/${req.params.organisationId}/mentors/new/check`
    save += '?referrer=check'
  }

  res.render('../views/mentors/edit', {
    mentor,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/mentors`
    }
  })
}

exports.new_mentor_post = (req, res) => {
  const errors = []

  if (!req.session.data.mentor.firstName.length) {
    const error = {}
    error.fieldName = 'firstName'
    error.href = '#firstName'
    error.text = 'Enter a first name'
    errors.push(error)
  }

  if (!req.session.data.mentor.lastName.length) {
    const error = {}
    error.fieldName = 'lastName'
    error.href = '#lastName'
    error.text = 'Enter a last name'
    errors.push(error)
  }

  if (!req.session.data.mentor.trn.length) {
    const error = {}
    error.fieldName = 'trn'
    error.href = '#trn'
    error.text = 'Enter a teacher reference number (TRN)'
    errors.push(error)
  }

  const mentor = mentorModel.findOne({
    organisationId: req.params.organisationId,
    email: req.session.data.mentor.email
  })

  if (!req.session.data.mentor.email.length) {
    const error = {}
    error.fieldName = 'email'
    error.href = '#email'
    error.text = 'Enter an email address'
    errors.push(error)
  } else if (!validationHelper.isValidEmail(req.session.data.mentor.email)) {
    const error = {}
    error.fieldName = 'email'
    error.href = '#email'
    error.text = 'Enter an email address in the correct format, like name@example.com'
    errors.push(error)
  } else if (mentor) {
    const error = {}
    error.fieldName = 'email'
    error.href = '#email'
    error.text = 'Email address already in use'
    errors.push(error)
  }

  let back = `/organisations/${req.params.organisationId}/mentors`
  let save = `/organisations/${req.params.organisationId}/mentors/new`
  if (req.query.referrer === 'check') {
    back = `/organisations/${req.params.organisationId}/mentors/new/check`
    save += '?referrer=check'
  }

  if (errors.length) {
    res.render('../views/mentors/edit', {
      mentor: req.session.data.mentor,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/mentors`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/organisations/${req.params.organisationId}/mentors/new/check`)
    } else {
      res.redirect(`/organisations/${req.params.organisationId}/mentors/new/subject`)
    }
  }
}

exports.new_mentor_subject_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = req.session.data.mentor

  let selectedSubject
  if (req.session.data.mentor && req.session.data.mentor.subjects) {
    selectedSubject = req.session.data.mentor.subjects
  }

  let subjectOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    subjectOptions = subjectHelper.getSubjectOptions('secondary', selectedSubject)
  } else {
    subjectOptions = subjectHelper.getSubjectOptions('primary', selectedSubject)
  }

  let back = `/organisations/${req.params.organisationId}/mentors/new`
  let save = `/organisations/${req.params.organisationId}/mentors/new/subject`
  if (req.query.referrer === 'check') {
    back += '/check'
    save += '?referrer=check'
  }

  res.render('../views/mentors/subject', {
    organisation,
    mentor,
    subjectOptions,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/mentors`
    }
  })
}

exports.new_mentor_subject_post = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = req.session.data.mentor

  let selectedSubject
  if (req.session.data.mentor && req.session.data.mentor.subjects) {
    selectedSubject = req.session.data.mentor.subjects
  }

  let subjectOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    subjectOptions = subjectHelper.getSubjectOptions('secondary', selectedSubject)
  } else {
    subjectOptions = subjectHelper.getSubjectOptions('primary', selectedSubject)
  }

  let back = `/organisations/${req.params.organisationId}/mentors/new`
  let save = `/organisations/${req.params.organisationId}/mentors/new/subject`
  if (req.query.referrer === 'check') {
    back += '/check'
    save += '?referrer=check'
  }

  const errors = []

  if (!mentor.subjects.length) {
    const error = {}
    error.fieldName = 'subject'
    error.href = '#subject'
    if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
      error.text = 'Select a secondary subject'
    } else {
      error.text = 'Select a primary subject specialism'
    }
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/mentors/subject', {
      organisation,
      mentor,
      subjectOptions,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/mentors`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/organisations/${req.params.organisationId}/mentors/new/check`)
    } else {
      res.redirect(`/organisations/${req.params.organisationId}/mentors/new/age-range`)
    }
  }
}

exports.new_mentor_age_range_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = req.session.data.mentor

  let selectedAgeRange
  if (req.session.data.mentor && req.session.data.mentor.ageRanges) {
    selectedAgeRange = req.session.data.mentor.ageRanges
  }

  let ageRangeOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    ageRangeOptions = ageRangeHelper.getAgeRangeOptions('secondary', selectedAgeRange)
  } else {
    ageRangeOptions = ageRangeHelper.getAgeRangeOptions('primary', selectedAgeRange)
  }

  let back = `/organisations/${req.params.organisationId}/mentors/new/subject`
  let save = `/organisations/${req.params.organisationId}/mentors/new/age-range`
  if (req.query.referrer === 'check') {
    back = `/organisations/${req.params.organisationId}/mentors/new/check`
    save += '?referrer=check'
  }

  res.render('../views/mentors/age-range', {
    organisation,
    mentor,
    ageRangeOptions,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/mentors`
    }
  })
}

exports.new_mentor_age_range_post = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = req.session.data.mentor

  let selectedAgeRange
  if (req.session.data.mentor && req.session.data.mentor.ageRanges) {
    selectedAgeRange = req.session.data.mentor.ageRanges
  }

  let ageRangeOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    ageRangeOptions = ageRangeHelper.getAgeRangeOptions('secondary', selectedAgeRange)
  } else {
    ageRangeOptions = ageRangeHelper.getAgeRangeOptions('primary', selectedAgeRange)
  }

  let back = `/organisations/${req.params.organisationId}/mentors/new/subject`
  let save = `/organisations/${req.params.organisationId}/mentors/new/age-range`
  if (req.query.referrer === 'check') {
    back = `/organisations/${req.params.organisationId}/mentors/new/check`
    save += '?referrer=check'
  }

  const errors = []

  if (!mentor.ageRanges.length) {
    const error = {}
    error.fieldName = 'ageRange'
    error.href = '#ageRange'
    error.text = 'Select an age range'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/mentors/age-range', {
      organisation,
      mentor,
      ageRangeOptions,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/mentors`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/organisations/${req.params.organisationId}/mentors/new/check`)
    } else {
      res.redirect(`/organisations/${req.params.organisationId}/mentors/new/key-stage`)
    }
  }
}

exports.new_mentor_key_stage_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = req.session.data.mentor

  let selectedKeyStage
  if (req.session.data.mentor && req.session.data.mentor.keyStages) {
    selectedKeyStage = req.session.data.mentor.keyStages
  }

  let keyStageOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    keyStageOptions = keyStageHelper.getKeyStageOptions('secondary', selectedKeyStage)
  } else {
    keyStageOptions = keyStageHelper.getKeyStageOptions('primary', selectedKeyStage)
  }

  let back = `/organisations/${req.params.organisationId}/mentors/new/age-range`
  if (req.query.referrer === 'check') {
    back = `/organisations/${req.params.organisationId}/mentors/new/check`
  }

  res.render('../views/mentors/key-stage', {
    organisation,
    mentor,
    keyStageOptions,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/new/key-stage`,
      back,
      cancel: `/organisations/${req.params.organisationId}/mentors`
    }
  })
}

exports.new_mentor_key_stage_post = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = req.session.data.mentor

  let selectedKeyStage
  if (req.session.data.mentor && req.session.data.mentor.keyStages) {
    selectedKeyStage = req.session.data.mentor.keyStages
  }

  let keyStageOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    keyStageOptions = keyStageHelper.getKeyStageOptions('secondary', selectedKeyStage)
  } else {
    keyStageOptions = keyStageHelper.getKeyStageOptions('primary', selectedKeyStage)
  }

  let back = `/organisations/${req.params.organisationId}/mentors/new/age-range`
  if (req.query.referrer === 'check') {
    back = `/organisations/${req.params.organisationId}/mentors/new/check`
  }

  const errors = []

  if (!mentor.keyStages.length) {
    const error = {}
    error.fieldName = 'keyStage'
    error.href = '#keyStage'
    error.text = 'Select a key stage'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/mentors/key-stage', {
      organisation,
      mentor,
      keyStageOptions,
      actions: {
        save: `/organisations/${req.params.organisationId}/mentors/new/key-stage`,
        back,
        cancel: `/organisations/${req.params.organisationId}/mentors`
      },
      errors
    })
  } else {
    res.redirect(`/organisations/${req.params.organisationId}/mentors/new/check`)
  }
}

exports.new_mentor_check_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = req.session.data.mentor
  res.render('../views/mentors/check-your-answers', {
    organisation,
    mentor,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/new/check`,
      back: `/organisations/${req.params.organisationId}/mentors/new/key-stage`,
      change: `/organisations/${req.params.organisationId}/mentors/new`,
      cancel: `/organisations/${req.params.organisationId}/mentors`
    }
  })
}

exports.new_mentor_check_post = (req, res) => {
  mentorModel.saveOne({
    organisationId: req.params.organisationId,
    mentor: req.session.data.mentor
  })

  delete req.session.data.mentor

  req.flash('success', 'Mentor added')
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

/// ------------------------------------------------------------------------ ///
/// EDIT mentor
/// ------------------------------------------------------------------------ ///

exports.edit_mentor_get = (req, res) => {
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  if (req.session.data.mentor) {
    mentor = req.session.data.mentor
  } else {
    mentor = currentMentor
  }

  res.render('../views/mentors/edit', {
    currentMentor,
    mentor,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/edit`,
      back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
    }
  })
}

exports.edit_mentor_post = (req, res) => {
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  const errors = []

  if (!req.session.data.mentor.firstName.length) {
    const error = {}
    error.fieldName = 'firstName'
    error.href = '#firstName'
    error.text = 'Enter a first name'
    errors.push(error)
  }

  if (!req.session.data.mentor.lastName.length) {
    const error = {}
    error.fieldName = 'lastName'
    error.href = '#lastName'
    error.text = 'Enter a last name'
    errors.push(error)
  }

  if (!req.session.data.mentor.trn.length) {
    const error = {}
    error.fieldName = 'trn'
    error.href = '#trn'
    error.text = 'Enter a teacher reference number (TRN)'
    errors.push(error)
  }

  if (!validationHelper.isValidEmail(req.session.data.mentor.email)) {
    const error = {}
    error.fieldName = 'email'
    error.href = '#email'
    error.text = 'Enter an email address'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/mentors/edit', {
      currentMentor,
      mentor: req.session.data.mentor,
      actions: {
        save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/edit`,
        back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
        cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
      },
      errors
    })
  } else {
    mentorModel.updateOne({
      organisationId: req.params.organisationId,
      mentorId: req.params.mentorId,
      mentor: req.session.data.mentor
    })

    delete req.session.data.mentor

    req.flash('success', 'Personal details updated')
    res.redirect(`/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`)
  }
}

exports.edit_mentor_subject_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })
  const mentor = currentMentor

  let selectedSubject
  if (mentor && mentor.subjects) {
    selectedSubject = mentor.subjects
  }

  let subjectOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    subjectOptions = subjectHelper.getSubjectOptions('secondary', selectedSubject)
  } else {
    subjectOptions = subjectHelper.getSubjectOptions('primary', selectedSubject)
  }

  res.render('../views/mentors/subject', {
    organisation,
    currentMentor,
    mentor,
    subjectOptions,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/subject`,
      back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
    }
  })
}

exports.edit_mentor_subject_post = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })
  const mentor = req.session.data.mentor

  let selectedSubject
  if (mentor && mentor.subjects) {
    selectedSubject = mentor.subjects
  }

  let subjectOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    subjectOptions = subjectHelper.getSubjectOptions('secondary', selectedSubject)
  } else {
    subjectOptions = subjectHelper.getSubjectOptions('primary', selectedSubject)
  }

  const errors = []

  if (!mentor.subjects.length) {
    const error = {}
    error.fieldName = 'subject'
    error.href = '#subject'
    if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
      error.text = 'Select a secondary subject'
    } else {
      error.text = 'Select a primary subject specialism'
    }
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/mentors/subject', {
      organisation,
      currentMentor,
      mentor,
      subjectOptions,
      actions: {
        save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/subject`,
        back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
        cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
      },
      errors
    })
  } else {
    mentorModel.updateOne({
      organisationId: req.params.organisationId,
      mentorId: req.params.mentorId,
      mentor: req.session.data.mentor
    })

    delete req.session.data.mentor

    req.flash('success', 'Subject updated')
    res.redirect(`/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`)
  }
}

exports.edit_mentor_age_range_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })
  const mentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  let selectedAgeRange
  if (mentor && mentor.ageRanges) {
    selectedAgeRange = mentor.ageRanges
  }

  let ageRangeOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    ageRangeOptions = ageRangeHelper.getAgeRangeOptions('secondary', selectedAgeRange)
  } else {
    ageRangeOptions = ageRangeHelper.getAgeRangeOptions('primary', selectedAgeRange)
  }

  res.render('../views/mentors/age-range', {
    organisation,
    currentMentor,
    mentor,
    ageRangeOptions,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/age-range`,
      back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
    }
  })
}

exports.edit_mentor_age_range_post = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })
  const mentor = req.session.data.mentor

  let selectedAgeRange
  if (req.session.data.mentor && req.session.data.mentor.ageRanges) {
    selectedAgeRange = req.session.data.mentor.ageRanges
  }

  let ageRangeOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    ageRangeOptions = ageRangeHelper.getAgeRangeOptions('secondary', selectedAgeRange)
  } else {
    ageRangeOptions = ageRangeHelper.getAgeRangeOptions('primary', selectedAgeRange)
  }

  const errors = []

  if (!mentor.ageRanges.length) {
    const error = {}
    error.fieldName = 'ageRange'
    error.href = '#ageRange'
    error.text = 'Select an age range'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/mentors/age-range', {
      organisation,
      currentMentor,
      mentor,
      ageRangeOptions,
      actions: {
        save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/age-range`,
        back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
        cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
      },
      errors
    })
  } else {
    mentorModel.updateOne({
      organisationId: req.params.organisationId,
      mentorId: req.params.mentorId,
      mentor: req.session.data.mentor
    })

    delete req.session.data.mentor

    req.flash('success', 'Age range updated')
    res.redirect(`/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`)
  }
}

exports.edit_mentor_key_stage_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })
  const mentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  let selectedKeyStage
  if (mentor && mentor.keyStages) {
    selectedKeyStage = mentor.keyStages
  }

  let keyStageOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    keyStageOptions = keyStageHelper.getKeyStageOptions('secondary', selectedKeyStage)
  } else {
    keyStageOptions = keyStageHelper.getKeyStageOptions('primary', selectedKeyStage)
  }

  res.render('../views/mentors/key-stage', {
    organisation,
    currentMentor,
    mentor,
    keyStageOptions,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/key-stage`,
      back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
    }
  })
}

exports.edit_mentor_key_stage_post = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })
  const mentor = req.session.data.mentor

  let selectedKeyStage
  if (req.session.data.mentor && req.session.data.mentor.keyStages) {
    selectedKeyStage = req.session.data.mentor.keyStages
  }

  let keyStageOptions
  if (organisation.establishmentPhase && [4,5].includes(organisation.establishmentPhase)) {
    keyStageOptions = keyStageHelper.getKeyStageOptions('secondary', selectedKeyStage)
  } else {
    keyStageOptions = keyStageHelper.getKeyStageOptions('primary', selectedKeyStage)
  }

  let back = `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/age-range`
  if (req.query.referrer === 'check') {
    back = `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/check`
  }

  const errors = []

  if (!mentor.keyStages.length) {
    const error = {}
    error.fieldName = 'keyStage'
    error.href = '#keyStage'
    error.text = 'Select a key stage'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/mentors/key-stage', {
      organisation,
      currentMentor,
      mentor,
      keyStageOptions,
      actions: {
        save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/key-stage`,
        back,
        cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
      },
      errors
    })
  } else {
    mentorModel.updateOne({
      organisationId: req.params.organisationId,
      mentorId: req.params.mentorId,
      mentor: req.session.data.mentor
    })

    delete req.session.data.mentor

    req.flash('success', 'Key stage updated')
    res.redirect(`/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`)
  }
}

exports.edit_mentor_send_training_get = (req, res) => {
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })
  const mentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  let selectedSendTraining
  if (mentor?.send) {
    selectedSendTraining = mentor.send
  }

  const sendOptions = giasHelper.getSENDProvisionOptions(selectedSendTraining, true)

  res.render('../views/mentors/send-training', {
    currentMentor,
    mentor,
    sendOptions,
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/send-training`,
      cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
    }
  })
}

exports.edit_mentor_send_training_post = (req, res) => {
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  let selectedSendTraining
  if (req.session.data.mentor?.send) {
    selectedSendTraining = req.session.data.mentor.send
  }

  const sendOptions = giasHelper.getSENDProvisionOptions(selectedSendTraining, true)

  const errors = []

  if (!req.session.data.mentor.send) {
    const error = {}
    error.fieldName = 'send-training'
    error.href = '#send-training'
    error.text = 'Select at least one SEND training or select ‘None’'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/mentors/send-training', {
      currentMentor,
      mentor: req.session.data.mentor,
      sendOptions,
      actions: {
        back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
        save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/send-training`,
        cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
      },
      errors
    })
  } else {
    mentorModel.updateOne({
      organisationId: req.params.organisationId,
      mentorId: req.params.mentorId,
      mentor: req.session.data.mentor
    })

    delete req.session.data.mentor

    req.flash('success', 'SEND training updated')
    res.redirect(`/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`)
  }
}

exports.edit_mentor_networks_associations_get = (req, res) => {
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })
  const mentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  const wordCount = 250

  res.render('../views/mentors/networks-and-associations', {
    currentMentor,
    mentor,
    wordCount,
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/networks-and-associations`,
      cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
    }
  })
}

exports.edit_mentor_networks_associations_post = (req, res) => {
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  const wordCount = 250

  const errors = []

  // if (!req.session.data.mentor.subjectNetworksAndAssociations.length) {
  //   const error = {}
  //   error.fieldName = 'networks-and-associations'
  //   error.href = '#networks-and-associations'
  //   error.text = 'Enter details about subject networks and associations'
  //   errors.push(error)
  // }

  if (errors.length) {
    res.render('../views/mentors/networks-and-associations', {
      currentMentor,
      mentor: req.session.data.mentor,
      wordCount,
      actions: {
        back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
        save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/networks-and-associations`,
        cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
      },
      errors
    })
  } else {
    mentorModel.updateOne({
      organisationId: req.params.organisationId,
      mentorId: req.params.mentorId,
      mentor: req.session.data.mentor
    })

    delete req.session.data.mentor

    req.flash('success', 'Subject networks and associations updated')
    res.redirect(`/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`)
  }
}

exports.edit_mentor_other_experiences_get = (req, res) => {
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })
  const mentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  const wordCount = 250

  res.render('../views/mentors/other-experiences', {
    currentMentor,
    mentor,
    wordCount,
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/other-experiences`,
      cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
    }
  })
}

exports.edit_mentor_other_experiences_post = (req, res) => {
  const currentMentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  const wordCount = 250

  const errors = []

  // if (!req.session.data.mentor.otherExperiences.length) {
  //   const error = {}
  //   error.fieldName = 'other-experiences'
  //   error.href = '#other-experiences'
  //   error.text = 'Enter details about other experiences'
  //   errors.push(error)
  // }

  if (errors.length) {
    res.render('../views/mentors/other-experiences', {
      currentMentor,
      mentor: req.session.data.mentor,
      wordCount,
      actions: {
        back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
        save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/other-experiences`,
        cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
      },
      errors
    })
  } else {
    mentorModel.updateOne({
      organisationId: req.params.organisationId,
      mentorId: req.params.mentorId,
      mentor: req.session.data.mentor
    })

    delete req.session.data.mentor

    req.flash('success', 'Other experiences updated')
    res.redirect(`/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`)
  }
}

/// ------------------------------------------------------------------------ ///
/// DELETE mentor
/// ------------------------------------------------------------------------ ///

exports.delete_mentor_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = mentorModel.findOne({ organisationId: req.params.organisationId, mentorId: req.params.mentorId })

  res.render('../views/mentors/delete', {
    organisation,
    mentor,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/delete`,
      back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
    }
  })
}

exports.delete_mentor_post = (req, res) => {
  mentorModel.deleteOne({
    organisationId: req.params.organisationId,
    mentorId: req.params.mentorId
  })

  req.flash('success', 'Mentor removed')
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}
