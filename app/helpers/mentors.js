exports.getMentorOptions = (school, subject, selectedItem) => {
  const items = []
  const mentors = require('../data/temp/mentors')

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
  const mentors = require('../data/temp/mentors')
  const mentor = mentors.find(mentor => mentor.id === code)

  let label = code

  if (mentor) {
    label = `${mentor.firstName} ${mentor.lastName}`
  }

  return label
}
