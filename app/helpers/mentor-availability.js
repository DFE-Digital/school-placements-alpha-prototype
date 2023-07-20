exports.getMentorAvailabilityOptions = (selectedItem) => {
  const items = []
  const mentorAvailability = require('../data/mentor-availability')

  mentorAvailability.forEach((availability, i) => {
    const item = {}

    item.text = availability.name
    item.value = availability.code
    item.id = availability.id
    item.checked = (selectedItem && selectedItem.includes(availability.code)) ? 'checked' : ''

    items.push(item)
  })

  return items
}

exports.getMentorAvailabilityLabel = (code) => {
  const mentorAvailability = require('../data/mentor-availability')
  const availability = mentorAvailability.find(availability => availability.code === code)

  let label = code

  if (availability) {
    label = availability.name
  }

  return label
}
