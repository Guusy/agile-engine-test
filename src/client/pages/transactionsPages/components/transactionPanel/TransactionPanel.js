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
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));
const TransactionPanel = (props) => {
    const classes = useStyles();
    const { expanded, handleChange, id, amount, type, effectiveDate } = props;
    const onChange = (event, isExpanded) => {
        handleChange(id, isExpanded);
    }
    return <ExpansionPanel expanded={expanded === id} onChange={onChange}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading} data-test="amount">${amount}</Typography>
            <Typography className={classes.secondaryHeading} >{type === "credit" ? <CreditCardIcon /> : <AttachMoneyIcon />}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Typography>
                Type: <span className="type-detail">{type}</span>
            </Typography>
            <Typography>
                Effective date: <span className="effective-date">{effectiveDate}</span>
            </Typography>
        </ExpansionPanelDetails>
    </ExpansionPanel>
}

export default TransactionPanel