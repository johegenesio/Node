const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Criar conexão com o banco de dados
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'escola',
    password: 'aluno01',
    connectionLimit: 5,
    dateStrings: true // Adiciona esta linha para tratar datas como strings
});

// Formatar data para o formato 'YYYY-MM-DD'
function formatarData(date) {
    const d = new Date(date);
    let mes = '' + (d.getMonth() + 1);
    let dia = '' + (d.getDate()+1);
    const ano = d.getFullYear();

    if (mes.length < 2)
        mes = '0' + mes;
    if (dia.length < 2)
        dia = '0' + dia;

    return [ano, mes, dia].join('-');
}

// Função para substituir BigInt por string no JSON
function replacer(key, value) {
    if (typeof value === 'bigint') {
        return value.toString();
    }
    return value;
}

// Endpoint para inserir um novo aluno
app.post('/inserir', async (req, res) => {
    const { nome, sobrenome, data_nascimento } = req.body;
    let conn;
    try {
       
        conn = await pool.getConnection();
        const dataCorreta = formatarData(data_nascimento);
        console.log(`Data formatada para inserção: ${dataCorreta}`); // Adiciona console.log aqui
        const query = 'INSERT INTO aluno (nome, sobrenome, data_nascimento) VALUES (?, ?, ?)';
        const result = await conn.query(query, [nome, sobrenome, dataCorreta]);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    } finally {
        if (conn) conn.end();
    }
});

// Endpoint para consultar os alunos
app.get('/consultar', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT nome, sobrenome, DATE_FORMAT(data_nascimento, "%Y-%m-%d") as data_nascimento FROM aluno');
        console.log('Dados consultados:', rows); // Adiciona console.log para debug
        const result = JSON.stringify(rows, replacer);
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    } finally {
        if (conn) conn.end();
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});