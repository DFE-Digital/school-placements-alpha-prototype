const placementModel = require('../models/placements')

const ageRangeHelper = require('../helpers/age-ranges')
const subjectHelper = require('../helpers/subjects')
const trainingPatternHelper = require('../helpers/training-patterns')

exports.list_placements_get = (req, res) => {
  // clean out placement data
  delete req.session.data.placement

  const placements = placementModel.findMany({})

  res.render('../views/placements/list', {
    placements,
    actions: {
      new: `/placements/new/subject-level`,
      view: `/placements/`
    }
  })
}

exports.show_placement_get = (req, res) => {
  const placement = placementModel.findOne({ placementId: req.params.placementId })

  res.render('../views/placements/show', {
    placement,
    actions: {
      back: `/placements`,
      change: `/placements/${req.params.placementId}`
    }
  })
}

exports.delete_placement_get = (req, res) => {
  res.send('Not implemented')
}

exports.delete_placement_post = (req, res) => {
  res.send('Not implemented')
}

// NEW PLACEMENT

exports.new_placement_subject_level_get = (req, res) => {
  let selectedSubjectLevel
  if (req.session.data.placement?.subjectLevel) {
    selectedSubjectLevel = req.session.data.placement.subjectLevel
  }

  const subjectLevelOptions = subjectHelper.getSubjectLevelOptions(selectedSubjectLevel)

  let save = `/placements/new/subject-level`
  let back = `/placements`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/subject-level', {
    subjectLevelOptions,
    actions: {
      save,
      back,
      cancel: `/placements`
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

  let save = `/placements/new/subject-level`
  let back = `/placements`
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
        cancel: `/placements`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/placements/new/check-your-answers`)
    } else {
      res.redirect(`/placements/new/subject`)
    }
  }
}

exports.new_placement_subject_get = (req, res) => {
  let selectedSubject
  if (req.session.data.placement?.subjects) {
    selectedSubject = req.session.data.placement.subjects
  }

  const subjectOptions = subjectHelper.getSubjectOptions(
    req.session.data.placement.subjectLevel,
    selectedSubject
  )

  let save = `/placements/new/subject`
  let back = `/placements/new/subject-level`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/subject', {
    subjectOptions,
    actions: {
      save,
      back,
      cancel: `/placements`
    }
  })
}

exports.new_placement_subject_post = (req, res) => {
  const errors = []

  let selectedSubject
  if (req.session.data.placement?.subjects) {
    selectedSubject = req.session.data.placement.subjects
  }

  const subjectOptions = subjectHelper.getSubjectOptions(
    req.session.data.placement.subjectLevel,
    selectedSubject
  )

  let save = `/placements/new/subject`
  let back = `/placements/new/subject-level`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  if (!req.session.data.placement.subjects.length) {
    const error = {}
    error.fieldName = 'subjects'
    error.href = '#subjects'
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
        cancel: `/placements`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/placements/new/check-your-answers`)
    } else {
      res.redirect(`/placements/new/age-range`)
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

  let save = `/placements/new/age-range`
  let back = `/placements/new/subject`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/age-range', {
    ageRangeOptions,
    actions: {
      save,
      back,
      cancel: `/placements`
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

  let save = `/placements/new/age-range`
  let back = `/placements/new/subject`
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
        cancel: `/placements`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/placements/new/check-your-answers`)
    } else {
      res.redirect(`/placements/new/class-size`)
    }
  }
}

exports.new_placement_class_size_get = (req, res) => {
  let save = `/placements/new/class-size`
  let back = `/placements/new/age-range`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/class-size', {
    placement: req.session.data.placement,
    actions: {
      save,
      back,
      cancel: `/placements`
    }
  })
}

exports.new_placement_class_size_post = (req, res) => {
  const errors = []

  let save = `/placements/new/class-size`
  let back = `/placements/new/age-range`
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
        cancel: `/placements`
      },
      errors
    })
  } else {
    if (req.query.referrer === 'check') {
      res.redirect(`/placements/new/check-your-answers`)
    } else {
      res.redirect(`/placements/new/training-pattern`)
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

  let save = `/placements/new/training-pattern`
  let back = `/placements/new/class-size`
  if (req.query.referrer === 'check') {
    save += '?referrer=check'
    back += '/placements/new/check-your-answers'
  }

  res.render('../views/placements/training-pattern', {
    trainingPatternOptions,
    actions: {
      save,
      back,
      cancel: `/placements`
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

  let save = `/placements/new/training-pattern`
  let back = `/placements/new/class-size`
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
        cancel: `/placements`
      },
      errors
    })
  } else {
    res.redirect(`/placements/new/check-your-answers`)
  }

}

exports.new_placement_check_get = (req, res) => {
  res.render('../views/placements/check-your-answers', {
    placement: req.session.data.placement,
    actions: {
      save: `/placements/new/check-your-answers`,
      back: `/placements/new/training-pattern`,
      cancel: `/placements`,
      change: `/placements/new`
    }
  })
}

exports.new_placement_check_post = (req, res) => {
  placementModel.insertOne({
    placement: req.session.data.placement
  })

  req.flash('success', 'Placement added')

  res.redirect(`/placements`)
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
