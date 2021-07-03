import React, { createContext, useState, useEffect} from 'react';
import api from "../services/api";
import {checkCpf} from "../utils/checkCpf";
import {maskCpf, maskPostalCode} from "../utils/putMask";

import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";



const RegisterFormContext = createContext({});


export const RegisterFormProvider = ({ children }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [errorCpf,setErrorCpf] = useState(false);
    const [pis, setPis] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorPassword,setErrorPassword] = useState(false);
    const [country, setCountry] = useState('');
    const [stateIndex, setStateIndex] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [observation, setObservation] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [textAlert, setTextAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState('info');

    const user_id = Cookies.get('user_id');
    const { setLoading } = useAuth();

    useEffect(() => {
        if(cpf.length === 11 || cpf.length === 14){
            setCpf(maskCpf(cpf));
            if(!checkCpf(cpf)){
                setErrorCpf(true);
            }
        }else {
            if(cpf.length < 14) setErrorCpf(false);
        }
        if(rePassword.length > 3 && password !== rePassword){
            setErrorPassword(true);
        }else if(password === rePassword || rePassword.length === 0){
            setErrorPassword(false);
        }if(postalCode.length === 8 ){
            console.log('cep',maskPostalCode(postalCode));
            setPostalCode(maskPostalCode(postalCode));
        }
    }, [cpf,postalCode, rePassword])

    const registerUser = async () => {
        const data = {
            id: user_id,
            name,
            email,
            pis,
            password,
            address:{
                user_id : 0,
                country,
                state: stateIndex,
                city,
                number,
                postalCode,
                observation,
                openAlert
            }
        }
        if(errorCpf){
            setTextAlert('CPF Inválido');
            setOpenAlert(true);
            return setTimeout(() => {
                setOpenAlert(false);
            }, [2000])
        }
        if(errorPassword){
            setTypeAlert('error');
            setTextAlert('Senha Inválida');
            setOpenAlert(true);
            return setTimeout(() => {
                setOpenAlert(false);
            }, [2000])
        }
        if(!errorCpf && !errorPassword && !user_id){
            await api.post('/user',data).then((res) => {
                let data = res.data;
                Cookies.set('token', data.token);
                Cookies.set('user_name', data.name);
                Cookies.set('user_id', data.id);

            }).catch((err) => {
                console.log('register error');
                setTypeAlert('error');
                setTextAlert('Erro ao realizar o cadastro');
                setOpenAlert(true);
                return setTimeout(() => {
                    setOpenAlert(false);
                }, [3500]);
            })
        }else if(!errorCpf && !errorPassword && !!user_id){
            await api.put('/user',data).then((res) => {
                let data = res.data;
                setTypeAlert('success');
                setTextAlert('Dados atualizados com sucesso');
                setOpenAlert(true);
                Cookies.set('token', data.token);
                Cookies.set('user_name', data.name);
                setName(res.data.name)
                return setTimeout(() => {
                    setOpenAlert(false);

                }, [2000]);
            }).catch((err) => {
                console.log('register error');
                setTypeAlert('error');
                setTextAlert('Erro ao atualizar o cadastro');
                setOpenAlert(true);
                return setTimeout(() => {
                    setOpenAlert(false);
                }, [2000]);
            })
        }
    }

    const getUser = async (id) => {
        api.get(`user?id=${id}`).then((res) => {
            const data = res.data;
            setName(data.name);
            setEmail(data.email);
            setCpf(data.cpf);
            setPis(data.pis);
            setCountry(data.address.country);
            setStateIndex(data.address.state);
            setCity(data.address.city);
            setStreet(data.address.street);
            setNumber(data.address.number);
            setPostalCode(data.address.postal_code);
            setObservation(data.address.observation);
            setLoading(false)
        }).catch(() => {
            setTypeAlert('error');
            setTextAlert('Não foi possivel buscar seus dados de cadastro');
            setOpenAlert(true);
            setLoading(false)
            return setTimeout(() => {
                setOpenAlert(false);
            }, [4000]);
        });
    };



    return (

        <RegisterFormContext.Provider value={{
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
            setObservation,
            openAlert,
            setOpenAlert,
            textAlert,
            typeAlert,
            getUser,
            registerUser: registerUser
        }}>
            { children }
        </RegisterFormContext.Provider>
    )
}


export default RegisterFormContext ;
