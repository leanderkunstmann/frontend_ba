import React from "react";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Helpdrawer from "./helpdrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import LinearIndeterminate from "./Loading";
import VmData from "./vmdata";


function username() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function uhrzeit() {
    let jetzt = new Date(),
        h = jetzt.getHours(),
        m = jetzt.getMinutes(),
        s = jetzt.getSeconds();
    m = fuehrendeNull(m);
    s = fuehrendeNull(s);
    return h + ':' + m + ':' + s;
}

function fuehrendeNull(zahl) {
    zahl = (zahl < 10 ? '0' : '' )+ zahl;
    return zahl;
}

const styles = props  => ({
    main: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: '5em',
    },
    title: {
        flexGrow: 1,
    },
    select:{
        width:'100%',
        marginBottom: '2em'
    },
    paper: {
        marginTop:'10em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: '100em',
        backgroundColor: 'blue',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: '100em',
    },
});

class Mainpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            done: false,
            loading: false
        };

        this.handleChangeVM = this.handleChangeVM.bind(this);
        this.handleChangeRemote = this.handleChangeRemote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     componentWillMount() {
        console.log(sessionStorage.getItem('uservm'));
        let session =  sessionStorage.getItem('uservm');
        let resvm = sessionStorage.getItem('resvm');

        if (session == null){
            let uservm =  username();
            sessionStorage.setItem('uservm', uservm);
            this.setState({uservm: uservm})
        }
        else {
            this.setState({uservm: session})}
            console.log(this.state);
            if (resvm !== null){
                this.setState({done: true})
            }

        }

    componentDidMount () {
        this.setState({uservm: this.state.uservm})
    }

    async handleSubmit () {
        console.log(this.state);
        let today = new Date();
        sessionStorage.setItem('resvm', this.state.vm);
        sessionStorage.setItem('time', uhrzeit());
        sessionStorage.setItem('ip', "ip-address");
        sessionStorage.setItem('remote', this.state.remote);
        this.setState({loading:true});
        await Sleep(3000);
        this.setState({done: true, loading:false})
    }

    handleChangeVM(event) {
        this.setState({vm: event.target.value});
        event.preventDefault();
    }
    handleChangeRemote(event) {
        this.setState({remote: event.target.value});
        event.preventDefault();
    }



    render() {
        const {classes} = this.props;
        return (
            <div className={classes.main}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                           VIRTUAL MUSEUM
                        </Typography>{this.state.uservm}
                    </Toolbar>
                </AppBar>
            <Container component="main" maxWidth="xs" >
                {this.state.loading ?
                    <div className={classes.paper}>
                <LinearIndeterminate/>
                    </div>
                :
                this.state.done ?
                    <div className={classes.paper}>
                        <VmData time={this.state.time} remote={this.state.remote} vm={this.state.vm} ip={"ip-address"}/>
                    </div>
                    :
                    <div className={classes.paper}>
                        <CssBaseline/>
                        <form className={classes.form} noValidate>
                            <FormHelperText>Virtuelle Maschine auswählen</FormHelperText>
                            <Select
                                className={classes.select}
                                id="vm"
                                value={this.state.vm}
                                onChange={this.handleChangeVM}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Xenix"}>Xenix</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormLabel component="legend">Verbindungsprotokoll</FormLabel>
                            <RadioGroup className={classes.select} aria-label="Remote Protocol" name="remote"
                                        value={this.state.remote} onChange={this.handleChangeRemote}>
                                <FormControlLabel value="RDP" control={<Radio/>} label="Remote Desktop Protocol (RDP)"/>
                                <FormControlLabel value="VNC" control={<Radio/>}
                                                  label="Virtual Network Computing (VNC)"/>
                            </RadioGroup>


                            <Button variant="outlined"
                                    className={classes.select}
                                    onClick={this.handleSubmit}
                            >VM Bereitstellen</Button>
                        </form>
                        <Helpdrawer/>
                    </div>
                }
            </Container>
            </div>


        )
    }

}

export default withStyles(styles)(Mainpage);