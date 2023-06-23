document.addEventListener('DOMContentLoaded', function() {
  var openModalBtn = document.getElementById('open-modal-btn');
  var closeModalBtn = document.getElementsByClassName('close')[0];
  var modal = document.getElementById('feedback-modal');

  // Hiển thị modal khi nhấp vào nút "Gửi phản hồi"
  openModalBtn.addEventListener('click', function() {
    modal.style.display = 'block';
  });

  // Đóng modal khi nhấp vào nút "Đóng" hoặc bên ngoài modal
  closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  // Xử lý sự kiện gửi phản hồi
  var submitFeedbackBtn = document.getElementById('submit-feedback-btn');
  submitFeedbackBtn.addEventListener('click', function() {
    var feedbackText = document.getElementById('feedback-text').value;
    // Thực hiện xử lý gửi phản hồi (có thể là AJAX request tới máy chủ)
    console.log('Feedback:', feedbackText);
    modal.style.display = 'none';
  });
});

const allStar = document.querySelectorAll('.rating .star');
const ratingValue = document.querySelector('.rating input');

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0;
		ratingValue.value = idx + 1;

		allStar.forEach(i=> {
			i.classList.replace('bxs-star', 'bx-star');
			i.classList.remove('active');
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('bx-star', 'bxs-star');
				allStar[i].classList.add('active');
			} else {
				allStar[i].style.setProperty('--i', click);
				click++;
			}
		}
	})
})


const courseIdComment = sessionStorage.getItem("ssIdCourse");
console.log(courseIdComment);
console.log('test js');

function showComment(props) {
  $(".Customer-feedback").append(`
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
  `);
}

function getComment() {
  fetch(`/api/comment/${courseIdComment}`)
    .then((response) => response.json())
    .then((data) => {
      const allComment = data.commentAll;
      allComment.map((comment) => {
        showComment(comment);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

getComment();
var ssIdUser = sessionStorage.getItem("ssIdUser");
console.log(ssIdUser);

window.onload = function () {
  if (ssIdUser != null) {
    document.getElementById("menuLogin").style.display = "none";
    document.getElementById("menuAccount").style.display = "block";
  } else {
    document.getElementById("menuLogin").style.display = "block";
    document.getElementById("menuAccount").style.display = "none";
  }
};

const categoryText = document.getElementById("category");
const text = categoryText.textContent;
const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
categoryText.textContent = capitalizedText;


