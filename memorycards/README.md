# Memory Cards
Projeto final do primeiro checkpoint da disciplina. O tema devia ser
escolhido em grupo, que optou por flash cards.

Desenvolvi utilizando os conceitos aprendidos durante as aulas. Os
campos para a inserção de dados no formulário aceitam URLs de
imagens, automaticamente identificando-as como tais e renderizando
os elementos corretamente no DOM. O sistema utiliza persistência
local de dados por localStorage.

A plataforma é completamente responsiva, pensada a partir de uma abordagem
mobile first, amplamente acessível, com pontuação média de 98,25 no Google Lighthouse.

O usuário cria cards com conteúdos específicos para frente e verso, podendo
utilizar links com imagens. Cada card tem a sua frente e o seu verso separados, e podem
ser girados como se fossem cards de papel-cartão.


## Documentação
O cabeçalho contém 2 botões:

+ botão com o símbolo "+"
+ botão com o símbolo "i"

O botão com o símbolo "+" abre uma janela flutuante para a criação de card, com dois
campos de texto: frente e verso. Os dois campos devem obrigatoriamente ser preenchidos
para a validação do formulário. Os campos também têm um limite de 100 caracteres, exceto
para links de imagens.

O botão com o símbolo "i" abre uma janela flutuante com informações gerais e um botão animado
que alterna entre 3 temas diferentes: um tema claro, um tema escuro e um tema de alto contraste.

O corpo do site reúne os cards ordenadamente em uma matriz adaptável. Cada card é criado somente com
o conteúdo da frente visível e um botão para excluí-lo. Ao clicar no card, ele gira, mostrando somente o verso
e desvirando qualquer outro card que esteja com o verso visível. Somente um card pode ter o seu verso visível.

Os cards são armazenados em uma matriz de objetos em formato JSON no armazenamento local do navegador.

## Link
[Veja o Memory Cards no Github Pages](https://mdaffonso.github.io/frontend2/memorycards)