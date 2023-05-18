function validChangepassword(){
    var cp=document.getElementById('currentpassword').value;
    var np=document.getElementById('newpassword').value;
    var rp=document.getElementById('renewpassword').value;
    if (np == rp){
        window.alert("Your password has been changed!");
        
    }
    else{
        window.alert("The re-entered password is not the same as the new password! Please try again!");
        return false;
    }
}