import { CalcImc } from "./CalcImc.js"
document.getElementById('frmImc').addEventListener('submit', () => {
    event.preventDefault()
    
    const nomeForm = document.getElementById('nome').value
    const pesoForm = document.getElementById('peso').value
    const alturaForm = document.getElementById('altura').value

    let imc = new CalcImc(nomeForm, pesoForm, alturaForm)
    document.getElementById('print').innerHTML = `O nome é ${imc.getNome()}, o peso é: ${imc.getPeso()}, a altura é ${imc.getAltura()}, seu IMC é: ${imc.calcularImc(pesoForm, alturaForm)}, classificação: ${imc.tabelaImc()}`
})