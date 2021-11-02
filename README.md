# M3-Projeto1-Backend
Backend do primeiro projeto do Módulo 3 - FullStack

## Endpoints
### GET /filmes
Recebe uma lista com os filmes cadastrados, separados por objetos.
Exemplo:

``` 
[
  {
    "id": 1,
    "nome": "A Origem",
    "imagem": "https://m.media-amazon.com/images/I/61AFbsFwh7L._AC_SX679_.jpg",
    "genero": "Ação",
    "nota": "9.8",
    "assistido": true
  },
  {
    "id": 2,
    "nome": "Dunkirk",
    "imagem": "https://m.media-amazon.com/images/I/91a9Ez60pmL._AC_SL1500_.jpg",
    "genero": "Ação",
    "nota": "9.6",
    "assistido": false
  }
]
``` 
---
### GET /filmes/{id}
Retorna apenas um filme, com a id selecionada. Se a id não existe, retorna erro.
Exemplo:

```
GET /filmes/2

{
  "id": 2,
  "nome": "Dunkirk",
  "imagem": "https://m.media-amazon.com/images/I/91a9Ez60pmL._AC_SL1500_.jpg",
  "genero": "Ação",
  "nota": "9.6",
  "assistido": false
}
```
### POST /filmes/add
Adiciona um filme a lista. Recebe um objeto com nome, genero, imagem (opcional [^1]) e nota do filme. 

### PUT /filmes/editar/{id}
Edita as informações nome, genero, imagem, nota e assistido do filme com a {id}. 

### DELETE /filmes/delete/{id}
Apaga o filme com a {id} correspondente.


[^1]: Se o campo "imagem" vier vazio, o frontend atribui uma imagem genérica.
