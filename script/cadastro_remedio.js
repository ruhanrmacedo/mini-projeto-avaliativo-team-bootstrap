function cadastrarRemedio(event) {

    const remedio = {
        id: Math.random(),
        nomeMedicamento: document.getElementById('nome-medicamento').value,
        nomeLaboratorio: document.getElementById('nome-laboratorio').value,
        dataCriacao: new Date().toLocaleDateString(),  
        preco: document.getElementById('preco').value,
        fotoMedicamento: document.getElementById('url-medicamento').value,
        fotoLaboraorio: document.getElementById('url-laboratorio').value,
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
