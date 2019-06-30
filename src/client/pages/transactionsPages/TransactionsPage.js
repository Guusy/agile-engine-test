import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TransactionsAccordion from './components/transactionsAccordion/TransactionsAccordion'
import TransactionsService from '../../services/TransactionsService'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
        padding: "2em"
    },
}));
const TransactionsPage = () => {
    const classes = useStyles();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const transactionsResponse = await TransactionsService.getAll();
            setTransactions(transactionsResponse);
        }
        fetchData();
    }, []);

    return (<Grid container component="main" className={classes.root}>
        <CssBaseline />
        <TransactionsAccordion transactions={transactions} />
    </Grid>)
}

export default TransactionsPage;