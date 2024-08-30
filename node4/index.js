const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.use(express.static('public')) //
app.use(express.static(path.jois(__dirname, 'css')))

app.get('/ola', (req, res) => {
    console.log(path)
})

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(80, () => {
    console.log('Servidor operando com sucesso!')
})