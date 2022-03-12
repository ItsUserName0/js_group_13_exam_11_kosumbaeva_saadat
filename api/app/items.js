const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const Item = require('../models/Item');
const auth = require('../middleware/auth');
const path = require("path");
const {promises: fs} = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    if (req.query['category']) {
      const items = await Item.find({category: req.query['category']}).populate('user', '_id').populate('category');
      return res.send(items);
    }
    const items = await Item.find({}, null, {sort: {'_id': -1}}).populate('user', '_id').populate('category');
    return res.send(items);
  } catch (e) {
    return next(e);
  }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    const itemData = {
      user: req.user._id,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
      price: req.body.price,
    };

    const item = new Item(itemData);
    await item.save();

    return res.send(item);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(422).send(e);
    }
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.find({_id: req.params.id}).populate('user', ['displayName', 'phone']).populate('category');
    res.send(item);
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    return res.send({message: 'Item deleted!'});
  } catch (e) {
    return next(e);
  }
})

module.exports = router;