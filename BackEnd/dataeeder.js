
const axios = require('axios');
const Transaction = require('../models/Transaction');
const db = require('../config/database');

const seedDatabase = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactionsData = response.data;

    await Transaction.bulkCreate(transactionsData);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    db.close();
  }
};

seedDatabase();
