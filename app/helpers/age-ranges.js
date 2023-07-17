exports.getAgeRangeOptions = (subjectLevel = 'secondary', selectedItem) => {
  const items = []

  let ageRanges = require('../data/age-ranges')
  if (subjectLevel) {
    ageRanges = ageRanges.filter(range => range.level === subjectLevel)
  }

  ageRanges.forEach((ageRange, i) => {
    const item = {}

    item.text = ageRange.name
    item.value = ageRange.code
    item.id = ageRange.id
    item.checked = (selectedItem && selectedItem.includes(ageRange.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  // const divider = { divider: 'or' }
  // items.push(divider)

  // const other = {}
  // other.text = 'Another age range'
  // other.value = 'other'
  // other.id = 'age-range-other'
  // other.checked = (selectedItem && selectedItem.includes('other')) ? 'checked' : ''
  // other.conditional = true
  // items.push(other)

  return items
}

exports.getAgeRangeLabel = (code) => {
  const ageRanges = require('../data/age-ranges')
  const ageRange = ageRanges.find(ageRange => ageRange.code === code)

  let label = code

  if (ageRange) {
    label = ageRange.name
  } else if (code === '3_to_11') {
    label = '3 to 11'
  } else if (code === 'other') {
    label = 'Another age range'
  }

  return label
}
