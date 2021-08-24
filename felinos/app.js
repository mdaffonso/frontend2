let switched = false
const data = [
  {
    title: 'O tigre',
    imgUrl: './img/img-tigre.jpg',
    description: 'O Tigre (Panthera tigris) é umadas espécies dasubfamília dos panterinos (família Felidae) pertencenteao gêneroPanthera. Só é encontrado no continente asiático;É um predadorcarnívoro e é a maior espécie de felino do mundo,junto com o leão,podendo ambos atingir um tamanho comparável ao dosmaiores fósseis defelinos.',
    createdAt: '2021-06-01T23:12:11.837Z'
  }, 
  {
    title: 'O leão',
    imgUrl: './img/img-leao.png',
    description: 'O leão (Panthera leo) é um mamíferocarnívoro dafamília dos felídeos que é uma das cinco espéciesdo gênero Panthera.Leões selvagens vivem em populações cada vez maisdispersas efragmentadas na África Subsaariana (com exceção dasregiões de selva dacosta atlântica e da Bacia do Congo) e em uma pequenaárea do noroesteda Índia',
    createdAt: '2021-05-05T23:12:11.837Z'
  }, 
  {
    title: 'O leopardo',
    imgUrl: './img/img-leopardo.jpg',
    description: 'O leopardo (Panthera pardus) é ummamífero carnívoroda família dos felídeos. Como três dos outros gatosdo gênero Panthera:o leão, o tigre e a onça, eles se caracterizam poruma modificação noosso hióide que lhes permite rugir. É também conhecidacomo panteramarrom e, quando tem a pelagem totalmente escura,como pantera negra(melânica).',
    createdAt: '2021-05-05T23:12:11.837Z'
  }, 
  {
    title: 'A pantera negra',
    imgUrl: './img/img-pantera-negra.png',
    description: 'A pantera negra é uma variação negra(melanismo) devárias espécies de grandes felinos, principalmenteo leopardo (Pantherapardus) e a onça pintada (Panthera onca). Mas deve-seressaltar que nãoé uma espécie nova, nem mesmo uma subespécie, é simplesmenteumavariação negra desses animais.',
    createdAt: '2021-04-09T23:12:11.837Z'
  }, 
  {
    title: 'O jaguar',
    imgUrl: './img/img-jaguar.jpg',
    description: 'O jaguar, jaguar ou yaguareté (Pantheraonca) é umfelino carnívoro da subfamília dos Panterinos e gêneroPanthera. É aúnica das cinco espécies atuais desse gênero encontradasna América. Étambém o maior felino da América e o terceiro maiordo mundo, depois dotigre (Panthera tigris) e do leão (Panthera leo).',
    createdAt: '2021-05-18T23:12:11.837Z'
  }, 
  {
    title: 'O guepardo',
    imgUrl: './img/img-guepardo.png',
    description: 'A chita (Acinonyx jubatus) 1 é ummembro atípico dafamília dos felídeos. É o único representante vivodo gênero Acinonyx.Ele caça graças à sua visão e grande velocidade. Éo animal terrestremais rápido, atingindo velocidade máxima de 115 km/ h em corridas deaté quatrocentos ou quinhentos metros.',
    createdAt: '2021-05-22T23:12:11.837Z'
  }
]

const getArticles = () => document.querySelectorAll("#main article")

const substituteData = (newData) => {
  if (switched) {
    document.location.reload()
    return
  }
  const parent = document.querySelector("#main")
  const articles = getArticles()
  const newArticles = makeNewObjects(newData)
  articles.forEach(article => {
    article.remove()
  })

  for (let article of newArticles) {
    parent.appendChild(article)
  }

  switched = !switched
}

const makeNewObjects = (data) => {
  const nodes = []
  for (let entry of data) {
    const article = document.createElement("article")

    const articleTitle = document.createElement("h2")
    articleTitle.innerText = entry.title

    const articleImage = document.createElement("img")
    articleImage.setAttribute("src", entry.imgUrl)

    const articleBody = document.createElement("p")
    articleBody.innerText = entry.description

    const articleCreatedAt = document.createElement("small")
    articleCreatedAt.innerText = entry.createdAt

    article.appendChild(articleTitle)
    article.appendChild(articleImage)
    article.appendChild(articleBody)
    article.appendChild(articleCreatedAt)

    nodes.push(article)
  }

  return nodes
}

document.querySelector("button").addEventListener("click", () => {
  substituteData(data)
})