const frases = [
  "corta pra mim",
  "eu escuto vocês",
  "primeiro movimento",
  "copo vazio",
  "bora lá",
  "vem junto comigo",
  "e sim",
  "começar a fazer dinheiro",
  "brincar com isso",
  "a gente vai falar isso daqui a pouquinho",
  "vocês já devem saber",
  "próxima aula",
  "vocês me conhecem",
  "trabalhar em cima disso",
  "fazer upgrades",
  "dinamicamente",
  "orientação a projeto",
  "trocar figurinhas",
]

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }
  return array
}

const frasesFinais = shuffle(frases).splice(0, 9)

const bingo = () => {
  document.getElementById("bingo").setAttribute("data-open", "true")
  document.getElementById("replay").addEventListener("click", () => {
    document.location.reload()
  })
}

const toggleCheck = id => {
  const currentChecked = document.getElementById(id).getAttribute("data-checked")
  const matrix = {
    "true": "false",
    "false": "true"
  }
  document.getElementById(id).setAttribute("data-checked", matrix[currentChecked])
  const totalChecked = document.querySelectorAll('[data-checked="true"]').length
  if(totalChecked === 9) {
    bingo()
  }
}

for (let frase of frasesFinais) {
  const buttonId = `button${Math.ceil(Math.random() * 3000)}`
  const quadrado = document.createElement("button")
  quadrado.setAttribute("data-checked", "false")
  quadrado.id = buttonId
  quadrado.innerText = frase
  quadrado.addEventListener("click", () => toggleCheck(buttonId))
  document.body.appendChild(quadrado)
}