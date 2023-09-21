const subjectHelper = require('../helpers/subjects')

exports.data_report_get = (req, res) => {
  delete req.session.data.datareport
  res.render('data-report/index')
}

/// ------------------------------------------------------------------------ ///
/// Shortages
/// ------------------------------------------------------------------------ ///

exports.shortage_question_get = (req, res) => {
  res.render('data-report/shortage-question')
}

exports.shortage_subject_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('secondary')
  res.render('data-report/shortage-subject', {
    subjectOptions
  })
}

exports.shortage_get = (req, res) => {
  res.render('data-report/shortage')
}

/// ------------------------------------------------------------------------ ///
/// Surpluses
/// ------------------------------------------------------------------------ ///

exports.surplus_question_get = (req, res) => {
  res.render('data-report/surplus-question')
}

exports.surplus_subject_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('secondary')
  res.render('data-report/surplus-subject', {
    subjectOptions
  })
}
exports.surplus_get = (req, res) => {
  res.render('data-report/surplus')
}

/// ------------------------------------------------------------------------ ///
/// Difficulties
/// ------------------------------------------------------------------------ ///

exports.primary_subjects_difficulty_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('primary')

  subjectOptions.push({ divider: 'or' })

  const noneOption = {
    text: 'None',
    value: 'none',
    id: '4c08240e-15cc-4945-8c57-8b06b80f643e',
    behaviour: 'exclusive'
  }

  subjectOptions.push(noneOption)

  res.render('data-report/primary-subjects-difficulty', {
    subjectOptions
  })
}

exports.secondary_subjects_difficulty_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('secondary')

  subjectOptions.push({ divider: 'or' })

  const noneOption = {
    text: 'None',
    value: 'none',
    id: '76b4ae72-e0e8-4c24-8d1a-623bddffa9ec',
    behaviour: 'exclusive'
  }

  subjectOptions.push(noneOption)

  res.render('data-report/secondary-subjects-difficulty', {
    subjectOptions
  })
}

/// ------------------------------------------------------------------------ ///
/// Barriers and challenges
/// ------------------------------------------------------------------------ ///

exports.challenges_managing_itt_get = (req, res) => {
  res.render('data-report/challenges-managing-itt')
}

exports.reason_not_participate_get = (req, res) => {
  res.render('data-report/reason-not-participate')
}

/// ------------------------------------------------------------------------ ///
/// END
/// ------------------------------------------------------------------------ ///

exports.check_your_answers_get = (req, res) => {
  res.render('data-report/check-your-answers')
}

/// ------------------------------------------------------------------------ ///
/// END
/// ------------------------------------------------------------------------ ///

exports.confirmation_get = (req, res) => {
  delete req.session.data.datareport
  res.render('data-report/confirmation')
}


// exports.enough_mentors_get = (req, res) => {
//   res.render('data-report/enough-mentors')
// }
