// Função que valida os campos do formulário
function validarFormulario(ids) {
    let valido = true;
    ids.forEach(id => {
        const input = document.getElementById(id);
        if (!input.value) {
            input.classList.add('is-invalid');
            valido = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    return valido;
}

// Função que valida os campos do formulário antes de abrir o modal
function validarAntesDeAbrirModal() {
    const inputsPrincipais = ['nome-medicamento', 'nome-laboratorio', 'preco'];
    if (validarFormulario(inputsPrincipais)) {
        $('#imagemModal').modal('show');
    }
}

function cadastrarRemedio(event) {
    const inputsModal = ['url-medicamento', 'url-laboratorio'];

    // Valida os campos do formulário do modal
    if (!validarFormulario(inputsModal)) {
        return;
    }

    const remedio = {
        id: Math.random(),
        nomeMedicamento: document.getElementById('nome-medicamento').value,
        nomeLaboratorio: document.getElementById('nome-laboratorio').value,
        dataCriacao: new Date().toLocaleDateString(),  
        preco: document.getElementById('preco').value,
        fotoMedicamento: document.getElementById('url-medicamento').value,
        fotoLaboratorio: document.getElementById('url-laboratorio').value,
    };

    let remedios = JSON.parse(localStorage.getItem('remedios')) || [];
    
    remedios.push(remedio);
    
    localStorage.setItem('remedios', JSON.stringify(remedios));
    
    $('#imagemModal').modal('hide')

    document.getElementById('medicamento-form').reset();
    document.getElementById('url-medicamento').value = '';
    document.getElementById('url-laboratorio').value = '';
}

document.getElementById('salvarImagens').addEventListener('click', cadastrarRemedio);
