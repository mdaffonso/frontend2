let timer

const findEmptyInput = () => {
  const emptyInputs = []
  const emptyInputNodes = document.querySelectorAll("input")
  emptyInputNodes.forEach(node => node.value.trim() === "" && emptyInputs.push(node))
  return emptyInputs[0]
}

const makeNewInput = () => {
  const firstEmptyInput = findEmptyInput()
  const randomNumber = Math.floor(Math.random() * 100000)
  if(firstEmptyInput) {
    firstEmptyInput.focus()
  } else {
    const input = document.createElement("input")
    input.setAttribute("type", "number")
    input.setAttribute("id", `input${randomNumber}`)
    input.classList.add("number")
    const form = document.querySelector("form")
    const button = document.querySelector("button")
    const newInput = form.insertBefore(input, button)
    newInput.focus()
  }
}

window.addEventListener("keyup", e => {
  if(e.key === "Tab") {
    e.preventDefault()
  }
  clearTimeout(timer);
  timer = setTimeout(() => {
    makeNewInput()
  }, 350);
})


document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault()
  
  const form = document.querySelector("form")
  const body = document.querySelector("body")

  const allInputs = document.querySelectorAll("input")
  const allValues = []
  allInputs.forEach(input => allValues.push(input.value))
  const validInputs = allValues.filter(value => value.trim() !== "")
  const sum = validInputs
    .map(value => Number.parseFloat(value))
    .reduce((acc, curr) => acc + curr, 0)
  const avg = sum/validInputs.length

  let message = "Infelizmente, a sua média é muito baixa. Você reprovou. 🙁"
  if(avg > 7) message = "Parabéns! Você foi aprovado! 😄"

  form.classList.remove("down-in")
  form.classList.add("down-out")

  setTimeout(() =>{
    form.remove()

    const messageHeader = document.createElement("h2")
    messageHeader.classList.add("down-in")

    const messageNumber = document.createElement("h1")
    messageNumber.classList.add("down-in", "average")

    const messageLower = document.createElement("h3")
    messageLower.classList.add("down-in")

    body.appendChild(messageHeader)
    body.appendChild(messageNumber)
    body.appendChild(messageLower)

    const avgText = document.createTextNode(`Sua média é`)
    const avgNumber = document.createTextNode(avg.toFixed(2))
    const messageNode = document.createTextNode(message)
    
    messageHeader.appendChild(avgText)
    messageNumber.appendChild(avgNumber)
    messageLower.appendChild(messageNode)

    const newAverage = document.createElement("a")
    newAverage.setAttribute("href", "./")
    const newAverageText = document.createTextNode("calcular outra média")
    newAverage.appendChild(newAverageText)
    body.appendChild(newAverage)
    
    setTimeout(() => {
      newAverage.classList.add("down-in")
    }, 1000)
  }, 500)
})