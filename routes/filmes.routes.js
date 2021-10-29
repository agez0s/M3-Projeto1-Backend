const express = require('express');
const router = express.Router();

router.use(express.urlencoded());

const listaFilmes = [];

let filmeDefault = {
    id: Date.now(),
    nome: "A Origem",
    imagem: "https://m.media-amazon.com/images/I/61AFbsFwh7L._AC_SX679_.jpg",
    genero: "Ação",
    nota: "10",
    assistido: true
}

listaFilmes.push(filmeDefault)



router.get("/", (req,res) => {
    res.send(listaFilmes);
})

router.get("/:id", (req,res) =>{
    let filmeId = req.params.id;

    const filme = listaFilmes.find(filme => filme.id == filmeId);
    res.send(filme);
})

// [POST] /vagas/add - Cadastro de uma nova vaga
router.post('/add', (req, res) => {
    // recebi o objeto da vaga para cadastar vinda do cliente (via requisicao http POST)
    const { nome, genero, imagem, nota } = req.body;
    const filme = { nome, genero, imagem, nota };
    console.log(filme)
    console.log("---")
    console.log(req.body)
    filme.id = Date.now();
    filme.assistido = false;
    listaFilmes.push(filme)
    res.status(201).send({
        message: 'Cadastro com sucesso',
        data: filme
    });
})

router.put('/editar/:id', (req, res) => {
    // o objeto que veio do front para atualizar a vaga com o id recebido
    const vagaEdit = req.body;
    // o id recebido via parametro
    const idParam = req.params.id;
    // procura o indice da vaga pre cadastrada na lista de acordo com o id recebido para atualizala
    let index = vagas.findIndex(vaga => vaga.id == idParam);

    // spread operator ...
    // faz um espelho do item na lista e um espelho do objeto atualizado e junta os 2
    vagas[index] = {
        ...vagas[index],
        ...vagaEdit
    }

    res.send({
        message: `vaga ${vagas[index].titulo} atualizada com sucesso`,
        data: vagas[index]
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