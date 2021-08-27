const removeGeneratorButton = (button) => {
  button.removeEventListener("click", init)
  button.remove()
}

const generateHTML = () => {
  const appendChildren = (parent, children) => {
    for (let child of children) {
      parent.appendChild(child)
    }
  }
  const wrapper = document.createElement("div")
  const header = document.createElement("header")
  const main = document.createElement("main")
  const title = document.createElement("h1")
  const form = document.createElement("form")
  const emailGroup = document.createElement("div")
  const emailLabel = document.createElement("label")
  const emailField = document.createElement("input")
  const passwordGroup = document.createElement("div")
  const passwordLabel = document.createElement("label")
  const passwordField = document.createElement("input")
  const buttonGroup = document.createElement("div")
  const submitButton = document.createElement("button")
  const resetButton = document.createElement("button")
  const destroyButton = document.createElement("button")

  title.innerText = "Login"
  emailLabel.innerText = "E-mail"
  passwordLabel.innerText = "Senha"
  submitButton.innerText = "fazer log-in"
  resetButton.innerText = "redefinir"
  destroyButton.innerText = "destruir"

  header.classList.add("fade-in")
  main.classList.add("fade-in")
  main.classList.add("fade-to-white")

  emailGroup.classList.add("field-group")
  emailField.type = "email"
  emailField.id = "email"
  emailField.name = "email"
  emailField.required = true

  passwordGroup.classList.add("field-group")
  passwordField.type = "password"
  passwordField.id = "password"
  passwordField.name = "password"
  passwordField.required = true

  submitButton.id="submit"

  buttonGroup.classList.add("button-group")
  resetButton.classList.add("alt")
  destroyButton.classList.add("alt-boxless")
  submitButton.type = "submit"
  resetButton.type = "reset"
  destroyButton.addEventListener("click", () => {
    const content = document.querySelector("body > div")
    destroyButton.disabled = true
    content.classList.add("fade-out")
    setTimeout(() => {
      content.remove()
      generateGeneratorButton()
    }, 200)
  })

  const structure = [
    {
      parent: wrapper,
      children: [header, main]
    },
    {
      parent: header,
      children: [title]
    },
    {
      parent: main,
      children: [form]
    },
    {
      parent: emailGroup,
      children: [emailLabel, emailField]
    },
    {
      parent: passwordGroup,
      children: [passwordLabel, passwordField]
    },
    {
      parent: buttonGroup,
      children: [submitButton, resetButton, destroyButton]
    },
    {
      parent: form,
      children: [emailGroup, passwordGroup, buttonGroup]
    },
  ]

  for (let element of structure) {
    appendChildren(element.parent, element.children)
  }

  return wrapper
}


const init = () => {
  removeGeneratorButton(document.querySelector("#generator-button"))
  document.body.appendChild(generateHTML())
  document.querySelector("form").addEventListener("submit", e => {
    const email = document.querySelector("#email").value
    document.querySelector("#email").value = ""
    document.querySelector("#password").value = ""
    e.preventDefault()
    showToast(`Você entrou como ${email}`)
  })
}

const generateGeneratorButton = () => {
  const button = document.createElement("button")
  button.addEventListener("click", init)
  button.innerText = "gerar conteúdo"
  button.classList.add("generator")
  button.classList.add("fade-in")
  button.id = "generator-button"
  document.body.appendChild(button)
}

const showToast = (text) => {
  const toast = document.createElement("div")
  toast.id = "toast"
  toast.textContent = text
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.remove()
  }, 3500)
}

generateGeneratorButton()