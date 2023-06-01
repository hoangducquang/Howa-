function validLogin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email && password) {
        // Gửi yêu cầu đăng nhập đến server
        // Ở đây bạn có thể sử dụng AJAX hoặc Fetch API để gửi yêu cầu đăng nhập
        // Ví dụ:
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            // Xử lý kết quả đăng nhập từ server
            if (data.result === 1) {
                window.location.href = '/views/courses/index.ejs';
            } else {
                console.log('Đăng nhập thất bại: ' + data.err);
            }
        })
        .catch(error => {
            // Xử lý lỗi trong quá trình gửi yêu cầu đăng nhập
            console.log('Lỗi đăng nhập: ' + error);
        });
    } else {
        // Hiển thị thông báo lỗi khi thông tin đăng nhập không hợp lệ
        console.log('Thông tin đăng nhập không hợp lệ');
    }

    var forge = require('node-forge');
    var md = forge.md.sha256.create();
    md.update(ps);
    console.log("Input String: "+ ps);
    console.log("Hash Value: " + md.digest().toHex());
    window.alert("Login success!");
    window.location = "../index.html";
}

/* c43b0549adbbe286604a2f27fc590d662a9b2573f5ede0fa7c8bc1d7ec3a05bc
c43b0549adbbe286604a2f27fc590d662a9b2573f5ede0fa7c8bc1d7ec3a05bc */