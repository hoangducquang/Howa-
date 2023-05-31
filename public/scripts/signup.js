$(document).ready(() => {
    $('#btnSignup').click(() => {
        $.post('/auth/signup', {
            name: $('#name').val(),
            dob: "05/10/2001",
            email: $('#email').val(),
            phone: '0123456789',
            address: '123 HCM',
            create_at: Date.now(),
            delete_at: Date.now(),
            update_at: Date.now(),
            password: $('#password').val(),
        }, (data) => {
            if(data.result == 1){
                console.log("save ok")
                // window.location.href = "./login"
                console.log(data.err)
            }else{
                console.log("save fail")
            }
        })
    })


});


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

