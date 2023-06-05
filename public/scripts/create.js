const categoryList = require("../../models/category");

var dropdownHTML = '<select>';
for (var i = 0; i < categoryList.length; i++) {
    var name = categoryList[i].name;
    var value = categoryList[i].code;
    dropdownHTML += '<option value="' + value + '">' + name + '</option>';
}
dropdownHTML += '</select>';
//Load the dynamically created dropdown in container
var container = document.getElementById("dropdown-container");
container.innerHTML = dropdownHTML;

function loaderIcon(){
    document.getElementsByClassName("loader")[0].style.display = "block";
}

var ssIdUser = sessionStorage.getItem('ssIdUser');
console.log(ssIdUser);

window.onload = function() {
        if (ssIdUser != null) {
          document.getElementById("menuLogin").style.display = "none";
          document.getElementById("menuAccount").style.display = "block";
        }else{
          document.getElementById("menuLogin").style.display = "block";
          document.getElementById("menuAccount").style.display = "none";
        }
};
