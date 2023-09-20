const subjectHelper = require('../helpers/subjects')

exports.data_report_get = (req, res) => {
  delete req.session.data.datareport
  res.render('data-report/index')
}

exports.reason_not_participate_get = (req, res) => {
  res.render('data-report/reason-not-participate')
}

exports.challenges_managing_itt_get = (req, res) => {
  res.render('data-report/challenges-managing-itt')
}

exports.enough_mentors_get = (req, res) => {
  res.render('data-report/enough-mentors')
}

exports.secondary_subjects_difficulty_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('secondary')
  res.render('data-report/secondary-subjects-difficulty', {
    subjectOptions
  })
}

exports.primary_subjects_difficulty_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('primary')
  res.render('data-report/primary-subjects-difficulty', {
    subjectOptions
  })
}

exports.surplus_get = (req, res) => {
  res.render('data-report/surplus')
}

exports.surplus_question_get = (req, res) => {
  res.render('data-report/surplus-question')
}

exports.surplus_subject_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('secondary')
  res.render('data-report/surplus-subject', {
    subjectOptions
})
}

exports.shortage_get = (req, res) => {
  res.render('data-report/shortage')
}

exports.shortage_question_get = (req, res) => {
  res.render('data-report/shortage-question')
}

exports.shortage_subject_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('secondary')
  res.render('data-report/shortage-subject', {
    subjectOptions
  })
}

exports.confirmation_get = (req, res) => {
  delete req.session.data.datareport
  res.render('data-report/confirmation')
}
