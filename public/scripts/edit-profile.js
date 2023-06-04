var ssIdUser = sessionStorage.getItem("ssIdUser");
console.log(ssIdUser);

function validEdit_profile(event) {
  event.preventDefault(); // Prevent form submission

  var name = document.getElementById('name').value;
  var address = document.getElementById('address').value;
  var phone = document.getElementById('phone').value;

  if (name && address && phone) {
      fetch(`/account/edit-profile/${ssIdUser}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: name,
              address: address,
              phone: phone,
          })
      })
      .then(response => response.json())
      .then(data => {
          if (data.result === 1) {
              alert(data.err)
              window.location.href = '/account/profile.html';
          } else {
              console.log("fail")
              const errorMessage = document.getElementById('error-message');
              errorMessage.textContent = 'Đăng nhập thất bại: ' + data.err;
          }
      })
      .catch(error => {
          console.log('Lỗi đăng nhập: ' + error);
      });
  } else {
      console.log('Thông tin đăng nhập không hợp lệ');
  }
}


fetch("/api/account/edit-profile/" + ssIdUser)
  .then((response) => response.json())
  .then((data) => {
    // Nhận dữ liệu userCurrent từ server
    const userCurrent = data.userCurrent;
    console.log(userCurrent);
    $("#detail-profile").append(`
          <label for="name"><i class="fa fa-user"></i>&ensp;Full Name</label>
          <input type="text" id="name" name="name" value="${userCurrent.name}" style="background: white">
          <label for="email"><i class="fa fa-envelope"></i>&ensp;Email</label>
          <input type="text" id="email" name="email" value="${userCurrent.email}" readonly>
          <label for="dob"><i class="fa fa-birthday-cake"></i>&ensp;Date of birth</label>
          <input type="text" id="dob" name="dob" value="${userCurrent.dob}" readonly>
          <label for="adr"><i class="fa fa-address-card-o"></i>&ensp;Address</label>
          <input type="text" id="address" name="address" value="${userCurrent.address}" style="background: white">
          <label for="phone"><i class="fa fa-phone"></i>&ensp;Phone</label>
          <input type="text" id="phone" name="phone" value="${userCurrent.phone}" style="background: white">
          <div class="group-button w3-center" style="margin: 5% 0;">
              <button id="btnSave" class="btn btn-save" type="submit" onclick="validEdit_profile(event)">Save</button>
              <a href="/account/profile.html">
                <button class="btn btn-cancel" type="button" style="margin-left: 5%;">Cancel</button></a>
            </div>
        `);
    // Tiếp tục xử lý dữ liệu tại đây
  })
  .catch((error) => {
    console.error("Lỗi khi gọi API: ", error);
    // Xử lý lỗi tại đây
  });



  