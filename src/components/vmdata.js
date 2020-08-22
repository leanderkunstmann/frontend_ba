import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";


const styles = props => ({
    cocrPrimary: {
        backgroundColor: 'white',
    },
    barColorPrimary: {
        backgroundColor: '#e20074',
    },
    element: {
        display: 'flex',
        justifyContent: 'center'
    }
});

class VmData extends React.Component {
    // eslint-disable-next-line no-undef

    constructor(props) {
        super(props);
        this.state = {
            session: sessionStorage.getItem('uservm'),
            vm: sessionStorage.getItem('resvm'),
            time: sessionStorage.getItem('time'),
            ip: sessionStorage.getItem('ip'),
            remote: sessionStorage.getItem('remote'),
            errorMessage: null,
            successMessage:null

        };
    }


    handleSubmit = event => {
        sessionStorage.clear();
        window.location.reload(false);
    };

    render() {

        const {classes} = this.props;
        return (
            <div>
                <br/>
                <Typography style={{display: 'flex', justifyContent: 'center'}} variant="h6" component="h4">
                    Session / Sitzung
                </Typography>
                <Typography style={{display: 'flex', justifyContent: 'center'}} variant="h6" component="h4">
                    {this.state.session}
                </Typography>

                <Grid style={{display: 'flex', justifyContent: 'center'}} container spacing={10}>
                    <Grid item xs={12} md={12}>
                        <div className={classes.element}>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary={this.state.vm}
                                        secondary='Virtuelle Maschine'
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={this.state.remote}
                                        secondary='Remoteprotokoll'
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={this.state.time}
                                        secondary='Timestamp'
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={this.state.ip}
                                        secondary='IP-Adresse'
                                    />
                                </ListItem>
                            </List>
                        </div>
                    </Grid>
                </Grid>
                <Typography style={{display: 'flex', justifyContent: 'center'}}>{this.state.errorMessage}{this.state.successMessage}</Typography>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Einstellungen</Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                            <button className={"sm"} onClick={this.handleSubmit}>
                                VM herunterfahren & löschen
                            </button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>

        );
    }
}


export default withStyles(styles)(VmData);

