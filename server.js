const express = require('express');
const multer = require('multer');
const OSS = require('ali-oss');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Configure Aliyun OSS
const client = new OSS({
  region: process.env.OSS_REGION || 'your-region', // Use env var
  accessKeyId: process.env.OSS_ACCESS_KEY_ID || 'your-access-key-id',
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || 'your-access-key-secret',
  bucket: process.env.OSS_BUCKET || 'your-bucket-name'
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