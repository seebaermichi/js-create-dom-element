'use strict'

import test from 'ava'
const vanillaDomHelper = require('../index')

test.beforeEach(t => {
  t.context = {
    expectedElement: {
      nodeType: 1,
      setAttribute: setAttribute,
      appendChild: appendChild
    },
    element: {
      nodeType: 1,
      setAttribute: setAttribute,
      appendChild: appendChild
    }
  }
})

test(`isElementNode() should check if element's attribute "nodeType" is 1`, t => {
  t.true(vanillaDomHelper.isElementNode(t.context.expectedElement))
  t.false(vanillaDomHelper.isElementNode({}))
})

test(`setElementsAttributes() should add attributes out of an object to element`, t => {
  const attributes = {
    'class': 'css-class',
    'id': 'element-id'
  }
  
  t.context.element = vanillaDomHelper.setElementsAttributes(t.context.element, attributes)
  
  t.is(t.context.element.class, 'css-class')
  t.is(t.context.element.id, 'element-id')
})

test(`setElementsAttributes() should add attributes out of an array to element`, t => {
  const attributes = ['checked', 'required']
  
  t.context.element = vanillaDomHelper.setElementsAttributes(t.context.element, attributes)
  
  t.is(t.context.element.checked, 'checked')
  t.is(t.context.element.required, 'required')
})

test(`setElementsAttributes() should add one attribute out of a attribute-string to element`, t => {
  const attributes = 'selected'

  t.context.element = vanillaDomHelper.setElementsAttributes(t.context.element, attributes)
  
  t.is(t.context.element.selected, 'selected')
})

test(`setElementsAttributes() should add attributes out of a string of space-separated attributes to element`, t => {
  const attributes = 'selected disabled'

  t.context.element = vanillaDomHelper.setElementsAttributes(t.context.element, attributes)
  
  t.is(t.context.element.selected, 'selected')
  t.is(t.context.element.disabled, 'disabled')
})

test(`setElementsAttributes() should throw error if attributes type is not array, object or string`, t => {
  const attributes = 6

  t.throws(() => {
    vanillaDomHelper.setElementsAttributes(t.context.element, attributes)
  })
})

test(`setElementsAttributes() should throw error if elements nodeType is not 1`, t => {
  t.context.element.nodeType = 0

  t.throws(() => {
    vanillaDomHelper.setElementsAttributes(t.context.element, {})
  })
})

test(`setElementsContent() should append content out of object as a child`, t => {
  const child = {
    nodeType: 1
  }
  
  t.context.element = vanillaDomHelper.setElementsContent(t.context.element, child)
  
  t.context.expectedElement.childNodes = {}
  t.context.expectedElement.childNodes[0] = {
    nodeType: 1
  }
  
  t.deepEqual(t.context.element.childNodes[0], t.context.expectedElement.childNodes[0])
})

test(`setElementsContent() should append content out of string as a child`, t => {
  const child = 'some content'
  
  t.context.element = vanillaDomHelper.setElementsContent(t.context.element, child)
  
  t.is(t.context.element.innerHTML, 'some content')
})

test(`setElementsContent() should throw error if elements nodeType is not 1`, t => {
  t.context.element.nodeType = 0

  t.throws(() => {
    vanillaDomHelper.setElementsContent(t.context.element, '')
  })
})

test(`createElement() should create element out of tag`, t => {
  const tag = 'div'
  
  t.context.element = vanillaDomHelper.createElement(tag, false, false, t.context.element)
  
  t.is(t.context.element.tagName, 'DIV')
})

test(`createElement() should create element out of tag and content`, t => {
  const tag = 'p'
  const content = 'Hello World!'
  
  t.context.element = vanillaDomHelper.createElement(tag, content, false, t.context.expectedElement)
  
  t.is(t.context.element.tagName, 'P')
  t.is(t.context.element.innerHTML, 'Hello World!')
})

test(`createElement() should create element out of tag and content`, t => {
  const tag = 'button'
  const content = 'Click me!'
  const attributes = {
    'data-name': 'data-value',
    'type': 'submit'
  }
  t.context.element = vanillaDomHelper.createElement(tag, content, attributes, t.context.expectedElement)
  
  t.is(t.context.element.tagName, 'BUTTON')
  t.is(t.context.element.innerHTML, 'Click me!')
  t.is(t.context.element['data-name'], 'data-value')
  t.is(t.context.element.type, 'submit')
})

test(`createElement() should throw error if tag's type is not string`, t => {
  t.throws(() => {
    vanillaDomHelper.createElement({tag: 'ul'})
  })
})


function setAttribute(attributeName, attributeValue) {
  this[attributeName] = attributeValue
}

function appendChild(child) {
  if (this.childNodes) {
    const length = Object.keys(this.childNodes).length
    this.childNodes[length + 1] = child
  } else {
    this.childNodes = {}
    this.childNodes[0] = child
  }
}
