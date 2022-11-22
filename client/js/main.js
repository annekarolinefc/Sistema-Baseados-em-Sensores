/************************** URL DA API DE DADOS***************************/
const url = 'http://localhost:3000/estacoes/'

// CRIA OS ELEMENTOS DA TABELA
const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
const tableContainer = document.querySelector('#tabela');

//CAPTURA O ELEMENTO DE TOTAL
const totalRegistros = document.querySelector('#total-estacoes');

//CABEÇALHO DA TABELA
const CABECALHO = ["ID Estação", "Nome", "Codigo Região",  "UF", "Codigo WMO ISO", "Latitude", "Longitude", "Altitude", "Data da Fundação", "Ações"];

let estacoes = []

//QUANDO A PAGINA É CARREGADA, CRIA-SE A TABELA, CRIA O CABEÇALHO E INCLUI OS DADOS

window.addEventListener('load', function() {
    criarTabela();
    criarCabecalho(CABECALHO);
    carregarDados();
});

//FUNÇÃO PARA CRIAR A TABELA
function criarTabela() {
    thead.setAttribute('id', 'cabecalho-tabela');
    tbody.setAttribute('id', 'corpo-tabela');
    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);   
}

// FUNÇÃO PARA CRIAR O CABEÇALHO
function criarCabecalho(dados) {
    let linha = thead.insertRow(0);
    for (let celula = 0; celula < CABECALHO.length; celula++) {

        let th = document.createElement('th');
        th.textContent = CABECALHO[celula];
        linha.appendChild(th);
    }
    let ths = thead.children[0].childNodes;
    for (let i = 1; i < ths.length; i++) {
        
        if (i == (ths.length - 2)) {
            ths[i].setAttribute('class', 'texto-alinhado-direita');
        } else {
            ths[i].setAttribute('class', 'texto-alinhado-esquerda');
        }
    }    
}

//FUNÇÃO PARA ADICIONAR LINHA 
function adicionarLinhas(dados) {
    for (let i = 0; i < dados.length; i++) {
        let linha = tbody.insertRow();
        linha.setAttribute('id', 'estacao-' + dados[i].id)
        estacoes.push(dados[i])

        let registro = [
            dados[i].id_estacao.toString().padStart(2,  0),
            dados[i].nome_estacao,
            dados[i].cod_regiao,
            dados[i].uf,
            dados[i].codigo_wmo,
            dados[i].latitude,
            dados[i].longitude,
            dados[i].altitude,
            dados[i].data_fundacao
        ]

        //CRIAÇÃO DE UM CAMPO PARA OS BOTÕES
        let celulaOpcoes = document.createElement('td');
        
        //BOTÃO DE VISUALIZAR
        let botaoVer = document.createElement('button');
        botaoVer.setAttribute('type', 'button');
        botaoVer.value = dados[i].id_estacao;
        botaoVer.textContent = "Ver";
        botaoVer.addEventListener('click', function(){
            alert("FUNCAO DE VISUALIZAR A ESTACAO")
        });
        celulaOpcoes.appendChild(botaoVer);

        //BOTÃO EDITAR
        let botaoEditar = document.createElement('button');
        botaoEditar.setAttribute('type', 'button');
        botaoEditar.value = dados[i].id_estacao;
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener('click', function(){
            alert("COLOCAR FUNÇÃO DE EDICAO AQUI")
            console.log(id_estacao);
            // **************** COLOCAR FUNCAO DE EDICAO *****************
        });
        celulaOpcoes.appendChild(botaoEditar);
        
       
        //BOTÃO APAGAR
        let botaoApagar = document.createElement('button');
        botaoApagar.setAttribute('type', 'button');
        botaoApagar.value = dados[i].id_estacao;
        botaoApagar.textContent = "Excluir";
        botaoApagar.addEventListener('click', function(){
            
            let id_estacao = +this.value;
            console.log(id_estacao);

            if (confirm('Tem certeza que deseja excluir este item?')) {
                excluirEstacao(id_estacao);
            }
        });

        celulaOpcoes.appendChild(botaoApagar);
        
        
        for (let j = 0; j < registro.length; j++) {
            
            let celula = linha.insertCell();
            celula.innerText = registro[j];
            celula.setAttribute('title', registro[j])
            
            if (j == 1) {

                celula.addEventListener('click', function() {

                    let id_estacao = this.parentElement.id_estacao.split('-')[1]
                    let estacao = estacoes.find(function(d) { return d.id_estacao == id_estacao; });
        
                    sessionStorage.clear();
                    sessionStorage.setItem("id_estacao", estacao.id_estacao);
                    sessionStorage.setItem("nome_estacao", estacao.nome_estacao );
                    sessionStorage.setItem("cod_regiao", estacao.cod_regiao);
                    sessionStorage.setItem("uf", estacao.uf);
                    sessionStorage.setItem("codigo_wmo", estacao.codigo_wmo);
                    sessionStorage.setItem("latitude", estacao.latitude);
                    sessionStorage.setItem("longitude", estacao.longitude);
                    sessionStorage.setItem("altitude", estacao.altitude);
                    sessionStorage.setItem("data_fundacao", estacao.data_fundacao);
                    window.open("exibir.html","_self")
                });   
            }
            linha.appendChild(celula);
            linha.appendChild(celulaOpcoes)

        } // fim for j
        
    } // fim for i

    document.querySelectorAll('tr td:nth-child(3)').forEach(function(d) {
        d.setAttribute('class', 'texto-alinhado-direita');
    });    
}


//FUNÇÃO PARA EXCLUIR PRODUTO
function excluirEstacao(id_estacao) {
    let indice = estacoes.findIndex(function(d) { return d.id_estacao == id_estacao; });
    estacoes.splice(indice, 1)
    tbody.deleteRow(indice);
}

//FUNÇÃO PARA CARREGAR OS DADOS NA TABELA
function carregarDados() {
    fetch(url)
        .then(function(resposta) { return resposta.json(); })
        .then(function(dados) { 
            
            adicionarLinhas(dados);
            atualizarBarraDeFerramentas(dados)
        
        }).catch(function(erro) {
            console.error("Não foi possível carregar os dados: " + erro.message);
        });

}

function atualizarBarraDeFerramentas(dados) {
    totalRegistros.textContent = dados.length
}

//FUNÇÃO QUE BUSCA POR ID
buscaBtn = document.querySelector('#buscarBtn')
var id_estacao = document.getElementById('buscarBtn').value;

buscaBtn.addEventListener('click', () => {
    alert("INSIRA A FUNÇÃO DE BUSCA");
})

function buscaAeroportoPorIATA(iata){
    if (id_estacao == aeroporto.id_estacao){
        
    }
}

cadastrarBtn = document.querySelector('cadastrarBtn');

cadastrarBtn.addEventListener('click', () => {
    alert('INSIRA A FUNÇÃO DE CADASTRO AQUI');
});

function carregarEstacao() {
    return {
        id_estacao: sessionStorage.getItem("id_estacao"),
        nome_estacao: sessionStorage.getItem("nome_estacao"),
        cod_regiao: sessionStorage.getItem("cod_regiao"),
        uf: sessionStorage.getItem("uf"),
        codigo_wmo: sessionStorage.getItem("codigo_wmo"),
        latitude: sessionStorage.getItem("latitude"),
        longitude: sessionStorage.getItem("longitude"),
        altitude: sessionStorage.getItem("altitude"),
        data_fundacao: sessionStorage.getItem("data_fundacao"),
    }

}