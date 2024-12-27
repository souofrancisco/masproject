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
                    { Id: 1, Qtd: 0, Stock: 3, Nome: "Royal Canin Starter Maxi Mother&Baby, 4kg", Descricao: "A ração Royal Canin Maxi Starter Mother & Babydog é recomendada para a alimentação específica de cachorros de raças grandes durante o desmame e nos primeiros meses de vida.", Preco: 32, Banner: "https://www.tiendanimal.pt/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dwcbf38284/images/pienso_perros_royal%20canin_%20maxi_starter%20mother%20&%20babydog_ROY153336_M_2.jpg?sw=780&sh=780&sm=fit&q=85", Categoria: "Alimentos" },
                    { Id: 2, Qtd: 0, Stock: 2, Nome: "Produto B", Descricao: "Descrição do Produto B", Preco: 20, Banner: "https://via.placeholder.com/150", Categoria: "Acessórios" },
                    { Id: 3, Qtd: 0, Stock: 2, Nome: "Produto C", Descricao: "Descrição do Produto C", Preco: 30, Banner: "https://via.placeholder.com/150", Categoria: "Saúde" },
                    { Id: 4, Qtd: 0, Stock: 2, Nome: "Produto D", Descricao: "Descrição do Produto D", Preco: 40, Banner: "https://via.placeholder.com/150", Categoria: "Brinquedos" },
                    { Id: 5, Qtd: 0, Stock: 2, Nome: "Produto E", Descricao: "Descrição do Produto E", Preco: 50, Banner: "https://via.placeholder.com/150", Categoria: "Higiene" },
                    { Id: 6, Qtd: 0, Stock: 2, Nome: "Produto F", Descricao: "Descrição do Produto F", Preco: 60, Banner: "https://via.placeholder.com/150", Categoria: "Roupas" },
                    { Id: 7, Qtd: 0, Stock: 2, Nome: "Produto G", Descricao: "Descrição do Produto G", Preco: 70, Banner: "https://via.placeholder.com/150", Categoria: "Alimentos" },
                    { Id: 8, Qtd: 0, Stock: 2, Nome: "Produto H", Descricao: "Descrição do Produto H", Preco: 80, Banner: "https://via.placeholder.com/150", Categoria: "Acessórios" }
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

            self.addCarrinho = function(id) {
                let carr = localStorage.getItem("carrinho");
                var item = self.produtos().find((element) => element.Id == id);
            
                if (carr) {
                    var carrinho = JSON.parse(carr);
                    console.log(carrinho);
            
                    var existingItem = carrinho.find(function(ItemInCar) {
                        return ItemInCar.Id === item.Id;
                    });
            
                    // Se o item já existe no carrinho, aumenta a quantidade
                    if (existingItem) {
                        existingItem.Qtd += 1;
                    } else {
                        item.Qtd = 1; 
                        carrinho.push(item);
                    }
            
                    // Salva o carrinho atualizado no localStorage
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));
                } else {
                    // Se não houver carrinho, cria um novo com o item
                    item.Qtd = 1; 
                    var carrinho = [item];
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));
                }
            
                // Exibe o carrinho para depuração
                console.log(JSON.parse(localStorage.getItem("carrinho")));
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