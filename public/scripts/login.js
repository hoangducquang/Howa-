function validLogin() {
    var em = document.getElementById('email').value;
    var ps = document.getElementById('password').value;
    var forge = require('node-forge');
    var md = forge.md.sha256.create();
    md.update(ps);
    console.log("Input String: "+ ps);
    console.log("Hash Value: " + md.digest().toHex());
    window.alert("Login success!");
    window.location = "../index.html";
}

/* c43b0549adbbe286604a2f27fc590d662a9b2573f5ede0fa7c8bc1d7ec3a05bc
c43b0549adbbe286604a2f27fc590d662a9b2573f5ede0fa7c8bc1d7ec3a05bc */