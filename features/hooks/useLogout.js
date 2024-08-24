import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useDispatch } from 'react-redux';
import { setUserAuthenticated } from '../login/login.slice';

const useLogout = () => {
  const dispatch = useDispatch();
  const userLogoutFnc = async () => {
    try {
      await signOut(auth);
      console.log('user signout');
      dispatch(setUserAuthenticated(false));
    } catch (error) {}
  };
  return {
    userLogoutFnc,
  };
};

export default useLogout;
