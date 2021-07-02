import React, { useState} from 'react';

import { Redirect } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import SomeSpinner from '../../components/SomeSpinner';

import SignInForm from "../../components/user/signIn";

const SignIn = () => {

    const  [user, setUser] = useState("")
    const  [password, setPassword] = useState("")
    const { signed, signIn, loading } = useAuth();

    const handleSignIn = ()=> {
        const login = {
            user: user,
            password: password
        }
        console.log("dapa api", login)
        signIn(login);
    }


    if (loading) {
        return (
            <div className='loading'>
                <SomeSpinner/>
            </div>
        )
    }


    return (

        <div>
            { signed ? (
                <Redirect to='./home' />
            ) : (
                <>
                    <SignInForm
                      setUser={(value) => setUser(value)}
                      setPassword={(value) => setPassword(value)}
                      singIn={handleSignIn}
                    />
                </>
            )}
        </div>
    );
}
export default SignIn;
