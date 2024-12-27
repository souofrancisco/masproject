// localStorage.removeItem("atual");
// localStorage.removeItem("inacio@gmail.com");
// localStorage.clear()

var atual = localStorage.getItem("atual")
if (!atual) {
    stop();
    window.location.href = "login.html";
} 

document.getElementById("logoutButton").addEventListener("click", function() {

    localStorage.removeItem("atual");
    localStorage.removeItem("carrinho");

    window.location.href = "login.html";
});

