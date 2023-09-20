const subjectHelper = require('../helpers/subjects')

exports.datareport_get = (req, res) => {
  res.render('data-report/index')
}

exports.reasonnotparticipate_get = (req, res) => {
  res.render('data-report/reasonnotparticipate')
}

exports.challengesmanagingitt_get = (req, res) => {
  res.render('data-report/challengesmanagingitt')
}

exports.enoughmentors_get = (req, res) => {
  res.render('data-report/enoughmentors')
}

exports.secondarysubjectsdifficulty_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('secondary')
  res.render('data-report/secondarysubjectsdifficulty', {
    subjectOptions
  })
}

exports.primarysubjectsdifficulty_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('primary')
  res.render('data-report/primarysubjectsdifficulty', {
    subjectOptions
  })
}

exports.surplus_get = (req, res) => {
  res.render('data-report/surplus')
}

exports.surplusquestion_get = (req, res) => {
  res.render('data-report/surplusquestion')
}

exports.surplussubject_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('secondary')
  res.render('data-report/surplussubject', {
    subjectOptions
})
}

exports.shortage_get = (req, res) => {
  res.render('data-report/shortage')
}

exports.shortagequestion_get = (req, res) => {
  res.render('data-report/shortagequestion')
}

exports.shortagesubject_get = (req, res) => {
  const subjectOptions = subjectHelper.getSubjectOptions('secondary')
  res.render('data-report/shortagesubject', {
    subjectOptions
  })
}

exports.endreport_get = (req, res) => {
  res.render('data-report/endreport')
}

exports.template_get = (req, res) => {
  res.render('data-report/template')
}
