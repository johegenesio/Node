import express from "express"
const app = express()
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.get('/', (res, req) => {
    res.status(200).send('ok')
})
app.post('/submit', (req, res) => {
    const {name, email} = req.body
    console.log(`Nome: ${name}, Email: ${email}`)
    res.status(200).send(`Nome Recebido: ${name}, email: ${email}`)
})
export default app