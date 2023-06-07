function formatDate(dateString) {
  // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
  const date = new Date(dateString);
  
  // Lấy các thành phần ngày, tháng, năm
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  // Tạo chuỗi định dạng dd/mm/yyyy
  const formattedDate = `${padZero(day)}/${padZero(month)}/${year}`;
  
  return formattedDate;
}

function padZero(number) {
  // Thêm số 0 vào đầu nếu số chỉ có một chữ số
  return number < 10 ? `0${number}` : number;
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