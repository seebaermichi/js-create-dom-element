'use strict'

/**
 * Vanilla DOM Helper
 */
 
module.exports = {
  isElementNode: isElementNode,
  setElementsAttributes: setElementsAttributes,
  setElementsContent: setElementsContent,
  createElement: createElement
}

/**
 * Checks if element is dom-node
 * @param {dom-object} element
 * @return {boolean}
 */
function isElementNode(element) {
  return element.nodeType === 1
}

/**
 * Sets given attributes of given element
 * @param {dom-object} element
 * @param {object, sting} attributes
 * @return {dom-object}
 */
function setElementsAttributes(element, attributes) {
  if (isElementNode(element)) {
    if (Array.isArray(attributes)) {
      attributes.map(attribute => element.setAttribute(attribute, attribute))
    } else if (typeof attributes === 'object') {
      for (let attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute])
      }
    } else if (typeof attributes === 'string') {
      setElementsAttributes(element, attributes.split(' '))
    } else {
      throw new Error(`VanillaDOMHelper.setElementsAttributes() needs attributes of type 'object', 'array' or 'string' as second param! Type: ${typeof attributes} was given.`)
    }
  } else {
    throwNodeTypeError(element, 'setElementsAttributes()')
  }
  
  return element
}

/**
 * Sets given content to a given dom-element.
 * @param {dom-object} element
 * @param {array, object, string} content
 * @return {dom-object}
 */
function setElementsContent(element, content) {
  if (isElementNode(element)) {
    if (Array.isArray(content)) {
      content.map(contentItem => {
        if ((element.tagName === 'UL' || element.tagName === 'OL')) {
          contentItem = createElement('li', contentItem)
        }
        element = setElementsContent(element, contentItem)
      })
    } else if (typeof content === 'object' && isElementNode(content)) {
      element.appendChild(content)
    } else if (typeof content === 'string') {
      element.innerHTML = content
    }
  } else {
    throwNodeTypeError(element, 'setElementsContent()')
  }
  
  return element
}

/**
 * Creates dom-element out of tag, content and attributes
 * @param {string} tag
 * @param {object, array, string} content
 * @param {object, array, string} attributes
 */
function createElement(tag, content, attributes) {
  let element
  
  if (tag && typeof tag === 'string') {
    try {
      element = document.createElement(tag)
    } catch(error) {
      element = arguments[3]
      element.tagName = tag.toUpperCase()
    }
  } else {
    throw new Error(`VanillaDOMHelper.createElement() needs tag of type 'string'! Type: ${typeof tag} was given.`)
  }
  
  if (attributes) {
    element = setElementsAttributes(element, attributes)
  }
  
  if (content) {
    element = setElementsContent(element, content)
  }
  
  return element
}

function throwNodeTypeError(element, func) {
  throw new Error(`VanillaDOMHelper.${func} needs element of Node.nodetype = 1 as first param! Nodetype: ${element.nodeType} was given.`)
}
