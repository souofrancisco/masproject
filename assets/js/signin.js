if (!localStorage.getItem("inacio@gmail.com")) {
    var d = {Nome:"Inácio",
        Id:0,
        Email:"inacio@gmail.com",
        Password:"aaaa",
        Cargo:"prod",
        Pagamento:[]
    }
    localStorage.setItem("inacio@gmail.com",JSON.stringify(d));
}


function signin () {
    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var confpass = document.getElementById('confpassword');

    var id_uni = localStorage.getItem("useriduniversal");

    if (id_uni) {
        var id = JSON.parse(id_uni);
    } else {
        var id = 1;
    }
    
    if (nome.value.trim().length < 3) {
        alert("O nome tem de ter no mínimo três letras");
    } else if (!/^.{3,}@.{3,}\..{2,}$/.test(email.value.trim())) {
        alert("Por favor insira o email");
    } else if (password.value.length < 4) {
        alert("A password tem de ter no mínimo quatro caracteres!");
    } else if (confpass.value.trim() !== password.value.trim()) {
        alert("A password não é igual nos dois campos!");
    } else {
        conta = {
            Nome: nome.value,
            Id: id,
            Email: email.value,
            Password: password.value,
            Cargo: "user",
            Pagamento: []
        };

        localStorage.setItem("useriduniversal", JSON.stringify(id+1))
        localStorage.setItem(email.value, JSON.stringify(conta));
        localStorage.setItem("atual", JSON.stringify(conta));
        window.location.href = 'perfil.html';
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