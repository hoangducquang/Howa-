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
