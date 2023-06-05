const imageInput = document.querySelector('input[name="image"]');
const uploadedImage = document.getElementById('uploaded-image');

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('image', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(publicUrl => {
        uploadedImage.src = publicUrl; // Hiển thị ảnh đã tải lên
      })
      .catch(error => {
        console.error(error);
        alert('Upload failed.');
      });
  }
});