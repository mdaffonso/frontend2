const display = document.querySelector(".display")
const mainValue = document.querySelector("#mainValue")
const currentOperation = document.querySelector("#currentOperation")
const numberButtons = document.querySelectorAll(".n")
const error = ":("
let resultMemory = []
let orderOfKeysPressed = []
let sym = [
  "+", 
  "-",
  "×",
  "÷"
]

const displayNumber = (n) => {
  if (mainValue.textContent === "0" || mainValue.textContent === error) mainValue.textContent = ""
  const currentValue = mainValue.textContent
  const newValue = `${currentValue}${n}`
  orderOfKeysPressed.push(n)
  mainValue.textContent = newValue
}

const clear = () => {
  mainValue.textContent = "0"
  mainValue.setAttribute("data-large", "")
}

const reset = () => {
  clear()
  currentOperation.textContent = ""
  resultMemory = []
}

const deleteDigit = () => {
  const currentValue = mainValue.textContent
  const newValue = currentValue.substr(0, currentValue.length-1)
  mainValue.textContent = newValue
  if(!mainValue.textContent)
    clear()
}

const operation = () => {
  if(mainValue.textContent === error) reset()
  currentOperation.textContent = resultMemory.flat().join("")
  const refOp = currentOperation.textContent
  if(refOp.includes("=") && refOp.indexOf("=") !== refOp.length - 1) {
    const partialResetArray = refOp.split("=")
    currentOperation.textContent = partialResetArray[1]
    resultMemory = [resultMemory.pop()]
  }
  clear()
}

const execute = (n, s) => {
  if (sym.includes(orderOfKeysPressed[orderOfKeysPressed.length - 1])) {
    n = resultMemory.pop()[0]
  }
  orderOfKeysPressed.push(s)
  resultMemory.push([n, s])
  operation()
}

const addMath = (m, n) => Number.parseFloat(m) + Number.parseFloat(n)
const subtractMath = (m, n) => Number.parseFloat(m) - Number.parseFloat(n)
const multiplyMath = (m, n) => Number.parseFloat(m) * Number.parseFloat(n)
const divideMath = (m, n) => {
  const result = Number.parseFloat(m) / Number.parseFloat(n)
  if(n === "0") return error
  return result
}

const equals = () => {
  const conversionMatrix = [
    { s: sym[0], o: addMath },
    { s: sym[1], o: subtractMath },
    { s: sym[2], o: multiplyMath },
    { s: sym[3], o: divideMath }
  ]

  let currentResult
  let currentOperation
  for (let [index, pair] of resultMemory.entries()) {
    if (index === 0) {
      currentResult = pair[0]
      continue
    }
    currentOperation = conversionMatrix.find(v => v.s === resultMemory[index-1][1])
    currentResult = currentOperation.o(currentResult, pair[0])
  }

  if (isNaN(currentResult)) return error

  return currentResult
}

const displayEquals = () => {
  if (mainValue.textContent === error) return
  resultMemory.push([mainValue.textContent, "="])
  operation()
  const result = `${equals()}`
  mainValue.textContent = result
}

document.querySelector("#clear").addEventListener("click", reset)
document.querySelector("#delete").addEventListener("click", deleteDigit)

document.querySelector("#add").addEventListener("click", () => execute(mainValue.textContent, "+"))
document.querySelector("#subtract").addEventListener("click", () => execute(mainValue.textContent, "-"))
document.querySelector("#multiply").addEventListener("click", () => execute(mainValue.textContent, "×"))
document.querySelector("#divide").addEventListener("click", () => execute(mainValue.textContent, "÷"))

document.querySelector("#equals").addEventListener("click", displayEquals)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    displayNumber(button.textContent)
  })
})

window.addEventListener("keydown", e => {

  const validKeys = [
    {
      keys: ["+"],
      do: () => execute(mainValue.textContent, sym[0])
    },
    {
      keys: ["-"],
      do: () => execute(mainValue.textContent, sym[1])
    },
    {
      keys: ["*"],
      do: () => execute(mainValue.textContent, sym[2])
    },
    {
      keys: ["/"],
      do: () => execute(mainValue.textContent, sym[3])
    },
    {
      keys: ["Escape", "Delete"],
      do: () => reset()
    },
    {
      keys: ["=", "Enter"],
      do: () => displayEquals()
    },
    {
      keys: ["Backspace"],
      do: () => deleteDigit()
    },
    {
      keys: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      do: () => displayNumber(e.key)
    }
  ]

  const action = validKeys.find(validKey => validKey.keys.includes(e.key))
  if (!action) {
    return
  }

  action.do()
})