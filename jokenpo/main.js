let score = [0, 0]
let selection = null
let aiSelection = null
let currentResult = null

const resultPossibilities = [
  {
    result: "win",
    text: "Ganhou! 🤘"
  },

  {
    result: "lose",
    text: "Perdeu 😡"
  },

  {
    result: "tie",
    text: "Empatou... 😐"
  }
]

const possibilities = [
  {
    option: "rock",
    beats: "scissor",
    beatenBy: "paper"
  },
  {
    option: "scissor",
    beats: "paper",
    beatenBy: "rock"
  },
  {
    option: "paper",
    beats: "rock",
    beatenBy: "scissor"
  },
]

const buttons = document.querySelectorAll("#options button")
const optionsContainer = document.querySelector("#options")

const disableButtons = (buttons) => {
  buttons.forEach(element => {
    element.disabled = true
    element.classList.add("remove")
    setTimeout(() => element.remove(), 300)
  })
}

const play = () => {
  switch(true) {
    case selection.option === aiSelection.option:
      return "tie"
    case selection.option === aiSelection.beats:
      score[1]++
      return "lose"
    case selection.option === aiSelection.beatenBy:
      score[0]++
      return "win"
  }
}

const makeAiSelection = () => {
  const randomPick = Math.floor(Math.random() * 3)
  return possibilities[randomPick]
}

const renderOptions = () => {
  const rockButton = document.createElement("button")
  rockButton.id = "rock"
  
  const rockImage = document.createElement("img")
  rockImage.setAttribute("src", "img/ico-rock.png")
  rockImage.setAttribute("alt", "pedra")
  rockButton.appendChild(rockImage)
  
  const paperButton = document.createElement("button")
  paperButton.id = "paper"
  
  const paperImage = document.createElement("img")
  paperImage.setAttribute("src", "img/ico-paper.png")
  paperImage.setAttribute("alt", "papel")
  paperButton.appendChild(paperImage)
  
  const scissorButton = document.createElement("button")
  scissorButton.id = "scissor"
  
  const scissorImage = document.createElement("img")
  scissorImage.setAttribute("src", "img/ico-scissor.png")
  scissorImage.setAttribute("alt", "tesoura")
  scissorButton.appendChild(scissorImage)
  
  optionsContainer.appendChild(rockButton)
  optionsContainer.appendChild(paperButton)
  optionsContainer.appendChild(scissorButton)
}

const showResults = () => {
  const container = document.createElement("div")
  container.classList.add("results")

  const title = document.createElement("h1")
  const titleTextNode = document.createTextNode(resultPossibilities.find(v => v.result === currentResult).text)
  title.appendChild(titleTextNode)
  container.appendChild(title)

  const resultImagesContainer = document.createElement("div")
  resultImagesContainer.classList.add("result-images")
  container.appendChild(resultImagesContainer)

  const playerPick = document.createElement("img")
  playerPick.setAttribute("src", `img/ico-${selection.option}.png`)
  playerPick.setAttribute("alt", selection.option)
  resultImagesContainer.appendChild(playerPick)

  const aiPick = document.createElement("img")
  aiPick.setAttribute("src", `img/ico-${aiSelection.option}.png`)
  aiPick.setAttribute("alt", aiSelection.option)
  resultImagesContainer.appendChild(aiPick)

  const scoreContainer = document.createElement("div")
  scoreContainer.classList.add("score")
  container.appendChild(scoreContainer)

  const playerScore = document.createElement("h2")
  const playerScoreText = document.createTextNode(score[0])
  playerScore.appendChild(playerScoreText)
  scoreContainer.appendChild(playerScore)

  const aiScore = document.createElement("h2")
  const aiScoreText = document.createTextNode(score[1])
  aiScore.appendChild(aiScoreText)
  scoreContainer.appendChild(aiScore)

  const replayButton = document.createElement("button")
  replayButton.classList.add("replay")
  const replayButtonText = document.createTextNode("jogar novamente")
  replayButton.appendChild(replayButtonText)
  container.appendChild(replayButton)

  optionsContainer.appendChild(container)

  replayButton.addEventListener("click", () => {
    fadeResults()
    setTimeout(() => {
      renderOptions()
      makeButtonsListener(document.querySelectorAll("#options button"))
    }, 300)
  })
}

const fadeResults = () => {
  const results = document.querySelector(".results")
  results.classList.add("remove")
  setTimeout(() => results.remove(), 300)
}

const selectOption = element => {
  let thisId = element.id
  disableButtons(document.querySelectorAll("#options button"))
  const selection = possibilities.find(v => v.option == thisId)
  return selection
}

const makeButtonsListener = (buttons) => {
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      selection = selectOption(button)
      aiSelection = makeAiSelection()
      currentResult = play()
      setTimeout(showResults, 300)
    })
  })
}

makeButtonsListener(buttons)