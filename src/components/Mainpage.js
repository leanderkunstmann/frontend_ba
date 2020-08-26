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
const axios = require('axios');
const cookies = new Cookies();

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
            remote: "",
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
            this.setState({ip:this.state.ip})
        }

    async handleSubmit () {
            console.log(this.state)
            if(this.state.vm ==="" || this.state.remote ===""){
                this.setState({errormsg: "Bitte VM und Protokoll auswählen"})
            }
            else {
            cookies.set('resvm', this.state.vm);
            cookies.set('time', uhrzeit());
            cookies.set('remote', this.state.remote);


                let jsondata =
                    {
                        "apiVersion": "v1",
                        "kind": "Pod",
                        "metadata": {
                            "name": cookies.get('sessioncookie')
                        },
                        "spec": {
                            "containers": [
                                {
                                    "image": "localhost:32000/vboximage",
                                    "name": "vboxcontainer",
                                    "env": [
                                        {
                                            "name": "vmname",
                                            "value": cookies.get('resvm')
                                        },
                                        {
                                            "name": "remote",
                                            "value": cookies.get('remote')
                                        }
                                    ],
                                    "ports": [
                                        {
                                            "containerPort": 3389
                                        }
                                    ],
                                    "securityContext": {
                                        "privileged": true
                                    },
                                    "volumeMounts": [
                                        {
                                            "mountPath": "dev/vboxdrv",
                                            "name": "driver"
                                        },
                                        {
                                            "mountPath": "sys/fs/cgroup",
                                            "name": "cgroup"
                                        },
                                        {
                                            "mountPath": "machines",
                                            "name": "machines"
                                        }
                                    ]
                                }
                            ],
                            "volumes": [
                                {
                                    "name": "driver",
                                    "hostPath": {
                                        "path": "/dev/vboxdrv"
                                    }
                                },
                                {
                                    "name": "cgroup",
                                    "hostPath": {
                                        "path": "/sys/fs/cgroup"
                                    }
                                },
                                {
                                    "name": "machines",
                                    "hostPath": {
                                        "path": "/home/leander/machines"
                                    }
                                }
                            ]
                        }
                    }


            this.setState({loading: true});
                await axios.post(
                    'http://localhost:8080/api/v1/namespaces/default/pods',
                    jsondata,
                    {
                        headers: {'Content-Type':'application/json'}})
            .then(async function (response) {
                await Sleep (10000)
                    console.log(response);
                axios.get('http://localhost:8080/api/v1/namespaces/default/pods/'+cookies.get('sessioncookie'),{
                    headers: {'Content-Type':'application/json'}})
                .then(async function(res)
                {
                    await Sleep(3500)
                    cookies.set('ip', res.data.status.podIP + ":3389");
                    this.setState({ip:res.data.status.podIP})
                    console.log(res);
                                    })
                //et wsurl = 'ws://localhost:8080/api/v1/namespaces/default/pods/'+cookies.get('sessioncookie')+'/exec?command=echo&command=foo&stderr=true&stdout=true'
                    //'command=.%2Frun.sh&stderr=true&stdout=true'
                //"ws://localhost:8080/api/v1/namespaces/default/pods/ehvr4f6m1xqrfgjdvmvz/exec?container=vboxcontainer&stdin=1&stdout=1&stderr=1&tty=1&command=%2Fbin%2Fbash"

                //let sock = new WebSocket(wsurl);
                //sock.onopen = () => {
                    // on connecting, do nothing but log it to the console
                   // console.log('connected'}
                //sock.onclose = function (event) { console.log('close')}



            .catch(function (error) {
                        console.log(error);
                    })
                })
                    .catch(function (error) {
                        console.log(error);
                    })




            await Sleep(3000);
            this.setState({done: true, loading: false,ip: cookies.get('ip')})
            }
            this.setState({ip: this.state.ip})
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
        const data = this.state;
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
                        <VmData time={this.state.time} remote={this.state.remote} vm={this.state.vm} ip={this.state.ip}/>
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