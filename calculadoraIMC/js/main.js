import {CalcImc} from "./CalcImc.js";

document.getElementById('frmImc').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nomeForm = document.getElementById('nome').value;
    const pesoForm = document.getElementById('peso').value;
    const alturaForm = document.getElementById('altura').value;

    let imc = new CalcImc(nomeForm, pesoForm, alturaForm);
    const imcValor = imc.calcularImc();
    const   classificacao = imc.tabelaImc();

    document.getElementById('print').innerHTML = 
    `O nome é ${imc.getNome()}, o peso é: ${imc.getPeso()}, a altura é ${imc.getAltura()}, seu IMC é: ${imcValor}, classificação: ${classificacao}`;

    const response = await fetch('/salvar', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: imc.getNome(),
            peso: imc.getPeso(),
            altura: imc.getAltura(),
            imc: imcValor,
            classificacao: classificacao
        })
    })
    if(response.ok) {
        alert('Dados salvos com sucesso!')
    }else {
        alert('Erro ao salvar os dados')
    }
});