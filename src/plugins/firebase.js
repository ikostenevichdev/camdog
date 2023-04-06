
import { initializeApp } from 'firebase/app';
import { getMessaging } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0jo3Qru2PAt1YdzqWO2nK0zHF-pNrpX0",
  authDomain: "camdog-d7b3a.firebaseapp.com",
  projectId: "camdog-d7b3a",
  storageBucket: "camdog-d7b3a.appspot.com",
  messagingSenderId: "750660187575",
  appId: "1:750660187575:web:e4703355ab586144352432",
  measurementId: "G-FN0J60YFGS"
};


export default {
  install: (app, options) => { 
    const firebaseApp = initializeApp(firebaseConfig)
    const messaging = getMessaging(firebaseApp)

    const funcs = {
      $messaging: messaging
    };
    app.config.globalProperties.$firebase = funcs;
    app.provide('$firebase', funcs);
  }
}
