
const db = require('./database');
const Transaction = require('./transaction');

exports.getAllTransactions = (req, res) => {
  Transaction.findAll()
    .then(transactions => res.json(transactions))
    .catch(err => console.error(err));
};

exports.getTransactionStatistics = (req, res) => {
  const month = req.query.month; 
  Transaction.findAll({
    where: {
      dateOfSale: {
        [Op.between]: [`${month}-01`, `${month}-31`]
      }
    }
  })
  .then(transactions => {
    const totalSaleAmount = transactions.reduce((acc, curr) => acc + curr.price, 0);
    const totalSoldItems = transactions.length;
    const totalNotSoldItems = 0;
    res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
  })
  .catch(err => console.error(err));
};

exports.getTransactionsBarChart = (req, res) => {
  const month = req.query.month; 

  Transaction.findAll({
    where: {
      dateOfSale: {
        [Op.between]: [`${month}-01`, `${month}-31`]
      }
    }
  })
  .then(transactions => {
    const priceRanges = {
      '0 - 100': 0,
      '101 - 200': 0,
      '201 - 300': 0,
      '301 - 400': 0,
      '401 - 500': 0,
      '501 - 600': 0,
      '601 - 700': 0,
      '701 - 800': 0,
      '801 - 900': 0,
      '901-above': 0
    };

    transactions.forEach(transaction => {
      const price = transaction.price;
      if (price <= 100) priceRanges['0 - 100']++;
      else if (price <= 200) priceRanges['101 - 200']++;
      else if (price <= 300) priceRanges['201 - 300']++;
      else if (price <= 400) priceRanges['301 - 400']++;
      else if (price <= 500) priceRanges['401 - 500']++;
      else if (price <= 600) priceRanges['501 - 600']++;
      else if (price <= 700) priceRanges['601 - 700']++;
      else if (price <= 800) priceRanges['701 - 800']++;
      else if (price <= 900) priceRanges['801 - 900']++;
      else priceRanges['901-above']++;
    });

    const barChartData = Object.keys(priceRanges).map(range => ({
      priceRange: range,
      numberOfItems: priceRanges[range]
    }));

    res.json(barChartData);
  })
  .catch(err => console.error(err));
};
