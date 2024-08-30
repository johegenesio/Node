const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs', 'views')
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'css')))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(80, () => {
    console.log('Servidor Startado com Sucesso')
})