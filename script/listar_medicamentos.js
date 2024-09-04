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
        card.style.width = '15rem';
        card.style.border = '1px solid #F5F5F5'; 
        card.style.boxShadow = 'none'; 
        card.innerHTML = `
            <img src="${remedio.fotoMedicamento}" class="card-img-top" alt="${remedio.nomeMedicamento}">
            <div class="card-body" style="padding: 0.5rem;">
                <h5 class="card-title" style="margin-bottom: 0; color: #229799";>${remedio.nomeMedicamento}</h5>
            </div>
            <div class="card-footer p-0" style="border-top: 1px solid #F5F5F5";>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item border-0" style="color: #229799";>${remedio.nomeLaboratorio}</li>
                    <li class="list-group-item border-0 font-weight-bold" style="color: #229799";>R$ ${remedio.preco}</li>
                </ul>
            </div>
        `;

        card.addEventListener('mouseover', function () {
            card.classList.add('shadow-sm', 'bg-light');
        });

        card.addEventListener('mouseout', function () {
            card.classList.remove('shadow-sm', 'bg-light');
        });

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
    allItem.className = 'nav-link text-center rounded-circle';
    allItem.style.width = '8rem';
    allItem.href = '#';
    allItem.innerHTML = `
    <img src="https://media.glassdoor.com/sqll/2818519/clamed-farm%C3%A1cias-squarelogo-1584693174740.png" class="rounded-circle mb-1 border p-2 mb-2" style="width: 5rem; height: 5rem;" alt="Todos">
    <br>
    <span>Todos</span>
    `;
    allItem.style.color = '#48CFCB'; 
    allItem.style.fontWeight = '500';
    allItem.addEventListener('mouseover', function () {
        allItem.style.color = '#229799'; 
    });
    allItem.addEventListener('mouseout', function () {
        allItem.style.color = '#48CFCB';
    });
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
        <img src="${imgUrl}" class="rounded-circle mb-1 border p-2 mb-2" style="width: 5rem; height: 5rem;" alt="${nome}">
        <br>
        <span>${nome}</span>
        `;
        navItem.onclick = function () {
            filtrarPorLaboratorio(nome);
        };

        navItem.style.color = '#48CFCB'; 

        navItem.style.fontWeight = '500';

        navItem.addEventListener('mouseover', function () {
            navItem.style.color = '#229799';
        });
        navItem.addEventListener('mouseout', function () {
            navItem.style.color = '#48CFCB';
        });

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