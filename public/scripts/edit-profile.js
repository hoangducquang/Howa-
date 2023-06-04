var ssIdUser = sessionStorage.getItem("ssIdUser");
console.log(ssIdUser);
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
          <input type="text" id="adr" name="address" value="${userCurrent.address}" style="background: white">
          <label for="phone"><i class="fa fa-phone"></i>&ensp;Phone</label>
          <input type="text" id="phone" name="phone" value="${userCurrent.phone}" style="background: white">
          <div class="group-button w3-center" style="margin: 5% 0;">
              <button class="btn btn-save" type="button">Save</button>
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
