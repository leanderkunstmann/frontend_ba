import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    text: {
        textAlign: 'center'
    }
}));

export default function LinearIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LinearProgress />
            <div className={classes.text}>
            <Typography > Virtuelle Maschine wird bereitgestellt </Typography>
            </div>
        </div>
    );
}