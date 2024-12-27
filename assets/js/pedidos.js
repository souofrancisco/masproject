function vm () {
    var self = this;
    
    var atual = JSON.parse(localStorage.getItem("atual"))

    var ped = localStorage.getItem("pedidos_user" + atual.Id);
    console.log(ped);
    
    if (ped == "[]") {
        localStorage.removeItem("pedidos_user" + atual.Id);
        location.reload();

    }

    self.pedidos = ko.observableArray(JSON.parse(ped));
    console.log(self.pedidos());
    
    self.removePedido = function(pedido) {
        var index = self.pedidos().indexOf(pedido);
        if (index !== -1) {
            self.pedidos.remove(pedido);  // Remove o pedido da lista visível
            // Atualiza o localStorage
            var updatedPedidos = self.pedidos();
            localStorage.setItem("pedidos_user" + atual.Id, JSON.stringify(updatedPedidos));

            alert("Pedido removido com sucesso.");
        }
    };    
}


$(document).ready(function() {
    ko.applyBindings(new vm());
});

