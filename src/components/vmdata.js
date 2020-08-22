import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Cookies } from 'react-cookie';
import Button from "@material-ui/core/Button";


const styles = props => ({
    cocrPrimary: {
        backgroundColor: 'white',
    },
    element: {
        display: 'flex',
        justifyContent: 'center'
    }
});
const cookies = new Cookies();
function deleteCookies(arr){
    for (let i in arr){
        cookies.remove(i)
    }
}
class VmData extends React.Component {
    // eslint-disable-next-line no-undef
    constructor(props) {

        super(props);
        this.state = {
            session: cookies.get('uservm'),
            vm: cookies.get('resvm'),
            time: cookies.get('time'),
            ip: cookies.get('ip'),
            remote: cookies.get('remote'),
            errorMessage: null,
            successMessage:null

        };
    }


    handleSubmit = event => {
        deleteCookies(cookies.getAll())
        window.location.reload(false);
    };

    render() {

        const {classes} = this.props;
        return (
            <div>
                <br/>
                <Typography style={{display: 'flex', justifyContent: 'center'}} variant="h6" component="h5">
                    Session / Sitzung
                </Typography>
                <Typography style={{display: 'flex', justifyContent: 'center'}} variant="h6" component="h5">
                    {this.state.session}
                </Typography>

                <Grid style={{display: 'flex', justifyContent: 'center'}} container spacing={4}>
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
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Einstellungen</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                            <Button
                                variant="outlined"
                                onClick={this.handleSubmit}>
                                VM herunterfahren & löschen
                            </Button>
                    </AccordionDetails>
                </Accordion>
            </div>

        );
    }
}


export default withStyles(styles)(VmData);

