import React, {memo} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

import {states} from './data/states'
import useRegisterForm from "../../../hooks/useRegisterForm";

export default function AddressForm() {

    const {
        country,
        setCountry,
        stateIndex,
        setStateIndex,
        city,
        setCity,
        postalCode,
        setPostalCode,
        street,
        setStreet,
        number,
        setNumber,
        observation,
        setObservation
    } = useRegisterForm();

    const Header = memo(() =>{
        return(
            <Typography variant="h6" gutterBottom>
                Endereço
            </Typography>
        )
    },[])

    return (
        <React.Fragment>
            <Header/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={country}
                        required
                        id="country"
                        name="country"
                        label="País"
                        fullWidth
                        onChange={(e) => setCountry(e.target.value)}
                        inputProps={{
                            maxLength: 20,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl style={{width: '100%'}}>
                        <InputLabel id="demo-simple-select-required-label">Estado</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={stateIndex}
                            onChange={(e) => setStateIndex(e.target.value)}
                        >
                            {
                                states.map((state) => <MenuItem value={state}>{state}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={city}
                        required
                        id="city"
                        name="city"
                        label="Cidade"
                        fullWidth
                        onChange={(e) => setCity(e.target.value)}
                        inputProps={{
                            maxLength: 30,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={postalCode}
                        id="postalCode"
                        name="postalCode"
                        label="CEP"
                        fullWidth
                        onChange={(e) => setPostalCode(e.target.value)}
                        inputProps={{
                            maxLength: 10,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={street}
                        required
                        id="street"
                        name="street"
                        label="Rua"
                        fullWidth
                        onChange={(e) => setStreet(e.target.value)}
                        inputProps={{
                            maxLength: 80,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={number}
                        type='number'
                        id="number"
                        name="number"
                        label="Número"
                        fullWidth
                        onChange={(e) => setNumber(e.target.value)}
                        inputProps={{
                            maxLength: 5,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        value={observation}
                        style={{width: '100%'}}
                        id="outlined-multiline-static"
                        label="Complemento"
                        multiline
                        rows={5}
                        variant="outlined"
                        onChange={(e) => setObservation(e.target.value)}
                        inputProps={{
                            maxLength: 200,
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
