const express = require('express');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Configuração da conexão com MariaDB
const db = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aluno01',
    database: 'ds1b',
    port: 3306,
    connectionLimit: 5
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao MariaDB');
});

// Página inicial com o formulário de cadastro
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Crie um arquivo HTML simples
});

// Adicionar novo usuário e calcular o IMC
app.post('/add', (req, res) => {
    const sql = `INSERT INTO (nome, peso, altura, imc) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nome, peso, altura, imc], (err, result) => {
        if (err) throw err;
        res.redirect('/users');
    });
});

// Listar todos os usuários
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM imc_table';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results); // Você pode renderizar uma página HTML em vez disso
    });
});

// Atualizar um usuário
app.post('/update', (req, res) => {
    const sql = `UPDATE imc_table SET peso = ?, altura = ?, imc = ? WHERE id = ?`;
    db.query(sql, [peso, altura, imc, id], (err, result) => {
        if (err) throw err;
        res.redirect('/users');
    });
});

// Deletar um usuário
app.post('/delete', (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM imc_table WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.redirect('/users');
    });
});

app.listen(3000, () => {    
    console.log('Servidor rodando na porta 3000');
});
