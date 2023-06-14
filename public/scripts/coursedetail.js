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

const categoryText = document.getElementById('category');
const text = categoryText.textContent;
const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
categoryText.textContent = capitalizedText;


