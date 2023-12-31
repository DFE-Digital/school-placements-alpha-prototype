const placementModel = require('../models/placements')

const ageRangeHelper = require('../helpers/age-ranges')
const keyStageHelper = require('../helpers/key-stages')
const mentorAvailabilityHelper = require('../helpers/mentor-availability')
const mentorHelper = require('../helpers/mentors')
const subjectHelper = require('../helpers/subjects')
const trainingPatternHelper = require('../helpers/training-patterns')

exports.list_placements_get = (req, res) => {
  // clean out placement data
  delete req.session.data.placement

  const placements = placementModel.findMany({ organisationId: req.params.organisationId })

  res.render('../views/placements/list', {
    placements,
    actions: {
      new: `/organisations/${req.params.organisationId}/placements/new/subject-level`,
      view: `/organisations/${req.params.organisationId}/placements`
    }
  })
}

exports.show_placement_get = (req, res) => {
  const placement = placementModel.findOne({
    organisationId: req.params.organisationId,
    placementId: req.params.placementId
  })

  res.render('../views/placements/show', {
    placement,
    actions: {
      back: `/organisations/${req.params.organisationId}/placements`,
      change: `/organisations/${req.params.organisationId}/placements/${req.params.placementId}`,
      delete: `/organisations/${req.params.organisationId}/placements/${req.params.placementId}/delete`
    }
  })
}

exports.delete_placement_get = (req, res) => {
  const placement = placementModel.findOne({
    organisationId: req.params.organisationId,
    placementId: req.params.placementId
  })

  res.render('../views/placements/delete', {
    placement,
    actions: {
      save: `/organisations/${req.params.organisationId}/placements/${req.params.placementId}/delete`,
      back: `/organisations/${req.params.organisationId}/placements/${req.params.placementId}`,
      cancel: `/organisations/${req.params.organisationId}/placements/${req.params.placementId}`
    }
  })
}

exports.delete_placement_post = (req, res) => {
  const placement = placementModel.findOne({
    organisationId: req.params.organisationId,
    placementId: req.params.placementId
  })

  const errors = []

  if (errors.length) {
    res.render('../views/placements/delete', {
      placement,
      actions: {
        save: `/organisations/${req.params.organisationId}/placements/${req.params.placementId}/delete`,
        back: `/organisations/${req.params.organisationId}/placements/${req.params.placementId}`,
        cancel: `/organisations/${req.params.organisationId}/placements/${req.params.placementId}`
      },
      errors
    })
  } else {
    placementModel.deleteOne({
      organisationId: req.params.organisationId,
      placementId: req.params.placementId
    })

    req.flash('success', 'Placement deleted')
    res.redirect(`/organisations/${req.params.organisationId}/placements`)
  }
}

// NEW PLACEMENT

exports.new_placement_subject_level_get = (req, res) => {
  let selectedSubjectLevel
  if (req.session.data.placement?.subjectLevel) {
    selectedSubjectLevel = req.session.data.placement.subjectLevel
  }

  const subjectLevelOptions = subjectHelper.getSubjectLevelOptions(selectedSubjectLevel)

  let save = `/organisations/${req.params.organisationId}/placements/new/subject-level`
  let back = `/organisations/${req.params.organisationId}/placements`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/subject-level', {
    subjectLevelOptions,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/placements`
    }
  })
}

exports.new_placement_subject_level_post = (req, res) => {
  const errors = []

  if (!req.session.data.placement) {
    req.session.data.placement = {}
  }

  let selectedSubjectLevel
  if (req.session.data.placement?.subjectLevel) {
    selectedSubjectLevel = req.session.data.placement.subjectLevel
  }

  const subjectLevelOptions = subjectHelper.getSubjectLevelOptions(selectedSubjectLevel)

  let save = `/organisations/${req.params.organisationId}/placements/new/subject-level`
  let back = `/organisations/${req.params.organisationId}/placements`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  if (!req.session.data.placement.subjectLevel) {
    const error = {}
    error.fieldName = 'subject-level'
    error.href = '#subject-level'
    error.text = 'Select a subject level'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/placements/subject-level', {
      placement: req.session.data.placement,
      subjectLevelOptions,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/placements`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/check-your-answers`)
    } else {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/subject`)
    }
  }
}

exports.new_placement_subject_get = (req, res) => {
  let selectedSubject
  if (req.session.data.placement?.subject) {
    selectedSubject = req.session.data.placement.subject
  }

  const subjectOptions = subjectHelper.getSubjectOptions(
    req.session.data.placement.subjectLevel,
    selectedSubject
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/subject`
  let back = `/organisations/${req.params.organisationId}/placements/new/subject-level`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/subject', {
    subjectOptions,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/placements`
    }
  })
}

