import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: `${API_KEY}`,
  authDomain: "ancilife-151f6.firebaseapp.com",
  databaseURL: "https://ancilife-151f6-default-rtdb.firebaseio.com",
  projectId: "ancilife-151f6",
  storageBucket: "ancilife-151f6.appspot.com",
  messagingSenderId: "745131209241",
  appId: `${APP_ID}`
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const fireDb=getFirestore(app);
const storage=getStorage(app);
const database = getDatabase()

export {app,auth,fireDb,storage, collection, getDocs, database}