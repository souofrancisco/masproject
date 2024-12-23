        // Função para obter o parâmetro da URL
        function getUrlParameter(name) {
            var urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        function carregarProdutos() {
            // Tenta obter os produtos do localStorage
            var produtosSalvos = localStorage.getItem('produtos');
            if (produtosSalvos) {
                // Se encontrar produtos no localStorage, retorna os produtos parseados
                return JSON.parse(produtosSalvos);
            } else {
                // Se não houver produtos no localStorage, retorna a lista padrão
                var produtosDefault = [
                    { Id: 1, Nome: "Produto A", Descricao: "Descrição do Produto A", Preco: 10, Banner: "https://via.placeholder.com/150", Categoria: "Alimentos" },
                    { Id: 2, Nome: "Produto B", Descricao: "Descrição do Produto B", Preco: 20, Banner: "https://via.placeholder.com/150", Categoria: "Acessórios" },
                    { Id: 3, Nome: "Produto C", Descricao: "Descrição do Produto C", Preco: 30, Banner: "https://via.placeholder.com/150", Categoria: "Saúde" },
                    { Id: 4, Nome: "Produto D", Descricao: "Descrição do Produto D", Preco: 40, Banner: "https://via.placeholder.com/150", Categoria: "Brinquedos" },
                    { Id: 5, Nome: "Produto E", Descricao: "Descrição do Produto E", Preco: 50, Banner: "https://via.placeholder.com/150", Categoria: "Higiene" },
                    { Id: 6, Nome: "Produto F", Descricao: "Descrição do Produto F", Preco: 60, Banner: "https://via.placeholder.com/150", Categoria: "Roupas" },
                    { Id: 7, Nome: "Produto G", Descricao: "Descrição do Produto G", Preco: 70, Banner: "https://via.placeholder.com/150", Categoria: "Alimentos" },
                    { Id: 8, Nome: "Produto H", Descricao: "Descrição do Produto H", Preco: 80, Banner: "https://via.placeholder.com/150", Categoria: "Acessórios" }
                ];
                // Salva os produtos padrão no localStorage
                localStorage.setItem('produtos', JSON.stringify(produtosDefault));
                return produtosDefault;
            }
        }

        // Definição do ViewModel
        function AppViewModel() {
            var self = this;

            // Lista completa de produtos
            self.produtos = ko.observableArray(carregarProdutos());
            self.itensPorPagina = 4;
            self.paginaAtual = ko.observable(parseInt(getUrlParameter('page')) || 1);

            self.categoriaSelecionada = ko.observable("");

            // Função para calcular o total de páginas
            self.totalPaginas = ko.computed(function() {
                return Math.ceil(self.produtos().length / self.itensPorPagina);
            });

            self.produtosFiltrados = ko.computed(function() {
                var categoria = self.categoriaSelecionada();
                var produtos = self.produtos();
                
                if (categoria) {
                    return produtos.filter(function(produto) {
                        return produto.Categoria === categoria;
                    });
                }
                return produtos;
            });

            // Exibir os produtos da página atual
            self.produtosNaPagina = ko.computed(function() {
                var inicio = (self.paginaAtual() - 1) * self.itensPorPagina;
                var fim = inicio + self.itensPorPagina;
                return self.produtosFiltrados().slice(inicio, fim);
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

            console.log("Produtos carregados:", self.produtos());
            console.log("Página atual:", self.paginaAtual());
            console.log("Total de páginas:", self.totalPaginas());
            console.log("Produtos na página atual:", self.produtosNaPagina());
        }

        // Aplica o Knockout.js
        document.addEventListener('DOMContentLoaded', function() {
            ko.applyBindings(new AppViewModel());
        });