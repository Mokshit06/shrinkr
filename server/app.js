const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ShortUrl = require('./models/ShortUrl');
const connectDB = require('./db');

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

connectDB();

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public')));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', require('./routes/url'));

app.get('/:urlID', async (req, res) => {
  const { urlID } = req.params;
  try {
    const url = await ShortUrl.findOne({ urlID }).lean();
    if (!url) return res.send();
    res.redirect(302, url.fullUrl);
  } catch (error) {
    console.log('error', error);
    res.status(500).send();
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running on ${PORT}`));
