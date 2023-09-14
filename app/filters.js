const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

const { DateTime } = require('luxon')
const marked = require('marked')
const { gfmHeadingId } = require('marked-gfm-heading-id')
const numeral = require('numeral')

const ageRangeHelper = require('./helpers/age-ranges')
const keyStageHelper = require('./helpers/key-stages')
const mentorHelper = require('./helpers/mentors')
const organisationHelper = require('./helpers/organisations')
const subjectHelper = require('./helpers/subjects')
const qualificationHelper = require('./helpers/qualifications')

/* ------------------------------------------------------------------
  numeral filter for use in Nunjucks
  example: {{ params.number | numeral("0,00.0") }}
  outputs: 1,000.00
------------------------------------------------------------------ */
addFilter('numeral', (number, format) => {
  return numeral(number).format(format)
})

/* ------------------------------------------------------------------
  numeral filter for use in Nunjucks
  example: {{ params.number | numeral("0,00.0") }}
  outputs: 1,000.00
------------------------------------------------------------------ */
addFilter('datetime', (timestamp, format) => {
  let datetime = DateTime.fromJSDate(timestamp, {
    locale: 'en-GB'
  }).toFormat(format)

  if (datetime === 'Invalid DateTime') {
    datetime = DateTime.fromISO(timestamp, {
      locale: 'en-GB'
    }).toFormat(format)
  }

  return datetime
})

/* ------------------------------------------------------------------
utility function to turn and array into a list
example: {{ ['primary','secondary'] | arrayToList }}
outputs: "primary and secondary"
------------------------------------------------------------------ */
addFilter('arrayToList', (array, join = ', ', final = ' and ') => {
  const arr = array.slice(0)

  const last = arr.pop()

  if (array.length > 1) {
    return arr.join(join) + final + last
  }

  return last
})

/* ------------------------------------------------------------------
utility function to parse markdown as HTML
example: {{ "## Title" | markdownToHtml }}
outputs: "<h2>Title</h2>"
------------------------------------------------------------------ */
addFilter('markdownToHtml', (markdown) => {
  if (!markdown) {
    return null
  }

  marked.use(gfmHeadingId())

  const text = markdown.replace(/\\r/g, '\n').replace(/\\t/g, ' ')
  const html = marked.parse(text)

  // Add govuk-* classes
  let govukHtml = html.replace(/<p>/g, '<p class="govuk-body">')
  govukHtml = govukHtml.replace(/<ol>/g, '<ol class="govuk-list govuk-list--number">')
  govukHtml = govukHtml.replace(/<ul>/g, '<ul class="govuk-list govuk-list--bullet">')
  govukHtml = govukHtml.replace(/<h2/g, '<h2 class="govuk-heading-l"')
  govukHtml = govukHtml.replace(/<h3/g, '<h3 class="govuk-heading-m"')
  govukHtml = govukHtml.replace(/<h4/g, '<h4 class="govuk-heading-s"')

  return govukHtml
})

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
utility function to get the subject list
example: {{ [F3,G1] | getSubjectList }}
outputs: "physics and mathematics"
------------------------------------------------------------------ */
addFilter('getSubjectList', (subjectCodes, join = ', ', final = ' and ') => {
  let list = subjectCodes

  if (subjectCodes) {
    list = subjectHelper.getSubjectList(subjectCodes, join, final)
  }

  return list
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

/* ------------------------------------------------------------------
utility function to get the key stage label
example: {{ 'KS1' | getKeyStageLabel }}
outputs: "Key Stage 1"
------------------------------------------------------------------ */
addFilter('getKeyStageLabel', (keyStage) => {
  let label = keyStage

  if (keyStage) {
    label = keyStageHelper.getKeyStageLabel(keyStage)
  }

  return label
})

/* ------------------------------------------------------------------
utility function to get the mentor label
example: {{ '79a2c9fa-c197-44b4-979f-1f5f75bd8f36' | getMentorLabel }}
outputs: "Aaron Black"
------------------------------------------------------------------ */
addFilter('getMentorLabel', (mentor) => {
  let label = mentor

  if (mentor) {
    label = mentorHelper.getMentorLabel(mentor)
  }

  return label
})

/* ------------------------------------------------------------------
utility function to get the mentor status label
example: {{ "pending" | getMentorStatusLabel }}
outputs: "Pending"
------------------------------------------------------------------ */
addFilter('getMentorStatusLabel', (status) => {
  let label = status

  if (status !== undefined) {
    label = mentorHelper.getMentorStatusLabel(status)
  }

  return label
})

/* ------------------------------------------------------------------
utility function to get the mentor status colour
example: {{ "pending" | getMentorStatusColour }}
outputs: "govuk-tag--grey"
------------------------------------------------------------------ */
addFilter('getMentorStatusClasses', (status) => {
  let label

  if (status !== undefined) {
    label = mentorHelper.getMentorStatusClasses(status)
  }

  return label
})

/* ------------------------------------------------------------------
utility function to get the organisation name
example: {{ "6fa28993-4d7c-437e-b522-96168de9939b" | getOrganisationName }}
outputs: "Ellis Guilford School"
------------------------------------------------------------------ */
addFilter('getOrganisationName', (organisationId) => {
  let label = organisationId

  if (organisationId !== undefined) {
    label = organisationHelper.getOrganisationName(organisationId)
  }

  return label
})

/* ------------------------------------------------------------------
utility function to get the qualification label
example: {{ "pgce" | getQualificationLabel }}
outputs: "Postgraduate Certificate in Education"
------------------------------------------------------------------ */
addFilter('getQualificationLabel', (code) => {
  let label = code

  if (code !== undefined) {
    label = qualificationHelper.getQualificationLabel(code)
  }

  return label
})

/* ------------------------------------------------------------------
utility function to get the guidance section label
example: {{ "account" | getGuidanceSectionLabel }}
outputs: "Your account"
------------------------------------------------------------------ */
addFilter('getGuidanceSectionLabel', (section) => {
  let label = ''

  if (section === 'XXX') {
    label = 'XXX'
  } else if (section === 'YYY') {
    label = 'YYY'
  }

  return label
})
