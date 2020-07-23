const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const ShortUrl = require('./models/ShortUrl');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected on ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/', require('./routes/url'));

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
