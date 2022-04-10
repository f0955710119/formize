import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzUR4VC0QB0_2TXC2TJRjnzp9XWI02-8Q",
  authDomain: "formize-8c25f.firebaseapp.com",
  projectId: "formize-8c25f",
  storageBucket: "formize-8c25f.appspot.com",
  messagingSenderId: "940853535584",
  appId: "1:940853535584:web:c8ee3f7c616f8d2a373405",
  measurementId: "G-6729PQ8HLK",
};

export default {
  app: initializeApp(firebaseConfig),
  getDataBase() {
    return getFirestore(this.app);
  },
  addUser() {},
};

// user
/*
  從登入那邊拿到uid
  新建立一個用uid當作id的docRef
  用set創建資料
*/
