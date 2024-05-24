
import React, { useState, useEffect } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionStatitics';
import TransactionsBarChart from './components/TransactionsBarCharts';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    axios.get('/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error(error));

    axios.get('/api/transactions/statistics')
      .then(response => setStatistics(response.data))
      .catch(error => console.error(error));

    axios.get('/api/transactions/bar-chart')
      .then(response => setBarChartData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Transactions Table</h1>
      <TransactionsTable transactions={transactions} />
      <h1>Transactions Statistics</h1>
      <TransactionsStatistics statistics={statistics} />
      <h1>Transactions Bar Chart</h1>
      <TransactionsBarChart barChartData={barChartData} />
    </div>
  );
}

export default App;
