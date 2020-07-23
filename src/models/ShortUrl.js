const mongoose = require('mongoose');
const shortid = require('shortid');
const dotenv = require('dotenv');

dotenv.config();

const urlCode = shortid.generate;
console.log(urlCode);

const ShortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
    trim: true,
  },
  urlID: {
    type: String,
    default: urlCode,
  },
  shortUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

ShortUrlSchema.pre('save', function (next) {
  const url = this;
  url.shortUrl = `${process.env.MAIN_URL}/${url.urlID}`;

  next();
});

const ShortUrl = mongoose.model('ShortUrl', ShortUrlSchema);

module.exports = ShortUrl;
