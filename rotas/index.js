const express = require('express')
const app = express()
//app.set('View Engine', 'ejs')
app.get('/', function(req, res) {
    //req são os dados enviados pelo usuário
    //res são as respostas que vão ser enviadas para o usuário
    res.send("<h1>Bem vindo ao SENAI de Osasco!</h1>")
})
app.get('/aula', function(req, res) {
    res.send("<h1>Aula TOP!<br><hr><br>João</h1>")
})
app.get("/aula/professores", function(req,res){
    res.send("<br><h1>Os melhores professores estão aqui!<br><hr><br>Jansen e Luiz </h1>")
})
app.listen(4000, function(erro) {
    if(erro) {
        console.log('Ocorreu um erro com o SERVIDOR')
    } else {
        console.log('Servidor iniciado com sucesso')
    }
})
