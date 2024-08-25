import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAuthenticated } from '../login/login.slice';

const useUserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userLoginFunc = async (email, password) => {
    try {
      setIsLoading(true);
      const userLogged = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUserAuthenticated(true));
    } catch (error) {
      console.error('Login error:', error.message);
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    userLoginFunc,
  };
};

export default useUserLogin;
