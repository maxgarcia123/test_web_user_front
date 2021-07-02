import { useContext } from 'react';

import RegisterForm from '../contexts/registerForm';

const useRegister = () => {

    const register = useContext(RegisterForm);
    return register
}

export default useRegister;
