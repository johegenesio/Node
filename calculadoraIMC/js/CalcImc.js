export class CalcImc {
    #peso
    #altura
    #nome
    calcularImc() {
        const imc = (this.#peso/(Math.pow(this.#altura, 2))).toFixed(2)
        return imc
    }
    tabelaImc() {
        const imc = this.calcularImc()
        if (imc < 18.5) {
            return "Baixo peso"
        } else if (imc >= 18.5 && imc <= 24.99) {
            return "Peso adequado"
        } else if (imc >= 25 && imc <= 29.99) {
            return "Sobrepeso"
        } else if (imc >= 30 && imc <= 34.99) {
            return "Obesidade Grau 1"
        } else if (imc >= 35 && imc <= 39.99) {
            return "Obesidade Grau 2"
        } else {
            return "Obesidade Extrema"
        }
    }
    constructor (nome, peso, altura) {
        this.#peso = peso
        this.#altura = altura
        this.#nome = nome
    }
    getNome() {
        return this.#nome
    }
    getPeso() {
        return this.#peso
    }
    getAltura() {
        return this.#altura
    }
}