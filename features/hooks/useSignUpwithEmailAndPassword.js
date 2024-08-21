import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase/firebase';

import { useState } from 'react';

const useSignUpwithEmailAndPassword = () => {
  const [isLoading, setIsLogin] = useState(false);

  const signUp = async (email, password) => {
    try {
      setIsLogin(true);
      await createUserWithEmailAndPassword(auth, email, password);
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