exports.new_placement_subject_post = (req, res) => {
  const errors = []

  let selectedSubject
  if (req.session.data.placement?.subject) {
    selectedSubject = req.session.data.placement.subject
  }

  const subjectOptions = subjectHelper.getSubjectOptions(
    req.session.data.placement.subjectLevel,
    selectedSubject
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/subject`
  let back = `/organisations/${req.params.organisationId}/placements/new/subject-level`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  if (!req.session.data.placement.subject) {
    const error = {}
    error.fieldName = 'subject'
    error.href = '#subject'
    error.text = 'Select a subject'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/placements/subject', {
      placement: req.session.data.placement,
      subjectOptions,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/placements`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/check-your-answers`)
    } else {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/age-range`)
    }
  }
}

exports.new_placement_age_range_get = (req, res) => {
  let selectedAgeRange
  if (req.session.data.placement?.ageRange) {
    selectedAgeRange = req.session.data.placement.ageRange
  }

  const ageRangeOptions = ageRangeHelper.getAgeRangeOptions(
    req.session.data.placement.subjectLevel,
    selectedAgeRange
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/age-range`
  let back = `/organisations/${req.params.organisationId}/placements/new/subject`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/age-range', {
    ageRangeOptions,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/placements`
    }
  })
}

exports.new_placement_age_range_post = (req, res) => {
  const errors = []

  let selectedAgeRange
  if (req.session.data.placement?.ageRange) {
    selectedAgeRange = req.session.data.placement.ageRange
  }

  const ageRangeOptions = ageRangeHelper.getAgeRangeOptions(
    req.session.data.placement.subjectLevel,
    selectedAgeRange
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/age-range`
  let back = `/organisations/${req.params.organisationId}/placements/new/subject`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  if (!req.session.data.placement.ageRange) {
    const error = {}
    error.fieldName = 'age-range'
    error.href = '#age-range'
    error.text = 'Select an age range'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/placements/age-range', {
      placement: req.session.data.placement,
      ageRangeOptions,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/placements`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/check-your-answers`)
    } else {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/key-stage`)
    }
  }
}

exports.new_placement_key_stage_get = (req, res) => {
  let selectedKeyStage
  if (req.session.data.placement?.keyStage) {
    selectedKeyStage = req.session.data.placement.keyStage
  }

  const keyStageOptions = keyStageHelper.getKeyStageOptions(
    req.session.data.placement.subjectLevel,
    selectedKeyStage
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/key-stage`
  let back = `/organisations/${req.params.organisationId}/placements/new/age-range`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/key-stage', {
    keyStageOptions,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/placements`
    }
  })
}

exports.new_placement_key_stage_post = (req, res) => {
  const errors = []

  let selectedKeyStage
  if (req.session.data.placement?.keyStage) {
    selectedKeyStage = req.session.data.placement.keyStage
  }

  const keyStageOptions = keyStageHelper.getKeyStageOptions(
    req.session.data.placement.subjectLevel,
    selectedKeyStage
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/key-stage`
  let back = `/organisations/${req.params.organisationId}/placements/new/age-range`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  if (!req.session.data.placement.keyStage) {
    const error = {}
    error.fieldName = 'key-stage'
    error.href = '#key-stage'
    error.text = 'Select a key stage'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/placements/key-stage', {
      placement: req.session.data.placement,
      keyStageOptions,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/placements`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/check-your-answers`)
    } else {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/mentor`)
    }
  }
}

exports.new_placement_class_size_get = (req, res) => {
  let save = `/organisations/${req.params.organisationId}/placements/new/class-size`
  let back = `/organisations/${req.params.organisationId}/placements/new/age-range`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/class-size', {
    placement: req.session.data.placement,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/placements`
    }
  })
}

exports.new_placement_class_size_post = (req, res) => {
  const errors = []

  let save = `/organisations/${req.params.organisationId}/placements/new/class-size`
  let back = `/organisations/${req.params.organisationId}/placements/new/age-range`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  if (!req.session.data.placement.classSize.length) {
    const error = {}
    error.fieldName = 'class-size'
    error.href = '#class-size'
    error.text = 'Enter a class size'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/placements/class-size', {
      placement: req.session.data.placement,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/placements`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/check-your-answers`)
    } else {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/training-pattern`)
    }
  }
}

exports.new_placement_training_pattern_get = (req, res) => {
  let selectedTrainingPattern
  if (req.session.data.placement?.trainingPattern) {
    selectedTrainingPattern = req.session.data.placement.trainingPattern
  }

  const trainingPatternOptions = trainingPatternHelper.getTrainingPatternOptions(
    selectedTrainingPattern
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/training-pattern`
  let back = `/organisations/${req.params.organisationId}/placements/new/class-size`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/training-pattern', {
    trainingPatternOptions,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/placements`
    }
  })
}

