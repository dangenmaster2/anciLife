import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useGetUserByArticle = () => {
  const getUserByArticle = async () => {
    try {
      const q = query(
        collection(firestore, 'articles'),
        where('articles', '==', articles)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
    } catch (error) {}
  };
  getUserByArticle();
};

export default useGetUserByArticle;
