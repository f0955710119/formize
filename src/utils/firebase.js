import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

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
  getSignAuth() {
    return getAuth(this.app);
  },
  async createNativeUser(userInfo, signupHandler) {
    try {
      const { email, password } = userInfo;
      const auth = this.getSignAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 拿去做store的user資料結構處理
      signupHandler(userCredential.user.uid);
    } catch (error) {
      console.error(error.message);
    }
  },
  async nativeLogin(userInfo, signinHandler) {
    try {
      const { email, password } = userInfo;
      const auth = this.getSignAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 拿去store找user的資料
      signinHandler(userCredential.user.uid);
    } catch (error) {
      console.error(error.message);
    }
  },
  async checkAuthState() {
    const auth = this.getSignAuth();
    const userInfo = {};
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        userInfo.uid = uid;
      }
    });

    return [unsubscribeAuth, userInfo.uid];
  },
  addUser() {},
};

// user
/*
  從登入那邊拿到uid
  新建立一個用uid當作id的docRef
  用set創建資料
*/
