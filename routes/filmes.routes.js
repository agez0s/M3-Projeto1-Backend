const express = require('express');
const router = express.Router();

const listaFilmes = [];

let filmeDefault1 = {
    id: 1,
    nome: "A Origem",
    imagem: "https://m.media-amazon.com/images/I/61AFbsFwh7L._AC_SX679_.jpg",
    genero: "Ação",
    nota: "9.8",
    assistido: true
}

let filmeDefault2 = {
    id: 2,
    nome: "Dunkirk",
    imagem: "https://m.media-amazon.com/images/I/91a9Ez60pmL._AC_SL1500_.jpg",
    genero: "Ação",
    nota: "9.6",
    assistido: false
}

let filmeDefault3 = {
    id: 3,
    nome: "Interstellar",
    imagem: "https://http2.mlstatic.com/D_NQ_NP_692718-MLB25904741171_082017-O.jpg",
    genero: "Ficção Científica",
    nota: "10",
    assistido: true
}

let filmeDefault4 = {
    id: 4,
    nome: "Tenet",
    imagem: "https://www.dhresource.com/0x0/f2/albu/g9/M01/5F/6B/rBVaVV7ymemAYPpjAAf0MizyWz8093.jpg/2020-new-tenet-poster-silk-movie-art-film.jpg",
    genero: "Aventura",
    nota: "8.6",
    assistido: true
}

listaFilmes.push(filmeDefault1)
listaFilmes.push(filmeDefault2)
listaFilmes.push(filmeDefault3)
listaFilmes.push(filmeDefault4)



router.get("/", (req,res) => {
    res.send(listaFilmes);
})

router.get("/:id", (req,res) =>{
    let filmeId = req.params.id;

    const filme = listaFilmes.find(filme => filme.id == filmeId);
    
    if (!filme) {
        res.status(404).send({error: "Filme não encontrado"});
        return;
    }
    res.send(filme);
})

// [POST] /vagas/add - Cadastro de uma nova vaga
router.post('/add', (req, res) => {
    // recebi o objeto da vaga para cadastar vinda do cliente (via requisicao http POST)
    const { nome, genero, imagem, nota } = req.body;
    const filme = { nome, genero, imagem, nota };
    if (!filme || !filme.nome || !filme.genero || !filme.nota ) {
        res.status(400).send({message: `Filme inválido! Preencha os campos corretamente. Enviado: ${filme} ${filme.nome} ${filme.genero} ${filme.nota}`});
        return;
    }
    
    const idAleatorio = () => {
        const dateString = Date.now().toString(36);
        const aleatorio = Math.random().toString(36).substr(2);
        return dateString + aleatorio;
      };
    filme.id = idAleatorio();
    filme.assistido = false;
    listaFilmes.push(filme)
    res.status(201).send({
        message: `Filme "${filme.nome}" cadastrado com sucesso`,
        data: filme
    });
})

router.put('/editar/:id', (req, res) => {
    // o objeto que veio do front para atualizar a vaga com o id recebido
    const filmeEdit = req.body;
    // o id recebido via parametro
    const idParam = req.params.id;
    // procura o indice da vaga pre cadastrada na lista de acordo com o id recebido para atualizala
    let index = listaFilmes.findIndex(filme => filme.id == idParam);

    if (index < 0) {
        res.status(404).send({ error: "Filme não encontrado. Impossível editar"});
        return;
    }

    // spread operator ...
    // faz um espelho do item na lista e um espelho do objeto atualizado e junta os 2
    listaFilmes[index] = {
        ...listaFilmes[index],
        ...filmeEdit
    }

    res.send({
        message: `Filme ${listaFilmes[index].nome} atualizado com sucesso`,
        data: listaFilmes[index]
    })
})

router.delete('/delete/:id', (req, res) => {
    // acessamos o id recebido via parametro
    const idParam = req.params.id;

    const index = listaFilmes.findIndex(filme => filme.id == idParam);
    const filmeDeletado = listaFilmes[index];
    listaFilmes.splice(index, 1);
    res.send({
        message: `Filme ${filmeDeletado.nome} excluído com sucesso !`,
    })
})

module.exports = router;