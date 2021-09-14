// function:  _id
// arguments: id: string; the id of the DOM element you want to select
// return:    void
// use:       simplifies document.getElementById
const _id = id => document.getElementById(id)

// function:  _ch
// arguments: parent: HTMLElement; the element that should receive appended children
//            children: HTMLElement; the children that should be appended to the parent
// return:    void
// use:       simplifies element.appendChild, allowing for multiple appends at once
const _ch = (parent, ...children) => {
  for (let child of children) {
    parent.appendChild(child)
  }
}

// global constant: STATE
// looks for the cards item in localStorage. if it's not found, initializes as an empty array
const STATE = JSON.parse(localStorage.getItem("cards")) || []

// global constant: ERRORS
// initializes as an empty object. receives error messages from the validator function
const ERRORS = {}

// global constans: BUTTON_NEW, BUTTON_ABOUT, FORM_NEW, BUTTON_THEME
// the DOM elements that make up the most important interactive parts of the SPA
const BUTTON_NEW = _id("btn-new")
const BUTTON_ABOUT = _id("btn-about")
const FORM_NEW = _id("form-new")
const BUTTON_THEME = _id("btn-theme")

// function:  createUID
// arguments: numberOfChars: number; the string length of the desired id
// return:    string
// use:       makes a unique HTML-valid string id compared to other objects in the STATE global
const createUID = (numberOfChars) => {
  const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let randomId = validChars[Math.floor(Math.random() * validChars.length-10)]
  for (let i = 1; i < numberOfChars; i++) {
    randomId += validChars[Math.floor(Math.random() * validChars.length)]
  }
  
  if (!STATE.find(object => object.id === randomId)) {
    return randomId
  }

  createUID(numberOfChars)
}

// function:  checkImage
// arguments: url: string; the URL that should be checked
// return:    promise
// use:       checks if the URL provided can be resolved as a valid image
const checkImage = (url) => {
  return new Promise((resolve, reject) => {
      const timeout = 5000
      const img = new Image()
      let timer
      img.onerror = img.onabort = () => {
          clearTimeout(timer)
          reject("error")
      }
      img.onload = () => {
          clearTimeout(timer)
          resolve("success")
      }
      timer = setTimeout(() => {
          img.src = "//!!!!/test.jpg"
          reject("timeout")
      }, timeout)
      img.src = url
  });
}

// function:  validate
// arguments: key: string; the key to be pushed to the errors object if validation fails
//            text: string; the text being validated
// return:    void
// use:       checks the text provided against a sequence of validators, writing errors to the ERROR global
const validate = async (key, text) => {
  const limit = 100
  delete ERRORS[key]
  let imageResult
  try {
    imageResult = await checkImage(text)
  } catch (error) {
    imageResult = error
  }

  if(imageResult === "success") return

  if (!text.trim()) ERRORS[key] = "O campo não pode ficar em branco"
  if (text.length > limit) ERRORS[key] = `O campo não pode ter mais de ${limit} caracteres`
}

// function:  sendToLocalStorage
// arguments: none
// return:    void
// use:       sends the STATE global to localStorage entry named cards
const sendToLocalStorage = () => {
  localStorage.setItem("cards", JSON.stringify(STATE))
}

// function:  createElement
// arguments: p: object; the configuration of the returned HTML element. accepts the following properties:
//            {
//              tag: string; the name of the HTML element tag; required
//              id?: string; the desired id of the element
//              src?: string; the desired src property of the element
//              alt?: string; the alt property of the element
//              type?: string; the type property of the element
//              textContent?: string; the inner text of the element
//              classList?: string[]; an array containing the list of classes attributed to the element
//              attributes?: [{key: string, value: string}]; array of other properties that can be set through element.setAttribute()
//              events?: [{type: string, callback: () => any}]; array of events bound to the element
//            }
// return:    HTMLElement
// use:       simplified way to create HTML elements
const createElement = (p) => {

  if (!p.tag) return

  const tag = document.createElement(p.tag)
  if (p.id) tag.id = p.id
  if (p.textContent) tag.textContent = p.textContent
  if (p.src) tag.src = p.src
  if (p.alt) tag.alt = p.alt
  if (p.type) tag.type = p.type
  if (p.classList && Array.isArray(p.classList)) {
    for (let className of p.classList) {
        tag.classList.add(className)
    }
  }
  if (p.attributes && Array.isArray(p.attributes)) {
    for (let attribute of p.attributes) {
      tag.setAttribute(attribute.key, attribute.value)
    }
  }

  if(p.events && Array.isArray(p.events)) {
    for (let event of p.events) {
      tag.addEventListener(event.type, event.callback)
    }
  }
  
  return tag
}

