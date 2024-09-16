import { useEffect } from 'react';
import { db, getDocs, collection } from '../../../firebase/firebase';

const useGetArticles = () => {
  useEffect(() => {
    const colRef = collection(db, 'articles');
    getDocs(colRef).then((snapshot) => {
      let articles = [];
      console.log('docs ', snapshot.docs);
      snapshot.docs.forEach((doc) => {
        console.log('---data ', doc.data());
        // articles.push({...doc.data(), id:doc.id})
      });
    });
  }, []);
};

export default useGetArticles;
