export const _ = selector => document.querySelector(selector)

export const _ap = (parent, ...children) => {
  for (let child of children) {
    parent.appendChild(child)
  }
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
//              checked?: boolean;
//              classList?: string[]; an array containing the list of classes attributed to the element
//              attributes?: [{key: string, value: string}]; array of other properties that can be set through element.setAttribute()
//              events?: [{type: string, callback: () => any}]; array of events bound to the element
//            }
// return:    HTMLElement
// use:       simplified way to create HTML elements
export const _create = (p) => {

  if (!p.tag) return

  const tag = document.createElement(p.tag)
  if (p.id) tag.id = p.id
  if (p.textContent) tag.textContent = p.textContent
  if (p.src) tag.src = p.src
  if (p.alt) tag.alt = p.alt
  if (p.type) tag.type = p.type
  if (typeof p.checked === "boolean") tag.checked = p.checked
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