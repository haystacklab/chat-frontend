const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 80;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

app.use(express.json());

// Proxy API calls
app.use('/api', async (req, res) => {
  console.log(BACKEND_URL)
  try {
    const response = await axios({
      method: req.method,
      url: `${BACKEND_URL}${req.path}`,
      data: req.body,
      headers: { 'Content-Type': req.headers['content-type'] },
      params: req.query,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Error'
    });
  }
});

// Serve React build
app.use(express.static(path.join(__dirname, 'build')));
app.get('/{*api}', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));