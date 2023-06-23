
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
  
console.log('homejs');

function showComment(props) {
  $('.Customer-feedback').append(`
    <div class="feedback-card">
      <div class="customer-feedback-header">
        <div class="customer-profile">
          <img src="https://photo-cms-tpo.epicdn.me/w890/Uploaded/2023/aohuooh/2014_07_08/annabelle_VGIK.jpg"
            alt="Búp bê ma Annabelle" />
        </div>
        <div>
          <p class="name">${props.name}</p>
        </div>
      </div>
      <div>
        <p class="w3-small">${props.comment}</p>
      </div>
    </div>
  `)
}

function getComment(){
  fetch('/api/comment')
  .then(response => response.json())
  .then(data => {
    const allComment = data.commentAll
    allComment.map(comment => {
      showComment(comment)
    })
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

getComment()
