import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import TransactionsAccordion from './components/transactionsAccordion/TransactionsAccordion';
import TransactionsService from '../../services/TransactionsService';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    padding: '2em',
    display: 'flex',
    justifyContent: 'center'

  },
  progress: {
    margin: theme.spacing(2),
  },
}));
const TransactionsPage = () => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const transactionsResponse = await TransactionsService.getAll();
      setTransactions(transactionsResponse);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            {isLoading ? <CircularProgress className={classes.progress} /> : <TransactionsAccordion transactions={transactions} /> }

        </Grid>);
};

export default TransactionsPage;
