import React, {createContext, useState, useEffect, useCallback} from 'react';
import Cookies from 'js-cookie';
import api from "../services/api";
import {useHistory} from "react-router-dom";


const AuthContext = createContext({});


export const AuthProvider = ({children}) => {

    const userName = Cookies.get("user_name");
    const userToken = Cookies.get("token");

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const history = useHistory()


    useEffect(() => {
        if (userName && userToken) {
            setUser({name: userName, token: userToken});
            api.defaults.headers.Authorization = `Bearer ${userToken}`;
            history.push('home');
        }
        setLoading(false);
    }, [userToken]);

    const signIn = useCallback(async (user) => {
        setLoading(true);
        console.log("data user", user)
        await api.get(`user/login/?user=${user.user}&password=${user.password}`).then((res) => {
            setLoading(true);
            const data = res.data;
            console.log("data", data);

            Cookies.set('token', data.token);
            Cookies.set('user_name', data.name);
            Cookies.set('user_id', data.id);
            setUser(data);
            api.defaults.headers.Authorization = `Bearer ${data.token}`;


            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            return err.data
        })
    }, []);


    const signOut = useCallback(() => {

        setLoading(true);
        Cookies.remove('user_name')
        Cookies.remove('token')
        Cookies.remove('user_id')
        setUser({});
        setLoading(false);
    }, []);

    const deleteCount = async () => {
        const id = Cookies.get('user_id');
        await api.delete(`user/${id}`).then(() => {
            console.log('user deleted');
            signOut();
            history.go(0)
        }).catch((error) => {
            console.log('error delete user', error);
        });
    }


    return (

        <AuthContext.Provider value={{
            signed: (user && user.name) ? true : false,
            user,
            signIn,
            signOut,
            loading,
            setLoading,
            deleteCount
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
