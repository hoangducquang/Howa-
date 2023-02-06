$(document).ready(() =>{
    $("#btnRegister").click(()=>{
        $.post("./register", {
            name:$("#txtName").val(), 
            email:$("#txtEmail").val(), 
            phoneNumber:$("#txtPhoneNumber").val()
        }, (data)=>{
            console.log(data);
        });
    });
    
});