import React from 'react';

import Typography from '@material-ui/core/Typography';
import TransactionPanel from '../transactionPanel/TransactionPanel'
export default function TransactionsAccordion(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { transactions } = props;
  return (
    <div >
      {transactions.map(transaction => <TransactionPanel {...transaction} handleChange={handleChange} expanded={expanded} />)}
      {transactions.length === 0 && <Typography className="empty-message">Sorry, there is no transaction yet</Typography>}
    </div>
  );
}
