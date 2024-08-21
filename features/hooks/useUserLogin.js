import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebase/firebase';

import { useState } from 'react';

const useUserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userLoginFunc = async (email, password) => {
    try {
      console.log(email);
      console.log(password);
      setIsLoading(true);
      const userLogged = await signInWithEmailAndPassword(email, password);
      console.group(userLogged);
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
