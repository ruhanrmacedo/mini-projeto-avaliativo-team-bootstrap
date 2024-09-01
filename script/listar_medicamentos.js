function listarMedicamentos(filtroLaboratorio = null) {
    let remedios = JSON.parse(localStorage.getItem('remedios')) || [];

    const listarMedicamentos = document.getElementById('lista-medicamentos');
    listarMedicamentos.innerHTML = '';

    const remediosFiltrados = filtroLaboratorio
        ? remedios.filter(remedio => remedio.nomeLaboratorio === filtroLaboratorio)
        : remedios;

    remediosFiltrados.forEach((remedio) => {
        const card = document.createElement('div');
        card.className = 'card text-center mb-3';
        card.style.width = '18rem';
        card.innerHTML = `
            <img src="${remedio.fotoMedicamento}" class="card-img-top" alt="${remedio.nomeMedicamento}">
            <div class="card-body">
                <h5 class="card-title">${remedio.nomeMedicamento}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${remedio.nomeLaboratorio}</li>
                <li class="list-group-item">R$ ${remedio.preco}</li>
            </ul>
            `;
        listarMedicamentos.appendChild(card);
    });
}

function listarLaboratorios() {
    let remedios = JSON.parse(localStorage.getItem('remedios')) || [];
    let laboratorios = {};

    remedios.forEach(remedio => {
        if (!laboratorios[remedio.nomeLaboratorio]) {
            laboratorios[remedio.nomeLaboratorio] = remedio.fotoLaboratorio;
        }
    });

    const navLaboratorios = document.getElementById('nav-laboratorios');
    navLaboratorios.innerHTML = '';

    // Item para listar todos os medicamentos
    const allItem = document.createElement('a');
    allItem.className = 'nav-link text-center';
    allItem.style.width = '8rem';
    allItem.href = '#';
    allItem.innerHTML = `
    <img src="https://media.glassdoor.com/sqll/2818519/clamed-farm%C3%A1cias-squarelogo-1584693174740.png" class="rounded-circle mb-1" style="width: 5rem; height: 5rem;" alt="Todos">
    <br>
    <span>Todos</span>
    `;
    allItem.onclick = function () {
        listarMedicamentos();
    };
    navLaboratorios.appendChild(allItem);

    // Lista os laboratórios existentes
    for (let nome in laboratorios) {
        const navItem = document.createElement('a');
        navItem.className = 'nav-link text-center';
        navItem.style.width = '8rem';
        navItem.href = '#';


        const imgUrl = laboratorios[nome] ? laboratorios[nome] : 'https://media.glassdoor.com/sqll/2818519/clamed-farm%C3%A1cias-squarelogo-1584693174740.png';

        navItem.innerHTML = `
        <img src="${imgUrl}" class="rounded-circle mb-1" style="width: 5rem; height: 5rem;" alt="${nome}">
        <br>
        <span>${nome}</span>
        `;
        navItem.onclick = function () {
            filtrarPorLaboratorio(nome);
        };

        navLaboratorios.appendChild(navItem);
    }
}

function filtrarPorLaboratorio(laboratorio) {
    listarMedicamentos(laboratorio);
}

window.onload = function () {
    listarMedicamentos();
    listarLaboratorios();
};

document.getElementById('salvarImagens').addEventListener('click', () => {
    cadastrarRemedio();
    listarMedicamentos();
    listarLaboratorios();
});