import React from 'react'
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
import logo from "../logo.png"
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import LinearIndeterminate from "./Loading";
import VmData from "./vmdata";
import { Cookies } from 'react-cookie';
import Typography from "@material-ui/core/Typography";

const vmlist =
    [
        'HAL91',
        'Oberon',
        'OpenBSD 6.5 (Fvwm)',
        'OPENSTEP 4.2',
        'OS2 1.30 (Microsoft)',
        'OS2-W4','ReactOS 0.4.9',
        'sol-11_4-vbox',
        'TrueOS 18.12 stable (Mate)',
        'Unix System V R4',
        'Win NT 3.51',
        'Win NT 4 (clean)',
        'WIN3.1 (SND, SVGA, NET)',
        'Xenix 386 2.3.4q',
        'CPM-86 1.1',
        'DilOS',
        'DOS_2.10',
        'DOS_3.30 Win2',
        'DOS_622-Win311',
        'DR_DOS8'
    ];
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
const cookies = new Cookies();
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
    toolbar: {
        background: '#252525'
    },
    errormsg: {
        color: 'red',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        marginBottom: '1em'
    },
    select:{
        width:'100%',
        marginBottom: '2em'
    },
    paper: {
        marginTop:'6em',
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
            loading: false,
            vm: "",
            remote: ""
        };

        this.handleChangeVM = this.handleChangeVM.bind(this);
        this.handleChangeRemote = this.handleChangeRemote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }

        componentDidMount() {
         const cookies = new Cookies();

        let session =  cookies.get('sessioncookie');
        let resvm = cookies.get('resvm');

        if (session === undefined){
            let uservm =  username();
            cookies.set('sessioncookie', uservm);
            this.setState({uservm: uservm})
        }
        else {
            this.setState({uservm: session})}
            console.log(this.state);
            if (resvm !== undefined){
                this.setState({done: true})
            }

        }

    async handleSubmit () {
            console.log(this.state)
            if(this.state.vm ==="" || this.state.remote ===""){
                this.setState({errormsg: "Bitte VM und Protokoll auswählen"})
            }
            else {
            cookies.set('resvm', this.state.vm);
            cookies.set('time', uhrzeit());
            cookies.set('ip', "ip-address");
            cookies.set('remote', this.state.remote);
            this.setState({loading: true});
            await Sleep(3000);
            this.setState({done: true, loading: false})
            }
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
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.title}><img src={logo} width={'120em'} alt={"dynvirt"}/></div>
                       <Typography variant={"button"}>{this.state.uservm}</Typography>
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
                                {vmlist.map((vm, index) =>
                                <MenuItem key={index} value={vm}>{vm}</MenuItem>
                                )}
                            </Select>
                            <FormLabel component="legend">Verbindungsprotokoll</FormLabel>
                            <RadioGroup className={classes.select} aria-label="Remote Protocol" name="remote"
                                        value={this.state.remote} onChange={this.handleChangeRemote}>
                                <FormControlLabel value="RDP" control={<Radio/>} label="Remote Desktop Protocol (RDP)"/>
                                <FormControlLabel value="VNC" control={<Radio/>}
                                                  label="Virtual Network Computing (VNC)"/>
                            </RadioGroup>

                            <Typography className={classes.errormsg}>{this.state.errormsg}</Typography>
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