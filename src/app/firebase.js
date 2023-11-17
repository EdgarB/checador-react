// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes
} from "firebase/storage";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc
} from "firebase/firestore"

// Your web app's Firebase configuration
console.log('REACT APP ID ', process.env.REACT_APP_FIREBASE_APP_ID)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);



export const getPersons = async ()=> {
  try{
    const persons = {}
    const collectionRef = collection(db, 'persons')
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach(doc=>{
      const person = {...doc.data()}
      person.id = doc.id
      persons[doc.id] = person
    })

    return persons;
  }catch(error){
    console.error(error)
  }
}

export const createOrUpdateLog = async (log) => {
  try {
    const logsRef = collection(db, 'logs');
    await setDoc(doc(logsRef, log.id), log);
    return log;
  }catch(error) {
    console.error(error)
  }
}

export const getLogs = async () => {
  try {
    const logs = {};
    const collectionRef = collection(db, 'logs')
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach(doc => {
      const log = {...doc.data()}
      log.id = doc.id;
      logs[doc.id] = log
    });
    return logs;

  }catch(error){
    console.error(error)
  }
}

export const getPersonLogs = async (personId) =>{
  try{
    const logs = {}
    const collectionRef = collection(db, 'logs')
    const q = query(collectionRef, where('personId', '==', personId))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      const log = {...doc.data()}
      log.id = doc.id;
      logs[doc.id] = log
    });

    return logs;
  }catch(error){
    console.error(error);
  }
}