import React from 'react';

import useAuth from '../../hooks/useAuth';
import './style.css'

import { useHistory } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ButtonColorIcon from "../../components/buttons/buttonColorIcon";
import { green, orange } from '@material-ui/core/colors';
import logo from '../../assets/images/ponto-tel-logo.png';
import Icon from '@material-ui/core/Icon';

const Home = () => {
    const { user, deleteCount, signOut } = useAuth();
    const history = useHistory();

    return (
        <div className='container-home'>
            <ButtonColorIcon
                className='button-delete-count'
                color={orange[500]}
                colorHover={orange[700]}
                endIcon={<Icon>deleteOutline</Icon>}
                onClick={deleteCount}
            >
                Excluir Conta
            </ButtonColorIcon>
            <Container style={{position: 'relative', top:'40%'}}>
                <Grid
                    className='logo-home'
                    spacing={12}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    container
                >
                    <img src={logo} alt="Logo" />
                </Grid>
                <Grid
                    spacing={12}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '15vh' }}
                    container
                >
                    <h1 className='h1-home'>Bem-vindo {user.name}</h1>
                </Grid>
                <Grid
                    alignItems="center"
                    justify="center"
                    container
                >
                    <Grid
                        alignItems="center"
                        justify="center"
                        item
                        sm={2}
                        xs={5}
                    >
                        <Button
                            style={{marginLeft: '25%', left: '30%'}}
                            variant="contained"
                            color="secondary"
                            endIcon={<Icon>logout</Icon>}
                            onClick={signOut}
                        >
                            Sair
                        </Button>
                    </Grid>

                    <Grid
                        item
                        sm={3}
                        xs={7}
                    >
                        <ButtonColorIcon
                            style={{marginLeft: '15%'}}
                            color={green[500]}
                            colorHover={green[700]}
                            endIcon={<Icon>personRounded</Icon>}
                            onClick={() =>  history.push('/registerForm')}
                        >
                            Editar dados
                        </ButtonColorIcon>
                    </Grid>

                </Grid>

            </Container>

        </div>
    );
}

export default Home;
