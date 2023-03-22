function validForgot() {
    var em = document.getElementById('email').value;
    if (em == "john@gmail.com") {
        window.alert("Email was sent!");
        window.location = "signup.ejs";
    }
    else {
        window.alert("Send email failed! Please try again!");
        return false;
    }
}