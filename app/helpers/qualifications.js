exports.getQualificationLabel = (code) => {
  const qualifications = require('../data/qualifications')
  const qualification = qualifications.find(qualification => qualification.code === code)

  let label = code

  if (qualification) {
    label = qualification.name
  }

  return label
}
