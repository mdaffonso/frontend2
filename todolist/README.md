# Lista de Tarefas
Projeto final do segundo checkpoint da disciplina. O objetivo era a criação uma 
lista de tarefas.

Desenvolvi utilizando os conceitos aprendidos durante as aulas.
O sistema utiliza persistência local de dados por localStorage.

A plataforma é completamente responsiva, pensada a partir de uma abordagem
mobile first.

O usuário cria cards com tarefas, inserindo a sua descrição e, opcionalmente, uma data limite para conclusão.
No mesmo dia do prazo de conclusão da tarefa, os cards ficam com fundo amarelo, demandando atenção.
Passado o prazo, os cards ficam com fundo vermelho.


## Documentação
O cabeçalho contém 1 botão para configurações. Nas configurações, o usuário pode alterar
o tema entre claro e escuro, e restaurar a tarefa mais recentemente excluída.

O corpo do site reúne os cards ordenadamente em uma matriz adaptável.

Os cards são armazenados em uma matriz de objetos em formato JSON no armazenamento local do navegador.

## Link
[Veja a Lista de Tarefas no Github Pages](https://mdaffonso.github.io/frontend2/todolist)