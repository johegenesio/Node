const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const Db = require('./js/Db')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname)))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'))
})

app.post('/salvar', async (req, res) => {
    const {nome, peso, altura, imc, classificacao} = req.body
    let coon

    try {
        conn = await Db.connect()
        const query = "INSERT INTO imc_table (nome, peso, altura, imc, classificacao) VALUES (?, ?, ?, ?, ?)"
        await conn.query(query, [nome, peso, altura, imc, classificacao])
        res.send('Dados salvos com sucesso!')
    } catch (e) {
        res.status(500).send('Erro ao salvar os dados no banco de dados')
        console.error(e)
    } finally {
        if (conn) conn.end()
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})