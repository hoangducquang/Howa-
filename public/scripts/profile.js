// Tệp JavaScript
function formatDate(date) {
    // Kiểm tra nếu date không phải là kiểu Date
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    // Lấy ngày, tháng và năm
    var day = date.getDate();
    var month = date.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
    var year = date.getFullYear();

    // Định dạng thành "dd/mm/yyyy"
    var formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}