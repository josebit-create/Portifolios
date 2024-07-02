
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBoBLmkZID_4FHidkIXgY0-WmGtfyMoWfo",
  authDomain: "miniblog-5729d.firebaseapp.com",
  projectId: "miniblog-5729d",
  storageBucket: "miniblog-5729d.appspot.com",
  messagingSenderId: "709232964616",
  appId: "1:709232964616:web:27dc1c6e16b9dff4960dbd"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}