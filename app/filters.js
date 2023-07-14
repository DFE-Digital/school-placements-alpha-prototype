const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

const ageRangeHelper = require('./helpers/age-ranges')
const subjectHelper = require('./helpers/subjects')

/* ------------------------------------------------------------------
utility function to get an error for a component
example: {{ errors | getErrorMessage('title') }}
outputs: "Enter a title"
------------------------------------------------------------------ */
addFilter('getErrorMessage', (array, fieldName) => {
  if (!array || !fieldName) {
    return null
  }

  const error = array.filter((obj) =>
    obj.fieldName === fieldName
  )[0]

  return error
})


/* ------------------------------------------------------------------
utility function to get the subject level label
example: {{ 'further_education' | getSubjectLevelLabel }}
outputs: "Further education"
------------------------------------------------------------------ */
addFilter('getSubjectLevelLabel', (subjectLevel) => {
  let label = subjectLevel

  if (subjectLevel) {
    label = subjectHelper.getSubjectLevelLabel(subjectLevel)
  }

  return label
})

/* ------------------------------------------------------------------
utility function to get the subject label
example: {{ 'W1' | getSubjectLabel }}
outputs: "Art and design"
------------------------------------------------------------------ */
addFilter('getSubjectLabel', (subject) => {
  let label = subject

  if (subject) {
    label = subjectHelper.getSubjectLabel(subject)
  }

  return label
})

/* ------------------------------------------------------------------
utility function to get the age range label
example: {{ '5_to_11' | getAgeRangeLabel }}
outputs: "5 to 11"
------------------------------------------------------------------ */
addFilter('getAgeRangeLabel', (ageRange) => {
  let label = ageRange

  if (ageRange) {
    label = ageRangeHelper.getAgeRangeLabel(ageRange)
  }

  return label
})
