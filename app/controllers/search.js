
const subjectHelper = require('../helpers/subjects')

exports.search_get = (req, res) => {
  delete req.session.data.filter
  delete req.session.data.location
  delete req.session.data.provider
  delete req.session.data.q
  delete req.session.data.sortBy

  res.render('search/index')
}

exports.search_post = (req, res) => {
  // Search query
  const q = req.session.data.q || req.query.q

  const errors = []

  if (req.session.data.q === undefined) {
    const error = {}
    error.fieldName = "q"
    error.href = "#q"
    error.text = "Select find placements by location or by training provider"
    errors.push(error)
  } else {
    if (req.session.data.q === 'location' && !req.session.data.location.length) {
      const error = {}
      error.fieldName = "location"
      error.href = "#location"
      error.text = "Enter a city, town or postcode"
      errors.push(error)
    }

    if (req.session.data.q === 'provider' && !req.session.data.provider.length) {
      const error = {}
      error.fieldName = "provider"
      error.href = "#provider"
      error.text = "Enter a provider name or code"
      errors.push(error)
    }
  }

  if (errors.length) {
    res.render('search/index', {
      errors
    })
  } else {
    res.redirect('/age-groups')
  }
}

exports.age_groups_get = (req, res) => {
  res.render('search/age-groups')
}

exports.age_groups_post = (req, res) => {
  const ageGroup = req.session.data.ageGroup

  const errors = []

  if (!req.session.data.ageGroup?.length) {
    const error = {}
    error.fieldName = "age-groups"
    error.href = "#age-groups"
    error.text = "Select an age group"
    errors.push(error)
  }

  if (errors.length) {
    res.render('search/age-groups', {
      errors
    })
  } else {
    if (ageGroup === 'primary') {
      res.redirect('/primary-subjects')
    } else if (ageGroup === 'secondary') {
      res.redirect('/secondary-subjects')
    } else {
      res.redirect('/results')
    }
  }
}

exports.primary_subjects_get = (req, res) => {
  let selectedSubject
  if (req.session.data.filter?.subject) {
    selectedSubject = req.session.data.filter.subject
  }

  const subjectOptions = subjectHelper.getSubjectOptions(req.session.data.ageGroup, selectedSubject)

  res.render('search/primary-subjects', {
    subjectOptions
  })
}

exports.primary_subjects_post = (req, res) => {
  const errors = []

  if (!req.session.data.filter.subject?.length) {
    const error = {}
    error.fieldName = "subject"
    error.href = "#subject"
    error.text = "Select a least one primary subject"
    errors.push(error)
  }

  if (errors.length) {
    let selectedSubject
    if (req.session.data.filter?.subject) {
      selectedSubject = req.session.data.filter.subject
    }

    const subjectOptions = subjectHelper.getSubjectOptions(req.session.data.ageGroup, selectedSubject)

    res.render('search/primary-subjects', {
      subjectOptions,
      errors
    })
  } else {
    res.redirect('/results')
  }
}

exports.secondary_subjects_get = (req, res) => {
  let selectedSubject
  if (req.session.data.filter?.subject) {
    selectedSubject = req.session.data.filter.subject
  }

  const subjectOptions = subjectHelper.getSubjectOptions(req.session.data.ageGroup, selectedSubject)

  res.render('search/secondary-subjects', {
    subjectOptions
  })
}

exports.secondary_subjects_post = (req, res) => {
  const errors = []

  if (!req.session.data.filter.subject?.length) {
    const error = {}
    error.fieldName = "subject"
    error.href = "#subject"
    error.text = "Select at least one secondary subject"
    errors.push(error)
  }

  if (errors.length) {
    let selectedSubject
    if (req.session.data.filter?.subject) {
      selectedSubject = req.session.data.filter.subject
    }

    const subjectOptions = subjectHelper.getSubjectOptions(req.session.data.ageGroup, selectedSubject)

    res.render('search/secondary-subjects', {
      subjectOptions,
      errors
    })
  } else {
    res.redirect('/results')
  }
}

exports.location_suggestions_json = (req, res) => {
  req.headers['Access-Control-Allow-Origin'] = true

}

exports.provider_suggestions_json = (req, res) => {
  req.headers['Access-Control-Allow-Origin'] = true

}
