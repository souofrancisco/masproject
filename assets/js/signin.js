if (!localStorage.getItem("joao@gmail.com")) {
    var d = {Nome:"joao",
        Id:0,
        Email:"joao@gmail.com",
        Password:"qqqq",
        Pagamento:[]
    }
    localStorage.setItem("joao@gmail.com",JSON.stringify(d));
}


function signin () {
    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var password2 = document.getElementById('password2');

    var id_uni = localStorage.getItem("useriduniversal");

    if (id_uni) {
        var id = JSON.parse(id_uni);
    } else {
        var id = 1;
    }
    
    if (nome.value.trim().length < 3 || /[^a-zA-Z\s]/.test(nome.value)) {
        alert("O nome deve ter no mínimo três letras e não pode conter números ou caracteres especiais.");
    } else if (!/^.{3,}@.{3,}\..{2,}$/.test(email.value.trim())) {
        alert("Por favor insira o email");
    } else if (password.value.length < 4) {
        alert("A password tem de ter no mínimo quatro caracteres!");
    } else if (password2.value.trim() !== password.value.trim()) {
        alert("A password não é igual nos dois campos!");
    } else {
        conta = {
            Id: id,
            Nome: nome.value,
            Email: email.value,
            Password: password.value,
            Pagamento: []
        };

        localStorage.setItem("useriduniversal", JSON.stringify(id+1))
        localStorage.setItem(email.value, JSON.stringify(conta));
        localStorage.setItem("atual", JSON.stringify(conta));
        window.location.href = 'index.html';
    }
}


function login () {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var acc = JSON.parse(localStorage.getItem(email));

 

    if (acc) {
        if (password == acc.Password) {
            localStorage.setItem("atual", JSON.stringify(acc));
            window.location.href = 'index.html';
        }
    }

}