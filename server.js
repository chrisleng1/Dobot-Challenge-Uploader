const express = require('express');
const multer = require('multer');
const OSS = require('ali-oss');
const path = require('path');

const app = express();
const port = 3000;

// Configure Aliyun OSS
const client = new OSS({
  region: 'your-region', // Replace with your OSS region
  accessKeyId: 'your-access-key-id', // Replace with your access key
  accessKeySecret: 'your-access-key-secret', // Replace with your access key secret
  bucket: 'your-bucket-name' // Replace with your bucket name
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    // Upload to OSS
    const result = await client.put(file.originalname, file.buffer);
    console.log('File uploaded to OSS:', result.url);

    res.send('File uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Upload failed.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});