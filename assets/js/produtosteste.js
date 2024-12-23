function getUrlParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const produtos = [
    { Id: 1, Nome: "Produto A", Descricao: "Descrição do Produto A", Preco: 10, Banner: "https://via.placeholder.com/150" },
    { Id: 2, Nome: "Produto B", Descricao: "Descrição do Produto B", Preco: 20, Banner: "https://via.placeholder.com/150" },
    { Id: 3, Nome: "Produto C", Descricao: "Descrição do Produto C", Preco: 30, Banner: "https://via.placeholder.com/150" },
    { Id: 4, Nome: "Produto D", Descricao: "Descrição do Produto D", Preco: 40, Banner: "https://via.placeholder.com/150" },
    { Id: 5, Nome: "Produto E", Descricao: "Descrição do Produto E", Preco: 50, Banner: "https://via.placeholder.com/150" },
    { Id: 6, Nome: "Produto F", Descricao: "Descrição do Produto F", Preco: 60, Banner: "https://via.placeholder.com/150" },
    { Id: 7, Nome: "Produto G", Descricao: "Descrição do Produto G", Preco: 70, Banner: "https://via.placeholder.com/150" },
    { Id: 8, Nome: "Produto H", Descricao: "Descrição do Produto H", Preco: 80, Banner: "https://via.placeholder.com/150" }
];
localStorage.setItem('produtos', JSON.stringify(produtos));

// Função para carregar produtos do localStorage ou de uma fonte padrão

// Definição do ViewModel
function AppViewModel() {
    var self = this;

    // Carrega os produtos do localStorage ou da lista padrão
    self.produtos = produtos;

    // Número de produtos por página
    self.itensPorPagina = 5;

    // Página atual a partir da URL, caso não exista, assume 1
    self.paginaAtual = ko.observable(parseInt(getUrlParameter('page')) || 1);

    // Função para calcular o total de páginas
    self.totalPaginas = ko.computed(function() {
        return Math.ceil(self.produtos.length / self.itensPorPagina);
    });

    // Exibir os produtos da página atual
    self.produtosNaPagina = ko.computed(function() {
        var inicio = (self.paginaAtual() - 1) * self.itensPorPagina;
        var fim = inicio + self.itensPorPagina;
        return self.produtos.slice(inicio, fim);
    });

    // Paginação - Cria os números das páginas dinamicamente
    self.paginas = ko.computed(function() {
        var paginasArray = [];
        for (var i = 1; i <= self.totalPaginas(); i++) {
            paginasArray.push(i);
        }
        return paginasArray;
    });

    // Navegar para a página anterior
    self.paginaAnterior = function() {
        if (self.paginaAtual() > 1) {
            self.paginaAtual(self.paginaAtual() - 1);
            atualizarUrl();
        }
    };

    // Navegar para a próxima página
    self.paginaProxima = function() {
        if (self.paginaAtual() < self.totalPaginas()) {
            self.paginaAtual(self.paginaAtual() + 1);
            atualizarUrl();
        }
    };

    // Ir para uma página específica
    self.irParaPagina = function(pagina) {
        self.paginaAtual(pagina);
        atualizarUrl();
    };

    // Atualiza a URL sem recarregar a página
    function atualizarUrl() {
        var novaUrl = window.location.pathname + '?page=' + self.paginaAtual();
        history.pushState(null, null, novaUrl);
    }
}

// Aplica o Knockout.js
ko.applyBindings(new AppViewModel());