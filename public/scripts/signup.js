function validSignup(){
    var un=document.getElementById('username').value;
    var ps=document.getElementById('password').value;
    var fn=document.getElementById('fname').value;
    var em=document.getElementById('email').value;
    if (un == "john" && ps == "john@123"){
        window.alert("Sign up success!");
        window.location="login.ejs";
    }
    else{
        window.alert("Sign up failed! Please try again!");
        return false;
    }
}