exports.new_placement_training_pattern_post = (req, res) => {
  const errors = []

  let selectedTrainingPattern
  if (req.session.data.placement?.trainingPattern) {
    selectedTrainingPattern = req.session.data.placement.trainingPattern
  }

  const trainingPatternOptions = trainingPatternHelper.getTrainingPatternOptions(
    selectedTrainingPattern
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/training-pattern`
  let back = `/organisations/${req.params.organisationId}/placements/new/class-size`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  if (!req.session.data.placement.trainingPattern.length) {
    const error = {}
    error.fieldName = 'training-pattern'
    error.href = '#training-pattern'
    error.text = 'Select a training pattern'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/placements/training-pattern', {
      placement: req.session.data.placement,
      trainingPatternOptions,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/placements`
      },
      errors
    })
  } else {
    res.redirect(`/organisations/${req.params.organisationId}/placements/new/check-your-answers`)
  }

}

exports.new_placement_mentor_get = (req, res) => {
  let selectedMentor
  if (req.session.data.placement?.mentor) {
    selectedMentor = req.session.data.placement.mentor
  }

  const mentorOptions = mentorHelper.getMentorOptions(
    req.params.organisationId,
    req.session.data.placement.subject,
    selectedMentor
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/mentor`
  let back = `/organisations/${req.params.organisationId}/placements/new/key-stage`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/mentor', {
    mentorOptions,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/placements`
    }
  })
}

exports.new_placement_mentor_post = (req, res) => {
  const errors = []

  let selectedMentor
  if (req.session.data.placement?.mentor) {
    selectedMentor = req.session.data.placement.mentor
  }

  const mentorOptions = mentorHelper.getMentorOptions(
    req.params.organisationId,
    req.session.data.placement.subject,
    selectedMentor
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/mentor`
  let back = `/organisations/${req.params.organisationId}/placements/new/key-stage`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  if (!req.session.data.placement.mentor.length) {
    const error = {}
    error.fieldName = 'mentor-availability'
    error.href = '#training-pattern'
    error.text = 'Select a training pattern'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/placements/mentor', {
      placement: req.session.data.placement,
      mentorOptions,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/placements`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/check-your-answers`)
    } else {
      res.redirect(`/organisations/${req.params.organisationId}/placements/new/mentor-availability`)
    }
  }

}

exports.new_placement_mentor_availability_get = (req, res) => {
  let selectedMentorAvailability
  if (req.session.data.placement?.mentorAvailability) {
    selectedMentorAvailability = req.session.data.placement.mentorAvailability
  }

  const mentorAvailabilityOptions = mentorAvailabilityHelper.getMentorAvailabilityOptions(
    selectedMentorAvailability
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/mentor-availability`
  let back = `/organisations/${req.params.organisationId}/placements/new/mentor`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/mentor-availability', {
    mentorAvailabilityOptions,
    actions: {
      save,
      back,
      cancel: `/organisations/${req.params.organisationId}/placements`
    }
  })
}

exports.new_placement_mentor_availability_post = (req, res) => {
  const errors = []

  let selectedMentorAvailability
  if (req.session.data.placement?.mentorAvailability) {
    selectedMentorAvailability = req.session.data.placement.mentorAvailability
  }

  const mentorAvailabilityOptions = mentorAvailabilityHelper.getMentorAvailabilityOptions(
    selectedMentorAvailability
  )

  let save = `/organisations/${req.params.organisationId}/placements/new/mentor-availability`
  let back = `/organisations/${req.params.organisationId}/placements/new/mentor`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  if (!req.session.data.placement.mentorAvailability.length) {
    const error = {}
    error.fieldName = 'mentor-availability'
    error.href = '#mentor-availability'
    error.text = 'Select mentor availability'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/placements/mentor-availability', {
      placement: req.session.data.placement,
      mentorAvailabilityOptions,
      actions: {
        save,
        back,
        cancel: `/organisations/${req.params.organisationId}/placements`
      },
      errors
    })
  } else {
    res.redirect(`/organisations/${req.params.organisationId}/placements/new/check-your-answers`)
  }

}

exports.new_placement_check_get = (req, res) => {
  res.render('../views/placements/check-your-answers', {
    placement: req.session.data.placement,
    actions: {
      save: `/organisations/${req.params.organisationId}/placements/new/check-your-answers`,
      back: `/organisations/${req.params.organisationId}/placements/new/training-pattern`,
      cancel: `/organisations/${req.params.organisationId}/placements`,
      change: `/organisations/${req.params.organisationId}/placements/new`
    }
  })
}

exports.new_placement_check_post = (req, res) => {
  placementModel.insertOne({
    organisationId: req.params.organisationId,
    placement: req.session.data.placement
  })

  req.flash('success', 'Placement added')

  res.redirect(`/organisations/${req.params.organisationId}/placements`)
}

// EDIT PLACEMENT

exports.edit_placement_subject_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_subject_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_age_range_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_age_range_post = (req, res) => {
  res.send('Not implemented')
}
exports.edit_placement_key_stage_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_key_stage_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_class_size_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_class_size_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_training_pattern_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_training_pattern_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_mentor_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_mentor_post = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_mentor_availability_get = (req, res) => {
  res.send('Not implemented')
}

exports.edit_placement_mentor_availability_post = (req, res) => {
  res.send('Not implemented')
}
