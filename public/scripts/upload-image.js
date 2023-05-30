const { Storage } = require('@google-cloud/storage');

// Khởi tạo client của Firebase Storage
const storage = new Storage({
  projectId: 'blockchain-project-5d4d4',
  keyFilename: 'serviceAccountKey.json',
});

// Lấy tham chiếu đến tệp trên Firebase Storage
const fileRef = storage.bucket('blockchain-project-5d4d4.appspot.com').file('fmu3yccvr1f51.png');

// Lấy URL công khai của tệp
fileRef.getSignedUrl({
  action: 'read',
  expires: '03-09-2024', // Ngày hết hạn (có thể để trống hoặc chỉ định ngày hết hạn)
}, (err, url) => {
  if (err) {
    console.error('Lỗi khi lấy URL công khai:', err);
    return;
  }
  console.log('URL công khai:', url);
});
