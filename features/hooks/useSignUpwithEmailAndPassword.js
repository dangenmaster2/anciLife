import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase/firebase';

import { useState } from 'react';
import { setUserAuthenticated } from '../login/login.slice';
import { useDispatch } from 'react-redux';

const useSignUpwithEmailAndPassword = () => {
  const [isLoading, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const signUp = async (email, password) => {
    try {
      setIsLogin(true);
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUserAuthenticated(true));
    } catch (error) {
      console.error('Authentication error:', error.message);
      setIsLogin(false);
    }
  };
  return {
    isLoading,
    signUp,
  };
};

export default useSignUpwithEmailAndPassword;
