const mongoose = require('mongoose');
const path = require("path");
const Schema = mongoose.Schema;

const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.apng', '.svg', '.webp'];

const ItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: function (value) {
        const ext = path.extname(value);
        return EXTENSIONS.includes(ext);
      },
      message: 'Image file format is incorrect!'
    }
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: 'Price value is incorrect! The minimum value must be at least 0!',
    },
  },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;