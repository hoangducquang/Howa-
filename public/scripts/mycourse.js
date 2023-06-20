function changeDate(orderDate){
    const date = new Date(orderDate)

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate()

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
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


function pagination(getCourseAll) {
  const pageElement = 3
  const totalPage = Math.ceil(getCourseAll.length / pageElement)
  var currentPage = 1
  var activeLink = null
  
  function displayInfo(num){
    const container = document.getElementById('tblistCourse')
    container.innerHTML = ''
  
    const startPage = (num - 1) * pageElement
    const endPage = Math.min(startPage + pageElement, getCourseAll.length)
    
    $('#tblistCourse').empty();
    

    for(let i = startPage; i < endPage; i++)
    {
      const course = getCourseAll[i]
      $("#tblistCourse").append(`
        <div class="category-course-card">
          <a href="/courses/detail/${course._id}" style="text-decoration: none;">
            <div class="course-image">
              <img src="${course.image}" alt="${course.name}" />
              <div class="course-short-details">
                <p class="cate-name">${course.categories_id}</p>
                <h4 style="text-overflow:ellipsis; overflow: hidden; font-weight: bold; line-height: normal;">${course.name}</h4>
                <p class="w3-small">${course.lectures_id}</p>
                <div class="price-course">
                  <span class="new-price">${course.price.toLocaleString("en-US")} ETH</span>
                </div>
                <p class="duration">${changeDate(course.start_date)} - ${changeDate(course.end_date)}</p>
              </div>
            </div>
          </a>
        </div>
      `);
    }
  }
  function displayPagination() {
    const paginationContainer = document.querySelectorAll('.pagination.pag-center a');

    // Previous
    const preLink = document.createElement('a')
    preLink.href = '#'
    preLink.textContent = '\u00AB'
    preLink.addEventListener('click', () => {
      if(currentPage > 1){
        $('.pagination.pag-center a').removeClass()
        currentPage--
        displayInfo(currentPage);
        // link.className = 'active'
        const pageLinks = document.querySelectorAll('.pagination.pag-center a');
        pageLinks[currentPage].classList.add('active')
        // console.log(currentPage);
      }
    })
    
    $('.pagination.pag-center').append(preLink);
  
    // Page
    for (let i = 1; i <= totalPage; i++) {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = i;
      if (i === currentPage) {
        link.classList.add("active");
        
      }
      // if(i == 1){
      //   link.className = 'active'
      //   activeLink = link
      // }
      link.addEventListener('click', () => {
        currentPage = i
        $('.pagination.pag-center a').removeClass()
        displayInfo(i);
        link.className = 'active'
        // activeLink = link
        // console.log(i);
      });
      $('.pagination.pag-center').append(link);
    }

    // Next
    const next = document.createElement('a')
    next.href = '#'
    next.textContent = '\u00BB'
    next.addEventListener('click', () => {
      if(currentPage < totalPage){
        $('.pagination.pag-center a').removeClass()
        currentPage++
        displayInfo(currentPage)
        const pageLinks = document.querySelectorAll('.pagination.pag-center a');
        pageLinks[currentPage].classList.add('active')
        console.log(currentPage);
      }
      
    })
    $('.pagination.pag-center').append(next);
  }
  // console.log(totalPage)

  displayInfo(1)
  displayPagination()
}


