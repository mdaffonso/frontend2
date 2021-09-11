const _id = id => document.getElementById(id)
const _ch = (parent, ...children) => {
  for (let child of children) {
    parent.appendChild(child)
  }
}
const STATE = JSON.parse(localStorage.getItem("cards")) || []
const ERRORS = {}

const BUTTON_NEW = _id("btn-new")
const BUTTON_ABOUT = _id("btn-about")
const FORM_NEW = _id("form-new")


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

const checkImage = (url) => {
  return new Promise((resolve) => {
      const timeout = 5000
      const img = new Image()
      let timer
      img.onerror = img.onabort = () => {
          clearTimeout(timer)
          resolve("error")
      }
      img.onload = () => {
          clearTimeout(timer)
          resolve("success")
      }
      timer = setTimeout(() => {
          img.src = "//!!!!/test.jpg"
          resolve("timeout")
      }, timeout)
      img.src = url
  });
}

const validate = (key, text) => {
  delete ERRORS[key]
  if (!text.trim()) ERRORS[key] = "O campo não pode ficar em branco"
  if (text.length > 75) ERRORS[key] = "O campo não pode ter mais de 75 caracteres"
}

const sendToLocalStorage = () => {
  localStorage.setItem("cards", JSON.stringify(STATE))
}

const createElement = (p) => {

  /*

  p {
    tag: string
    id?: string
    src?: string
    alt?: string
    type?: string
    role?: string
    textContent?: string
    classList?: string[]
    attributes?: [{key: string, value: string}]
    events?: [{type: string, callback: () => any}]
  }

  */

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

const removeCard = (id) => {
  const cardIndex = STATE.findIndex(card => card.id === id)
  STATE.splice(cardIndex, 1)
  _id(id).setAttribute("data-delete", "true")
  setTimeout(() => {
    _id(id).remove()
  }, 200)
  sendToLocalStorage()
}

const makeImageOrText = async (value) => {
  let newElement
  if(await checkImage(value) === "success") {
    newElement = createElement({
      tag: "img",
      src: value
    })
  } else {
    newElement = createElement({
      tag: "h3",
      textContent: value
    })
  }
  return newElement
}

const render = async (object) => {

  /*

  object {
    id: string
    front: string
    back: string
  }

  */

  const card = createElement({
    tag: "button",
    id: object.id,
    classList: ["card-body-outer"],
    events: [
      {
        type: "click", 
        callback: () => {
          const map = {
            "true": "false",
            "false": "true"
          }
          
          cardInner.setAttribute("data-flipped", map[cardInner.getAttribute("data-flipped")])
        }
      }
    ]
  })

  const closeButton = createElement({
    tag: "button",
    textContent: "×",
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
    classList: ["card-back"]
  })
  
  const frontContent = await makeImageOrText(object.front)
  const backContent = await makeImageOrText(object.back)

  _ch(_id("main"), card)
  _ch(card, cardInner)
  _ch(cardInner, frontStructure, backStructure)
  _ch(frontStructure, frontContent, closeButton)
  _ch(backStructure, backContent)

}

const reset = (...ids) => {
  for (let id of ids) {
    _id(id).value = ""
  }
}

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

const expandForm = (id, force) => {
  clearErrors()
  toggleExpand(id, force)
  if (_id(id).getAttribute("aria-expanded") === "true") {
    _id("input-front").focus()
  }
}

const toggleExpand = (id, force) => {
  const element = _id(id)
  const valueToMap = typeof force === "boolean" ? !force : element.getAttribute("aria-expanded")

  const valueMap = {
    "true": "false",
    "false": "true"
  }

  element.setAttribute("aria-expanded", valueMap[valueToMap])
}

const displayErrors = () => {
  for (let error of Object.entries(ERRORS)) {
    _id(error[0]).textContent = error[1]
  }
}

const clearErrors = () => {
  for (let error of Object.entries(ERRORS)) {
    _id(error[0]).textContent = ""
    delete ERRORS[error[0]]
  }
}

const handleFormSubmit = (event) => {
  event.preventDefault()
  clearErrors()

  const front = _id("input-front").value
  const back = _id("input-back").value

  validate("front-error", front)
  validate("back-error", back)

  if (Object.keys(ERRORS).length > 0) {
    displayErrors()
    return
  }

  reset("input-front", "input-back")
  createCard(front, back)
  toggleExpand("form-new", false)
}

BUTTON_NEW.addEventListener("click", () => {
  expandForm("form-new")
})

BUTTON_ABOUT.addEventListener("click", () => {
  toggleExpand("about")
})

FORM_NEW.addEventListener("submit", handleFormSubmit)

window.addEventListener("load", () => {
  for (let card of STATE) {
    render(card)
  }
})