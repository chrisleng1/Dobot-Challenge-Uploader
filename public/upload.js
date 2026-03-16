document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('fileInput');
  const message = document.getElementById('message');

  if (!fileInput.files[0]) {
    message.textContent = 'Please select a file.';
    return;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      message.textContent = 'Upload successful!';
    } else {
      message.textContent = 'Upload failed.';
    }
  } catch (error) {
    message.textContent = 'Error: ' + error.message;
  }
});