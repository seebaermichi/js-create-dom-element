# Vanilla DOM Helper
This is a small library which allows to create DOM-Element without any effort.

[![Build Status](https://travis-ci.org/seebaermichi/html-importer.svg?branch=master)](https://travis-ci.org/seebaermichi/html-importer)

## Installation
```powershell
npm install --save-dev vanilla-dom-helper
```

## Usage
```javascript
const vanillaDomHelper = require('vanilla-dom-helper')
```
### Examples of creating a new DOM-Element
#### empty div
```javascript
const emptyDiv = vanillaDomHelper.createElement('div')
```
_creates_
```html
<div></div>
```
#### headline with content
```javascript
const headline = vanillaDomHelper.createElement('h1', 'Hello World!')
```
_creates_
```html
<h1>Hello World!</h1>
```
#### paragraph with content and attributes
```javascript
const paragraph = vanillaDomHelper.createElement('p', 'Lorem ipsum dolor sit amet, co...', {'class': 'special-text', 'data-js-element': 'simple-paragraph'})
```
_creates_
```html
<p class="special-text" data-js-element="simple-paragraph">Lorem ipsum dolor sit amet, co...</p>
```
#### section with children
```javascript
const section = vanillaDomHelper.createElement('section', [headline, paragraph])
```
_creates_
```html
<section>
  <h1>Hello World!</h1>
  <p class="special-text" data-js-element="simple-paragraph">Lorem ipsum dolor sit amet, co...</p>
</section>
```
#### button with text and attributes
```javascript
const button = vanillaDomHelper.createElement('button', 'click me', 'disabled required')
```
_creates_
```html
<button disabled required>click me</button>
```
```javascript
const uList = vanillaDomHelper.createElement('ul', ['item 1', 'item 2', 'item 3'])
```
_creates_
```html
<ul>
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
</ul>
```
### Examples of adding content to an existing DOM-Element
```javascript
let paragraph = document.querySelector('p')
paragraph = vanillaDomHelper.setElementsContent(paragraph, 'Lorem ipsum dolor sit amet, co...')
```
_creates_
```html
<p>Lorem ipsum dolor sit amet, co...</p>
```
```javascript
let div = document.querySelector('div')
div = vanillaDomHelper.setElementsContent(div, paragraph)
```
_creates_
```html
<div>
  <p>Lorem ipsum dolor sit amet, co...</p>
</div>
```
### Examples of adding attributes to an existing DOM-Element
```javascript
let button = document.querySelector('button')
button = vanillaDomHelper.setElementsAttributes(button, 'disabled')
```
_creates_
```html
<button disabled>button-text</button>
```
```javascript
let checkbox = document.querySelector('input[type="checkbox"]')
checkbox = vanillaDomHelper.setElementsAttributes(checkbox, 'required checked')
```
_creates_
```html
<input type="checkbox" required checked>
```
```javascript
let radio = document.querySelector('input[type="radio"]')
radio = vanillaDomHelper.setElementsAttributes(checkbox, ['required', 'checked'])
```
_creates_
```html
<input type="radio" required checked>
```
```javascript
let link = document.querySelector('a')
link = vanillaDomHelper.setElementsAttributes(link, {'class': 'special-link', 'title': 'click here to go there'})
```
_creates_
```html
<a href="#" class="special-link" title="click here to go there">Link</a>
```

## Tests
```powershell
npm test
```

## License
Vanilla-dom-helper is released under the MIT License. See [LICENSE][1] file for details.

[1]: https://github.com/seebaermichi/vanilla-dom-helper/blob/master/LICENSE