// function:  removeCard
// arguments: id: string; the id of the card that should be removed
// return:    void
// use:       removes the specified card from the STATE global and from the DOM
const removeCard = (id) => {
  const cardIndex = STATE.findIndex(card => card.id === id)
  STATE.splice(cardIndex, 1)
  _id(id).setAttribute("data-delete", "true")
  setTimeout(() => {
    _id(id).remove()
  }, 200)
  sendToLocalStorage()
}

// function:  makeImageOrText
// arguments: value: string;
// return:    HTMLElement
// use:       identifies whether the string passed is a valid image URL or not, returning an HTMLImageElement if positive, 
//            and an HTMLHeadingElement if negative
const makeImageOrText = async (value) => {
  let newElement
  try {
    await checkImage(value)
    newElement = createElement({
      tag: "img",
      src: value
    })
  } catch(error) {
    newElement = createElement({
      tag: "h3",
      textContent: value
    })
  }
  return newElement
}

// function:  render
// arguments: object: object; the configuration of the object that will be rendered as a card. accepts the following properties:
//            {
//              id: string;
//              front: string;
//              back: string
//            }
// return:    void
// use:       appends the following structure to the #main DOM element:
//            <button id={object.id} class="card-body-outer" aria-label="card">
//              <div class="card-body-inner" data-flipped="false">  
//                <div class="card-front">
//                  <h3>{object.front}</h3> | <img src={object.front} />
//                  <button aria-label="excluir card">×</button>
//                </div>
//                <div class="card-back" aria-expanded="false">
//                  <h3>{object.back}</h3> | <img src={object.back} />
//                </div>  
//              </div>
//            </button>
const render = async (object) => {
  const card = createElement({
    tag: "button",
    id: object.id,
    classList: ["card-body-outer"],
    attributes: [
      {
        key: "aria-label",
        value: "card"
      }
    ],
    events: [
      {
        type: "click", 
        callback: () => {
          const map = {
            "true": "false",
            "false": "true"
          }
          
          const currentState = cardInner.getAttribute("data-flipped")
          const allCards = document.querySelectorAll(".card-body-inner[data-flipped='true']")
          const allBacks = document.querySelectorAll(".card-back[aria-expanded='true']")
          allCards.forEach(card => card.setAttribute("data-flipped", "false"))
          cardInner.setAttribute("data-flipped", map[currentState])
          
          allBacks.forEach(back => back.setAttribute("aria-expanded", "false"))
          backStructure.setAttribute("aria-expanded", map[currentState])
        }
      }
    ]
  })

  const closeButton = createElement({
    tag: "button",
    textContent: "×",
    attributes: [
      {
        key: "aria-label",
        value: "excluir card"
      }
    ],
    events: [
      {
        type: "click",
        callback: (event) => {
          event.stopPropagation()
          removeCard(object.id)
        }
      }
    ]
  })

  const cardInner = createElement({
    tag: "div",
    classList: ["card-body-inner"],
    attributes: [{key: "data-flipped", value: "false"}]
  })

  const frontStructure = createElement({
    tag: "div",
    classList: ["card-front"]
  })

  
  const backStructure = createElement({
    tag: "div",
    classList: ["card-back"],
    attributes: [
      {
        key: "aria-expanded",
        value: "false"
      },
      {
        key: "aria-live",
        value: "assertive"
      }
    ]
  })
  
  const frontContent = await makeImageOrText(object.front)
  const backContent = await makeImageOrText(object.back)

  _ch(_id("main"), card)
  _ch(card, cardInner)
  _ch(cardInner, frontStructure, backStructure)
  _ch(frontStructure, frontContent, closeButton)
  _ch(backStructure, backContent)
}

// function:  reset
// arguments: ids: string; the form element ids to be reset
// return:    void
// use:       iterates through the elements passed and resets the value of each one of them
const reset = (...ids) => {
  for (let id of ids) {
    _id(id).value = ""
  }
}

