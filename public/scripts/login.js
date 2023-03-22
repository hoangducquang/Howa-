function validLogin() {
    var un = document.getElementById('username').value;
    var ps = document.getElementById('password').value;
    if (un == "john" && ps == "john@123") {
        window.alert("Login success!");
        window.location = "../index.ejs";
    }
    else {
        window.alert("Login failed! Please try again!");
        return false;
    }
}