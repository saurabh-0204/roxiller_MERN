
const express = require('express');
const router = express.Router();
const transactionController = require('./transactionController');

router.get('/', transactionController.getAllTransactions);
router.get('/statistics', transactionController.getTransactionStatistics);
router.get('/bar-chart', transactionController.getTransactionsBarChart);

module.exports = router;
