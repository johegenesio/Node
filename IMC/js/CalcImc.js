export class CalcImc {
    #nome;
    #altura;
    #peso;

    calcularImc(peso,altura) {
        return peso/(Math.pow(altura,2));
        
    }
    constructor(nome,peso,altura) {
        this.#nome=nome;
        this.#peso=peso;
        this.#altura=altura;
    }
    getNome(){
        return this.#nome;
    }
    getPeso(){
        return this.#peso;
    }
    getAltura(){
        return this.#altura;
    }
}