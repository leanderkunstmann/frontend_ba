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
import LinearIndeterminate from "./Loading";
const axios = require('axios');

const vm_info = [
            ['HAL91', 'Username','Passwort','tooltip'],
            ['Oberon', 'Username','Passwort','tooltip'],
            ['OpenBSD 6.5 (Fvwm)','Username','Passwort','tooltip'],
            ['OPENSTEP 4.2','Username','Passwort','tooltip'],
            ['OS2 1.30 (Microsoft)','Username','Passwort','tooltip'],
            ['OS2-W4','ReactOS 0.4.9','Username','Passwort','tooltip'],
            ['sol-11_4-vbox','Username','Passwort','tooltip'],
            ['TrueOS 18.12 stable (Mate)','root','TRUEtoor','tooltip'],
            ['Unix System V R4','Username','Passwort','tooltip'],
            ['Win NT 3.51','Username','Passwort','tooltip'],
            ['Win NT 4 (clean)','Administrator','admin','tooltip'],
            ['WIN3.1 (SND, SVGA, NET)','Administrator','admin','tooltip'],
            ['Xenix 386 2.3.4q','Username','Passwort','tooltip'],
            ['CPM-86 1.1','Username','Passwort','tooltip'],
            ['DilOS','Username','Passwort','tooltip'],
            ['DOS_2.10','Username','Passwort','tooltip'],
            ['DOS_3.30 Win2','Username','Passwort','tooltip'],
            ['DOS_622-Win311','Username','Passwort','tooltip'],
            ['DR_DOS8','Username','Passwort','tooltip'],
        ];

const styles = props => ({
    positive: {
        color: "green",
    },
    negative: {
        color: "red",
    },
    element: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    }
});
const cookies = new Cookies();
function deleteCookies(arr){
    for (let i in arr){
        cookies.remove(i)
    }
}
class VmData extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            session: cookies.get('sessioncookie'),
            vm: cookies.get('resvm'),
            time: cookies.get('time'),
            ip: cookies.get('ip'),
            remote: cookies.get('remote'),
            errorMessage: null,
            successMessage:null,
            uname: "",
            pname: "",
            tooltip: "",
            loading: false

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.remote !== prevProps.remote) {
            this.setState({remote: cookies.get('remote')})
        }
        if (this.state.ip !== prevProps.ip) {
            this.setState({ip: this.props.ip})
        }

    }


    async handleSubmit () {
        await axios.delete('http://localhost:8080/api/v1/namespaces/default/pods/' + this.state.session)
            .then(async (response) => {
                console.log(response)
                deleteCookies(cookies.getAll());
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error.response.status)
                if (error.response.status === 404) {
                    console.log("Pod nicht da")
                    deleteCookies(cookies.getAll());
                    window.location.reload(false);
                    console.log(error);
                }
            } )
            .then()
    }

    componentDidMount() {
    }

    async handleStatus () {
        await axios.get('http://localhost:8080/api/v1/namespaces/default/pods/' + this.state.session)
            .then(async (response) => {
                console.log(response)
                this.setState({successMessage: "Status: Instanz ist online"})
            })
            .catch(function (error) {
                console.log(error)
                this.setState({successMessage: "Status: Instanz ist offline"})
                }
             )
            .then()
    }

    render() {
        let vm_info_specified = []
        for (let i of vm_info) {
            if (i[0] === this.state.vm)
                console.log('match')
            vm_info_specified.push(i[1],i[2],i[3])
        }
        console.log(this.state)
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
                        {this.state.loading ? <LinearIndeterminate/> :
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
                                        primary={vm_info_specified[0] + ' / ' + vm_info_specified[1]}
                                        secondary='Username / Passwort'
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={this.props.ip}
                                        secondary='IP-Adresse'
                                    />
                                </ListItem>
                            </List>
                        </div>
                        }
                    </Grid>
                </Grid>
                <Typography className={classes.negative} style={{display: 'flex', justifyContent: 'center'}}>{this.state.errorMessage}</Typography>
                <Typography className={classes.positive} style={{display: 'flex', justifyContent: 'center'}}>{this.state.successMessage}</Typography>
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Einstellungen</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <div className={classes.element}>
                            <List>
                                <ListItem>

                                    <Button
                                        className={classes.element}
                                        variant="outlined"
                                        onClick={this.handleStatus}>
                                        Status der Instanz prüfen
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        className={classes.element}
                                        variant="outlined"
                                        onClick={this.handleSubmit}>
                                        Virtuelles OS beenden
                                    </Button>
                                </ListItem>
                            </List>
                        </div>

                    </AccordionDetails>
                </Accordion>
            </div>

        );
    }
}


export default withStyles(styles)(VmData);

