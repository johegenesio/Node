const express = require("express")
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Seja bem vindo ao meu site</h1><hr><h2>Título H2</h2>')
})

//: = parametro, ? = parametro não obrigatorio

app.get('/ola/:nome?/:escola?', (req, res) => {
    let nome = req.params.nome // enviado pelo usuário
    let escola = req.params.escola
    if (escola) {
        res.send('Olá ' + nome + ' do ' + escola)
    } else if (nome) {
        res.send('Olá ' + nome) //devolve para o usuário
    } else {
        res.send('Olá')
    }
})

app.get

app.get('/aluno', (req, res) => {
    res.send('<h1>Esses aqui são os melhores Alunos!</h1><hr><h3>Juan, Miguel, Perugini, João H., João Carols, Matheus Figueiredo, Kethelyn, Diego, Beatriz, Samuel, Diogo, Henrique, Davi, Giullia Gentil, Vitória, Letícia, Gabriel Moura, Rafael Moura, Matheus Moreira, Maria Clara, Julia Bordinassi, Giovanna, Gabriel Pereira, Rebeca, André, Caroline, Pedro Henrique, Cauê, Pedro Claes</h3>')
})

app.get('/prof', (req, res) => {
    res.send('Professores Jansen e Luiz')
})

app.listen(8080, (erro) => {
    if(erro) {
        console.log('Ocorreu um erro no servidor!')
    } else {
        console.log('Servidor escutando')
    }
})