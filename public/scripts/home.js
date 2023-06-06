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

function changeDate(orderDate){
  const date = new Date(orderDate)

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate()

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
  

