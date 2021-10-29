const express = require('express');
const cors = require('cors');

const filmesRouter = require('./routes/filmes.routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/filmes', filmesRouter);

app.get("/", (req,res) => {
    res.send("Olá Turma");
})

app.listen(port, () => {
    console.log(`Rodando servidor em http://localhost:${port}`);
});