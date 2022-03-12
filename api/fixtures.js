const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require("./config");
const User = require('./models/User');
const Item = require("./models/Item");
const Category = require("./models/Category");

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [User1, User2, User3] = await User.create(
    {
      email: 'user@user',
      password: '123',
      displayName: 'John Doe',
      phone: '+996 555 222 888',
      token: nanoid(),
    },
    {
      email: 'user2@user',
      password: '123',
      displayName: 'Jane Shepard',
      phone: '+996 999 333 777',
      token: nanoid(),
    },
    {
      email: 'user3@user',
      password: '123',
      displayName: 'Isaac',
      phone: '+996 777 222 999',
      token: nanoid(),
    },
  );

  const [Cat1, Cat2, Cat3] = await Category.create(
    {
      category: 'computers',
    },
    {
      category: 'cars',
    },
    {
      category: 'other',
    });

  await Item.create(
    {
      user: User1,
      category: Cat1,
      title: 'User1 item1 title',
      description: 'User1 item1 description.',
      image: 'item1.jpg',
      price: 150,
    },
    {
      user: User1,
      category: Cat2,
      title: 'User1 item2 title',
      description: 'User1 item2 description.',
      image: 'item2.jpeg',
      price: 250,
    },
    {
      user: User1,
      category: Cat3,
      title: 'User1 item3 title',
      description: 'User1 item3 description.',
      image: 'item3.jpeg',
      price: 350,
    },
    {
      user: User2,
      category: Cat1,
      title: 'User2 item1 title',
      description: 'User2 item1 description.',
      image: 'item4.jpg',
      price: 300,
    },
    {
      user: User2,
      category: Cat2,
      title: 'User2 item3 title',
      description: 'User2 item3 description.',
      image: 'item5.jpg',
      price: 250,
    },
    {
      user: User3,
      category: Cat3,
      title: 'User3 item 1 title',
      description: 'User3 item 1 description.',
      image: 'item6.jpg',
      price: 900,
    },);


  await mongoose.connection.close();
};

run().catch(e => console.error(e));