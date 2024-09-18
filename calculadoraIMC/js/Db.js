const mariadb = require('mariadb')

class Db {
    constructor () {
        this.pool = mariadb.createPool({
            host: 'localhost',
            user: 'root',
            password: 'aluno01',
            database: 'ds1b',
            port: 3306,
            connectionLimit: 5
        })
    }

    async connect() {
        try {
            const conn = await this.pool.getConnection()
            console.log('Conectando ao banco de dados')
            return conn
        } catch (e) {
            console.error('Erro ao conectar ao banco de dados:', e)
            throw e
        }
    }
}
module.exports = new Db()