// function:  createCard
// arguments: front: string; the content for the front side of the card
//            back: string; the content for the back side of the card
// return:    void
// use:       creates an object with a unique id of 15 characters and the content passed as arguments,
//            pushes it to the STATE global, dispatches it to localStorage and finally renders the corresponding DOM element
const createCard = (front, back) => {
  const object = {
    id: createUID(15),
    front: front,
    back: back
  }
  STATE.push(object)
  sendToLocalStorage()
  render(object)
}

// function:  expandForm
// arguments: id: string; 
//            force: boolean;
// return:    void
// use:       calls toggleExpand, clearing all errors previously set and automatically focusing the first input
const expandForm = (id, force) => {
  clearErrors()
  toggleExpand(id, force)
  if (_id(id).getAttribute("aria-expanded") === "true") {
    _id("input-front").focus()
  }
}

// function:  toggleExpand
// arguments: id: string; the id of the element to be expanded
//            force: boolean;
// return:    void
// use:       inverts the aria-expanded attribute of the selected element.
//            if the force flag is used, sets the aria-expanded attribute to the value of force
const toggleExpand = (id, force) => {
  const element = _id(id)
  const valueToMap = typeof force === "boolean" ? !force : element.getAttribute("aria-expanded")

  const valueMap = {
    "null": "false",
    "undefined": "false",
    "true": "false",
    "false": "true"
  }

  const elementChildren = document.querySelectorAll(`#${id} *`)
  for(let i = 0; i < elementChildren.length; i++) {
    if(valueMap[valueToMap] === "false") {
      elementChildren[i].setAttribute("tabindex", "-1")
      elementChildren[i].disabled = true
    } else {
      elementChildren[i].removeAttribute("tabindex")
      elementChildren[i].disabled = false
    }
  }

  element.setAttribute("aria-expanded", valueMap[valueToMap])
}

// function:  displayErrors
// arguments: none
// return:    void
// use:       displays the contents of the ERRORS global on the DOM
const displayErrors = () => {
  for (let error of Object.entries(ERRORS)) {
    _id(error[0]).textContent = error[1]
  }
}

// function:  clearErrors
// arguments: none
// return:    void
// use:       removes the errors both from the DOM and from the ERRORS global
const clearErrors = () => {
  for (let error of Object.entries(ERRORS)) {
    _id(error[0]).textContent = ""
    delete ERRORS[error[0]]
  }
}

// function:  handleFormSubmit
// arguments: event: DOMEvent
// return:    void
// use:       validates form inputs, creates the corresponding card, resets the form and closes its interface
const handleFormSubmit = async (event) => {
  event.preventDefault()
  clearErrors()

  const front = _id("input-front").value
  const back = _id("input-back").value

  try {
    await validate("front-error", front)
    await validate("back-error", back)
  } catch (error) {
    console.error(error)
  }

  if (Object.keys(ERRORS).length > 0) {
    displayErrors()
    return
  }

  reset("input-front", "input-back")
  createCard(front, back)
  toggleExpand("form-new", false)
}

// function:  toggleTheme
// arguments: none
// return:    void
// use:       toggles the page's theme by changing the data-theme attribute on the document's body
const toggleTheme = () => {
  const currentTheme = document.body.getAttribute("data-theme")
  const map = {
    "light": "dark",
    "dark": "contrast",
    "contrast": "light"
  }
  document.body.setAttribute("data-theme", map[currentTheme])
  localStorage.setItem("theme", map[currentTheme])
}

// initiates the app's functionalities after the DOM is loaded
window.addEventListener("load", () => {

  // adds a click event listener to the BUTTON_NEW global which toggles the form and closes the about floating blurb
  BUTTON_NEW.addEventListener("click", () => {
    expandForm("form-new")
    toggleExpand("about", false)
  })
  
  // adds a click event listener to the BUTTON_ABOUT global which toggles the about floating blurb and closes the form
  BUTTON_ABOUT.addEventListener("click", () => {
    toggleExpand("about")
    expandForm("form-new", false)
  })
  
  // adds a click event listener to the BUTTON_THEME global which toggles the page's theme
  BUTTON_THEME.addEventListener("click", toggleTheme)

  // adds a submit event listener to the FORM_NEW global which handles all internal functionalities of the app
  FORM_NEW.addEventListener("submit", handleFormSubmit)

  // renders the cards from localStorage
  for (let card of STATE) {
    render(card)
  }
})