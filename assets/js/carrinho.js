function vm () {
    var self = this;
    
    var carr = localStorage.getItem("carrinho");
    console.log(carr);

    if (!carr) {
        window.location.href = "produtos.html";
        alert("O seu carrinho ainda está vazio!");
        return;
    }
    
    if (carr == "[]") {
        localStorage.removeItem("carrinho");
        location.reload();
    }

    self.carrinho = ko.observable(JSON.parse(carr));

    self.subtotal = ko.computed(function() {
        var total = 0;
        self.carrinho().forEach(function(item) {
            total += item.Preco * item.Qtd; // Subtotal is Price * Quantity
        });
        return total.toFixed(2); // Return subtotal rounded to 2 decimal places
    });
    self.total = parseFloat(self.subtotal());

    self.removeItem = function(item) {
        var index = self.carrinho().indexOf(item);
        if (index !== -1) {
            self.carrinho().splice(index, 1); // Remove item from cart

            console.log(self.carrinho());
            localStorage.setItem("carrinho", JSON.stringify(self.carrinho())); // Save updated cart to localStorage 
            location.reload(); 
        }
    };

    self.updateQuantity = function(item) {
        if (item.Qtd < 1) item.Qtd = 1; // Ensure the quantity is at least 1
        localStorage.setItem("carrinho", JSON.stringify(self.carrinho())); // Save updated cart to localStorage
        location.reload();
        
    };
}


$(document).ready(function() {
    ko.applyBindings(new vm());
});

function redirect () {
    window.location.href = "pagar.html";
}
