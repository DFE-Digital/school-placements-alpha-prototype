exports.getMentorOptions = (school, subject, selectedItem) => {
  const items = []
  const mentors = require('../data/temp/mentors-sprint2')

  mentors
    .filter(mentor =>
      mentor.school.id === school
      && mentor.subject === subject
    )
    .forEach((mentor, i) => {
      const item = {}

      item.text = `${mentor.firstName} ${mentor.lastName}`
      item.value = mentor.id
      item.id = mentor.id
      item.checked = (selectedItem && selectedItem.includes(mentor.id)) ? 'checked' : ''

      items.push(item)
    })

  return items
}

exports.getMentorLabel = (code) => {
  const mentors = require('../data/temp/mentors-sprint2')
  const mentor = mentors.find(mentor => mentor.id === code)

  let label = code

  if (mentor) {
    label = `${mentor.firstName} ${mentor.lastName}`
  }

  return label
}

exports.getMentorStatusLabel = (code) => {
  const mentorStatuses = require('../data/mentor-statuses')
  const mentorStatus = mentorStatuses.find(mentorStatus => mentorStatus.code === code)
  let label = code

  if (mentorStatus) {
    label = mentorStatus.name
  }

  return label
}

exports.getMentorStatusClasses = (code) => {
  const mentorStatuses = require('../data/mentor-statuses')
  const mentorStatus = mentorStatuses.find(mentorStatus => mentorStatus.code === code)

  let classes
  if (mentorStatus) {
    classes = mentorStatus.classes
  }

  return classes
}
