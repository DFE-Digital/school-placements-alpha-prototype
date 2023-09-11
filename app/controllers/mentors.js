const mentorModel = require('../models/mentors')
const organisationModel = require('../models/organisations')
const schoolModel = require('../models/schools')

const ageRangeHelper = require('../helpers/age-ranges')
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
    return a.mentor.name.localeCompare(b.mentor.name) || a.school.name.localeCompare(b.school.name)
  })

  res.render('../views/mentors/list', {
    organisation,
    mentors,
    actions: {
      new: `/organisations/${req.params.organisationId}/mentors/new`,
      find: `/organisations/${req.params.organisationId}/mentors/search`,
      view: `/organisations/${req.params.organisationId}/mentors`
    }
  })
}

/// ------------------------------------------------------------------------ ///
/// SHOW mentor
/// ------------------------------------------------------------------------ ///

exports.show_mentors_get = (req, res) => {
  const organisation = organisationModel.findOne({ organisationId: req.params.organisationId })
  const mentor = mentorModel.findOne({ mentorId: req.params.mentorId })

  res.render('../views/mentors/show', {
    organisation,
    mentor,
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors`,
      delete: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/delete`,
    }
  })
}

/// ------------------------------------------------------------------------ ///
/// NEW mentor
/// ------------------------------------------------------------------------ ///

exports.new_mentor_get = (req, res) => {
  let back = `/organisations/${req.params.organisationId}/mentors`
  if (req.query.referrer === 'check') {
    back = `/organisations/${req.params.organisationId}/mentors/new/check`
  }

  res.render('../views/mentors/edit', {
    mentor: req.session.data.mentor,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/new`,
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

  if (errors.length) {
    res.render('../views/mentors/edit', {
      mentor: req.session.data.mentor,
      actions: {
        save: `/organisations/${req.params.organisationId}/mentors/new`,
        back: `/organisations/${req.params.organisationId}/mentors`,
        cancel: `/organisations/${req.params.organisationId}/mentors`
      },
      errors
    })
  } else {
    res.redirect(`/organisations/${req.params.organisationId}/mentors/new/subject`)
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
  if (req.query.referrer === 'check') {
    back += 'check'
  }

  res.render('../views/mentors/subject', {
    organisation,
    mentor,
    subjectOptions,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/new/subject`,
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
  if (req.query.referrer === 'check') {
    back += 'check'
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
        save: `/organisations/${req.params.organisationId}/mentors/new/subject`,
        back,
        cancel: `/organisations/${req.params.organisationId}/mentors`
      },
      errors
    })
  } else {
    res.redirect(`/organisations/${req.params.organisationId}/mentors/new/age-range`)
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
  if (req.query.referrer === 'check') {
    back = `/organisations/${req.params.organisationId}/mentors/new/check`
  }

  res.render('../views/mentors/age-range', {
    organisation,
    mentor,
    ageRangeOptions,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/new/age-range`,
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
  if (req.query.referrer === 'check') {
    back = `/organisations/${req.params.organisationId}/mentors/new/check`
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
        save: `/organisations/${req.params.organisationId}/mentors/new/age-range`,
        back,
        cancel: `/organisations/${req.params.organisationId}/mentors`
      },
      errors
    })
  } else {
    res.redirect(`/organisations/${req.params.organisationId}/mentors/new/key-stage`)
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
  const currentmentor = mentorModel.findOne({ organisationId: req.params.organisationId, mentorId: req.params.mentorId })

  if (req.session.data.mentor) {
    mentor = req.session.data.mentor
  } else {
    mentor = currentmentor
  }

  res.render('../views/mentors/edit', {
    currentmentor,
    mentor,
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/edit`,
      back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
      cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
    }
  })
}

exports.edit_mentor_post = (req, res) => {
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
      mentor: req.session.data.mentor,
      actions: {
        save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/edit`,
        back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`,
        cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
      },
      errors
    })
  } else {
    // mentorModel.saveOne({
    //   organisationId: req.params.organisationId,
    //   mentorId: req.params.mentorId,
    //   mentor: req.session.data.mentor
    // })
    //
    // req.flash('success', 'mentor updated')
    res.redirect(`/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/edit/check`)
  }
}

exports.edit_mentor_check_get = (req, res) => {
  const currentmentor = mentorModel.findOne({ organisationId: req.params.organisationId, mentorId: req.params.mentorId })

  res.render('../views/mentors/check-your-answers', {
    currentmentor,
    mentor: req.session.data.mentor,
    referrer: 'change',
    actions: {
      save: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/edit/check`,
      back: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/edit`,
      change: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}/edit?referrer=change`,
      cancel: `/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`
    }
  })
}

exports.edit_mentor_check_post = (req, res) => {
  mentorModel.saveOne({
    organisationId: req.params.organisationId,
    mentorId: req.params.mentorId,
    mentor: req.session.data.mentor
  })

  delete req.session.data.mentor

  req.flash('success', 'Mentor updated')
  res.redirect(`/organisations/${req.params.organisationId}/mentors/${req.params.mentorId}`)
}

/// ------------------------------------------------------------------------ ///
/// DELETE mentor
/// ------------------------------------------------------------------------ ///

exports.delete_mentor_get = (req, res) => {
  const mentor = mentorModel.findOne({ organisationId: req.params.organisationId, mentorId: req.params.mentorId })

  res.render('../views/mentors/delete', {
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
