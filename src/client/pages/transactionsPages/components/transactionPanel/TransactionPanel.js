import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreditCard from '@material-ui/icons/CreditCard';
import AttachMoney from '@material-ui/icons/AttachMoney';
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
    const { expanded, handleChange, id, amount, type } = props;
    const onChange = (event, isExpanded) => {
        handleChange(id, isExpanded);
    }
    return <ExpansionPanel expanded={expanded === id} onChange={onChange}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading} data-test="amount">{amount}</Typography>
            <Typography className={classes.secondaryHeading} data-test="type">{type}<CreditCard /></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                maximus est, id dignissim quam.
      </Typography>
        </ExpansionPanelDetails>
    </ExpansionPanel>
}

export default TransactionPanel