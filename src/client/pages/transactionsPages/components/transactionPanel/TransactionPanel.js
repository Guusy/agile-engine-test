import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        display: "flex",
        alignItems: "center"
    },
    details: {
        display: 'inherit',
        textAlign: "start"
    },
    amount: {
        marginLeft: "8px"
    }
}));
const TransactionPanel = (props) => {
    const classes = useStyles();
    const { expanded, handleChange, id, amount, type, effectiveDate } = props;
    const onChange = (event, isExpanded) => {
        handleChange(id, isExpanded);
    }
    return <ExpansionPanel key={id} expanded={expanded === id} onChange={onChange}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>{type === "credit" ? <CreditCardIcon /> : <AttachMoneyIcon />}   <span className={classes.amount} data-test="amount">{amount}</span>  </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
        <Typography>
                Id: <span className="id-detail">{id}</span>
            </Typography>
            <br />
            <Typography>
                Amount: <span className="amount-detail">{amount}</span>
            </Typography>
            <br />

            <Typography>
                Type: <span className="type-detail">{type}</span>
            </Typography>
            <br />
            <Typography>
                Effective date: <span className="effective-date">{effectiveDate}</span>
            </Typography>
 
        </ExpansionPanelDetails>
    </ExpansionPanel>
}

export default TransactionPanel