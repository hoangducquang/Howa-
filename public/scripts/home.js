var ssIdUser = sessionStorage.getItem('ssIdUser');
console.log(ssIdUser);

window.onload = function() {
        if (ssIdUser === null) {
          var element = document.getElementById("menuLogin");
          element.style.display = "none";
          var element = document.getElementById("menuAccount");
          element.style.display = "block";
        }else{
          var element = document.getElementById("menuLogin");
          element.style.display = "block";
          var element = document.getElementById("menuAccount");
          element.style.display = "none";
        }
};
      
