import { CalcImc } from "./CalcImc.js";

// Função para criar um novo registro (Create)
document.getElementById('frmImc').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nomeForm = document.getElementById('txtNome').value;
    const pesoForm = document.getElementById('nmbPeso').value;
    const alturaForm = document.getElementById('nmbAltura').value;

    let imc = new CalcImc(nomeForm, pesoForm, alturaForm);
    const imcValor = imc.calcularImc(pesoForm, alturaForm).toFixed(2);

    let classificacao = "";
    if (imcValor < 18.5) classificacao = "Abaixo do peso";
    else if (imcValor < 24.9) classificacao = "Peso normal";
    else if (imcValor < 29.9) classificacao = "Sobrepeso";
    else classificacao = "Obesidade";

    const response = await fetch('/salvar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: imc.getNome(),
            peso: imc.getPeso(),
            altura: imc.getAltura(),
            imc: imcValor,
            classificacao: classificacao
        })
    });

    if (response.ok) {
        alert('Dados salvos com sucesso!');
        listarRegistros(); // Atualiza a lista após criar
    } else {
        alert('Erro ao salvar os dados.');
    }
});

// Função para listar todos os registros (Read)
async function listarRegistros() {
    const response = await fetch('/registros');
    const registros = await response.json();

    const tabela = document.getElementById('tabelaRegistros').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
    const tabelaImc = document.getElementById('tabelaImc').getElementsByTagName('tbody')[0];
    tabelaImc.innerHTML = '';

    registros.forEach(registro => {
        const row = tabela.insertRow();
        row.innerHTML = `
            <td>${registro.nome}</td>
            <td>${registro.peso}</td>
            <td>${registro.altura}</td>
            <td>
                <button class="btn-editar" data-id="${registro.id}">Editar</button>
                <button class="btn-excluir" data-id="${registro.id}">Excluir</button>
            </td>
        `;
    });

    registros.forEach(registro => {
        const row = tabelaImc.insertRow();
        row.innerHTML = `
            <td>${registro.nome}</td>
            <td>${registro.imc}</td>
            <td>${registro.classificacao}</td>
            <td>
                <button class="btn-editar" data-id="${registro.id}">Editar</button>
                <button class="btn-excluir" data-id="${registro.id}">Excluir</button>
            </td>
        `;
    });

    document.querySelectorAll('.btn-editar').forEach(button => {
        button.addEventListener('click', () => editarRegistro(button.dataset.id));
    })
    document.querySelectorAll('.btn-excluir').forEach(button => {
        button.addEventListener('click', () => excluirRegistro(button.dataset.id));
    })
}

// Função para editar um registro (Update)
async function editarRegistro(id) {
    const nome = prompt("Digite o novo nome");
    const peso = prompt("Digite o novo peso");
    const altura = prompt("Digite a nova altura");

    const imcValor = (peso / Math.pow(altura, 2)).toFixed(2);
    let classificacao = "";
    if (imcValor < 18.5) classificacao = "Abaixo do peso";
    else if (imcValor < 24.9) classificacao = "Peso normal";
    else if (imcValor < 29.9) classificacao = "Sobrepeso";
    else classificacao = "Obesidade";

    const response = await fetch(`/atualizar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            peso,
            altura,
            imc: imcValor,
            classificacao
        })
    });

    if (response.ok) {
        alert('Registro atualizado com sucesso!');
        listarRegistros(); // Atualiza a lista após a edição
    } else {
        alert('Erro ao atualizar o registro.');
    }
}

// Função para excluir um registro (Delete)
async function excluirRegistro(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este registro?");
    if (confirmacao) {
        const response = await fetch(`/excluir/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Registro excluído com sucesso!');
            listarRegistros(); // Atualiza a lista após excluir
        } else {
            alert('Erro ao excluir o registro.');
        }
    }
}

// Chama a função para listar registros ao carregar a página
listarRegistros();
