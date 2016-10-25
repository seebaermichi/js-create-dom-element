'use strict'

const element = {
  'class': 'css-class',
  'id': 'element-id'
}

element.setAttribute = function(attributeName, attributeValue) {
  console.error(this)
  this[attributeName] = attributeValue
}

element.setAttribute('data', 'data-value')
console.error(typeof element.setAttribute)
