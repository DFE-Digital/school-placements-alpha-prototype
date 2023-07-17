exports.arrayToList = (array, join = ', ', final = ' and ') => {
  const arr = array.slice(0)

  const last = arr.pop()

  if (array.length > 1) {
    return arr.join(join) + final + last
  }

  return last
}

exports.slugify = (text) => {
  return text.trim()
    .toLowerCase()
    // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[^\w\s-]/g, '')
    // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/[\s_-]+/g, '-')
    // remove leading, trailing -
    .replace(/^-+|-+$/g, '')
}

exports.arrayToDateObject = (array) => {
  return new Date(array[2], array[1] - 1, array[0])
}

exports.getCheckboxValues = (name, data) => {
  return name && (Array.isArray(name)
    ? name
    : [name].filter((name) => {
        return name !== '_unchecked'
      })) || data && (Array.isArray(data) ? data : [data])
}

exports.removeFilter = (value, data) => {
  // do this check because if coming from overview page for example,
  // the query/param will be a string value, not an array containing a string
  if (Array.isArray(data)) {
    return data.filter(item => item !== value)
  } else {
    return null
  }
}

exports.getFilterALabel = (code) => {
  let label = code

  return label
}

exports.getFilterBLabel = (code) => {
  let label = code

  return label
}

exports.getFilterCLabel = (code) => {
  let label = code

  return label
}

exports.getFilterAItems = (selectedItems) => {
  const options = [
    {
      id: 'c131acc0-b5df-43af-8102-fc45d8656fab',
      text: 'Option 1',
      value: 'option-1'
    },
    {
      id: '9bb46bdd-ffe7-4a8b-a864-e42290c4da04',
      text: 'Option 2',
      value: 'option-2'
    },
    {
      id: '6495c07d-2050-4a32-9bdc-2ed1804b215a',
      text: 'Option 3',
      value: 'option-3'
    },
    {
      id: '7b49d05c-c5a9-475c-a673-1881afac6600',
      text: 'Option 4',
      value: 'option-4'
    },
    {
      id: '5b095274-1e76-4ab3-8c4b-336e57899fc8',
      text: 'Option 5',
      value: 'option-5'
    }
  ]

  const items = []

  options.forEach((option, i) => {
    const item = {}

    item.text = option.text
    item.value = option.value
    item.id = option.id
    item.checked = (selectedItems && selectedItems.includes(option.value)) ? 'checked' : ''

    items.push(item)
  })

  return items
}

exports.getFilterBItems = (selectedItems) => {
  const options = [
    {
      id: '0ec5b356-55b6-4f49-bc14-c978ebbe3790',
      text: 'Option 1',
      value: 'option-1'
    },
    {
      id: '17afadc9-97b2-46fc-9737-e24063da2d1f',
      text: 'Option 2',
      value: 'option-2'
    },
    {
      id: '6a1c523a-1bdd-49a2-a691-b152cf838303',
      text: 'Option 3',
      value: 'option-3'
    },
    {
      id: 'a3c342b8-09be-4119-8756-a36f899534c2',
      text: 'Option 4',
      value: 'option-4'
    },
    {
      id: 'e2dddd31-e41a-4c50-87f1-f90a0e5fb53d',
      text: 'Option 5',
      value: 'option-5'
    }
  ]

  const items = []

  options.forEach((option, i) => {
    const item = {}

    item.text = option.text
    item.value = option.value
    item.id = option.id
    item.checked = (selectedItems && selectedItems.includes(option.value)) ? 'checked' : ''

    items.push(item)
  })

  return items
}

exports.getFilterCItems = (selectedItems) => {
  const options = [
    {
      id: '32e3fa4d-0488-4577-b981-5d2eaf936d14',
      text: 'Option 1',
      value: 'option-1'
    },
    {
      id: 'e23d8005-d94a-4bb9-9752-b83c63b24c27',
      text: 'Option 2',
      value: 'option-2'
    },
    {
      id: '63830a1b-5890-4bbd-b4e0-54d2ee763ce6',
      text: 'Option 3',
      value: 'option-3'
    },
    {
      id: '6a81936a-1d3a-4dbd-8f2e-a1c2f6af1993',
      text: 'Option 4',
      value: 'option-4'
    },
    {
      id: '698562fb-fe75-42df-9e6d-8f723078caef',
      text: 'Option 5',
      value: 'option-5'
    }
  ]

  const items = []

  options.forEach((option, i) => {
    const item = {}

    item.text = option.text
    item.value = option.value
    item.id = option.id
    item.checked = (selectedItems && selectedItems.includes(option.value)) ? 'checked' : ''

    items.push(item)
  })

  return items
}
