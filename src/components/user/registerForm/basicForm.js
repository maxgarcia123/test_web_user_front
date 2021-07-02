import React, {memo} from 'react';

import useRegisterForm from '../../../hooks/useRegisterForm';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';



export default function BasicForm() {


    const {
        name,
        setName,
        email,
        setEmail,
        cpf,
        setCpf,
        errorCpf,
        pis,
        setPis,
        password,
        setPassword,
        rePassword,
        setRePassword,
        errorPassword,
    } = useRegisterForm();

    const Header = memo(() =>{
        return(
            <Typography variant="h6" gutterBottom>
                Dados Basicos
            </Typography>
            )
    },[])

    return (
        <React.Fragment>
           <Header/>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <TextField
                        value={name}
                        required
                        id="fullName"
                        name="fullName"
                        label="Nome Completo"
                        fullWidth
                        autoComplete="given-name"
                        onChange={(e) => setName(e.target.value)}
                        inputProps={{
                            maxLength: 90,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={email}
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        inputProps={{
                            maxLength: 90,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={cpf}
                        required
                        id="cpf"
                        name="cpf"
                        label="CPF"
                        fullWidth
                        error={errorCpf}
                        helperText={errorCpf? 'CPF inválido' : ''}
                        onChange={(e) => setCpf(e.target.value)}
                        inputProps={{
                            maxLength: 14,
                        }}
                    />
                </Grid>
                <Grid item xs={12}  sm={6}>
                    <TextField
                        value={pis}
                        required
                        id="pis"
                        name="pis"
                        label="PIS"
                        fullWidth
                        onChange={(e) => setPis(e.target.value)}
                        inputProps={{
                            maxLength: 14,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={password}
                        required
                        id="password"
                        name="password"
                        label="Senha"
                        fullWidth
                        error={errorPassword}
                        helperText={errorPassword? 'senhas nao se coincidem' : ''}
                        onChange={(e) => setPassword(e.target.value)}
                        inputProps={{
                            maxLength: 60,
                            type: 'password'
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={rePassword}
                        required
                        id="rePassword"
                        name="rePassword"
                        label="Confirmar Senha"
                        fullWidth
                        error={errorPassword}
                        helperText={errorPassword? 'senhas nao se coincidem' : ''}
                        onChange={(e) => setRePassword(e.target.value)}
                        inputProps={{
                            maxLength: 60,
                            type: 'password'
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
