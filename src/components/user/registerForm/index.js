import React, {useEffect} from 'react';
import './style.css'

import Cookies from 'js-cookie'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddressForm from './addressForm';
import BasicForm from './basicForm';
import logo from "../../../assets/images/ponto-tel-logo.png";
import TransactionAlert from "../../alert";
import useRegisterForm from "../../../hooks/useRegisterForm";
import {useHistory} from "react-router-dom";
import SomeSpinner from "../../SomeSpinner";
import useAuth from "../../../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Dados Basico', 'Endereço'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <BasicForm />;
        case 1:
            return <AddressForm />;
        default:
            throw new Error('Unknown step');
    }
}

const RegisterForm = () =>  {
    const user_id = Cookies.get('user_id')
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const { openAlert, setOpenAlert, textAlert, typeAlert, getUser, registerUser } = useRegisterForm();
    const { loading, setLoading } = useAuth();

    const history = useHistory()

    useEffect(() => {
        setLoading(true);
        if(user_id){
            setTimeout(() => {
                getUser(user_id);
            },[500])

        }
    },[]);

    if (loading) {
        return (
            <div className='loading'>
                <SomeSpinner/>
            </div>
        )
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar style={{backgroundImage: 'linear-gradient(rgb(44,62,80),rgb(44,62,80))'}}>
                    <Typography className='tool-bar' variant="h6" color="inherit" noWrap>
                        <img onClick={() => history.push('home')} style={{marginTop: '10px'}} src={logo} alt="Logo" />
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        { user_id? 'Atualizar cadastro' : 'Formulario De Cadastro'}
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Voltar
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={activeStep === steps.length - 1 ? registerUser : handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Cadastrar' : 'Próximo'}
                                    </Button>
                                </div>
                            </React.Fragment>
                    </React.Fragment>
                </Paper>
                <TransactionAlert
                    style={{position: 'absolute', top: '25vh', right: '5px', zIndex: '10px'}}
                    open={openAlert}
                    text={textAlert}
                    type={typeAlert}
                    close={(value) => setOpenAlert(value)}
                />
            </main>
        </React.Fragment>
    );
}

export default  RegisterForm;
