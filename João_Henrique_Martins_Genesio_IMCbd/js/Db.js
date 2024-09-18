const mariadb = require('mariadb');

class Db {
    constructor() {
        this.pool = mariadb.createPool({
            host: 'localhost',
            user: 'root',
            password: 'aluno01',
            database: 'ds1b',
            port: 3306,
            connectionLimit: 5
        });
    }

    async connect() {
        try {
            const conn = await this.pool.getConnection();
            console.log("Conectado ao banco de dados");
            return conn;
        } catch (err) {
            console.log("Erro ao conectar o banco de dados: " + err);
            throw err;
        }
    }
}

module.exports = new Db();
