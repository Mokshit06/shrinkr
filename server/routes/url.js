const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/ShortUrl');

router.post('/', async (req, res) => {
  const { fullUrl } = req.body;
  try {
    const url = await ShortUrl.create({
      fullUrl,
    });
    res.status(201).json(url);
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
