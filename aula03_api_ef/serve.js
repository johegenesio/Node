import path from 'path'
import app from './app/app.js'
const __dirname = path.resolve()
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'principal.html'));
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`O servidor está conectando na porta ${PORT}`)
})