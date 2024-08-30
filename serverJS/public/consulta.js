document.getElementById("alunoForm").addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        data_nascimento: document.getElementById('data_nascimento').value
    };
    const response = await fetch('/inserir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const result = await response.json();
    document.getElementById('resultado').textContent = JSON.stringify(result, null, 2);
});

document.getElementById('consultaAlunos').addEventListener('click', async function() {
    const response = await fetch ('/consultar');
    const result = await response.json();
    document.getElementById('resultado').textContent = JSON.stringify(result, null, 2);
});