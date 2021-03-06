import React from "react";
import vm_info from "./vm_info";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Cookies } from 'react-cookie';
import Button from "@material-ui/core/Button";
import LinearIndeterminate from "./functions/Loading";
import Clock from "./functions/clock";
const axios = require('axios');



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

// Löschen der VM wird provisionert
    async handleSubmit () {
        await axios.delete('http://localhost:8080/apis/apps/v1/namespaces/default/deployments/' + this.state.session)
            .then(async (response) => {
                await axios.delete('http://localhost:8080/api/v1/namespaces/default/services/' + this.state.session +"-service")
                    .then(async (response) => {
                        deleteCookies(cookies.getAll());
                        window.location.reload(false);
                    })
                    .catch(function (error) {
                      try {
                        if (error.response.status === 404) {
                            deleteCookies(cookies.getAll());
                            window.location.reload(false);
                            console.log(error);
                        }
                        else{
                            this.setState({errorMessage: 'Es ist etwas schiefgelaufen'})
                        }

                      } catch (e) {

                      }

                    })
                await axios.delete('http://localhost:8080/api/v1/namespaces/default/services/' + this.state.session +"-service-remote")
                    .then(async (response) => {
                        deleteCookies(cookies.getAll());
                        window.location.reload(false);
                    })
                    .catch(function (error) {
                      try {
                        if (error.response.status === 404) {
                            deleteCookies(cookies.getAll());
                            window.location.reload(false);
                            console.log(error);
                        }
                        else{
                            this.setState({errorMessage: 'Es ist etwas schiefgelaufen'})
                        }

                      } catch (e) {

                      }
                    })
            })
            .catch(function (error) {
              try {
                if (error.response.status === 404) {
                    deleteCookies(cookies.getAll());
                    window.location.reload(false);
                    console.log(error);
                }
                else{
                    this.setState({errorMessage: 'Es ist etwas schiefgelaufen'})
                }

              } catch (e) {

              } 
                })
            }

//Statuscheck
    async handleStatus () {
         axios.get('http://localhost:8080/apis/apps/v1/namespaces/default/deployments/' + this.state.session)
            .then(async (response) => {
                this.setState({successMessage: "Status: Instanz ist online"})
            })
            .catch(async (error) => {
                this.setState({errorMessage: "Status: Instanz ist offline"})
                }
            )
    }

    render() {
        let vm_info_specified = []
        for (let i of vm_info) {
            if (i[0] === this.state.vm)
            {
                console.log('match')
            vm_info_specified.push(i[1],i[2],i[3])
            }
        }
        console.log(this.state)
        const {classes} = this.props;
        return (

            <div>
                <br/>
                <Typography style={{display: 'flex', justifyContent: 'center'}} variant="h6" component="h5">
                    {this.state.session}
                </Typography>
                <Clock style={{display: 'flex', justifyContent: 'center'}}/>

                <Grid style={{display: 'flex', justifyContent: 'center'}}  container spacing={5}>
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

                                <div>
                                    {this.state.remote === "VNC (Password = secret)"
                                        ?
                                        <div>
                                            <ListItem>
                                                <ListItemText
                                                    primary={<a href={"http://localhost:"+ cookies.get('port_vnc')+"/vnc.html" } target="_blank" rel="noopener noreferrer">{"http://localhost:"+ cookies.get('port_vnc')+"/vnc.html" }</a>}
                                                    secondary={'VNC-Webzugriff'}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary={"http://localhost:"+ cookies.get('ip')}
                                                    secondary={'VNC-Fernzugriff'}
                                                />
                                            </ListItem>
                                        </div>
                                        :
                                        <ListItem>
                                            <ListItemText
                                                primary={"http://localhost:"+ cookies.get('ip')}
                                                secondary='RDP-Fernzugriff'
                                            />
                                        </ListItem>
                                    }
                                </div>



                            </List>
                        </div>
                        }
                    </Grid>
                </Grid>
                <Typography className={classes.negative} style={{display: 'flex', justifyContent: 'center'}}>{this.state.errorMessage}</Typography>
                <Typography className={classes.positive} style={{display: 'flex', justifyContent: 'center'}}>{this.state.successMessage}</Typography>

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
            </div>

        );
    }
}


export default withStyles(styles)(VmData);
