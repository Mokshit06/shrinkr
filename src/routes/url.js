const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const ShortUrl = require('../models/ShortUrl');

router.get('/', async (req, res) => {
  try {
    const urls = await ShortUrl.find({}).lean();

    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
  const { fullUrl } = req.body;
  try {
    if (validUrl.isWebUri(fullUrl)) {
      const url = await ShortUrl.create({
        fullUrl,
      });
      res.status(201).json(url);
    } else {
      res.status(400).json({
        message: 'Please enter a valid URL',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get('/:urlID', async (req, res) => {
  const { urlID } = req.params;
  try {
    const url = await ShortUrl.findOne({ urlID }).lean();
    if (!url) return res.status(404).send();
    res.redirect(302, url.fullUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.delete('/:urlID', async (req, res) => {
  const { urlID } = req.params;
  try {
    const url = await ShortUrl.deleteOne({ urlID });
    if (!url) return res.status(404).send();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
