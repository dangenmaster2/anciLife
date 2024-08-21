import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const useLogout = () => {
  const userLogoutFnc = async () => {
    try {
      await signOut(auth);
      console.log('user signout');
    } catch (error) {}
  };
  return {
    userLogoutFnc,
  };
};

export default useLogout;
