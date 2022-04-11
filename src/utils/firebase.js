import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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

const singupErrors = [
  {
    case: "auth/email-already-in-use",
    errorMessage: "此帳號已註冊過，請換別的Email嘗試",
  },
  {
    case: "auth/user-not-found",
    errorMessage: "此帳號不存在，請重新輸入再嘗試",
  },
];

const checkSingupErrorCase = (message) => {
  const { errorMessage } = singupErrors.find((err) =>
    message.includes(err.case)
  );
  return errorMessage;
};

export default {
  app: initializeApp(firebaseConfig),
  getDataBase() {
    return getFirestore(this.app);
  },
  getSignAuth() {
    return getAuth(this.app);
  },
  async createNativeUser(userInfo) {
    try {
      const { email, password } = userInfo;
      const auth = this.getSignAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      this.createUser(userCredential.user.uid);
      // 拿去做store的user資料結構處理 signupHandler(userCredential.user.uid);
    } catch (error) {
      const { message } = error;
      const errorMessage = checkSingupErrorCase(message);
      if (!errorMessage) throw new Error(message);
      throw new Error(errorMessage);
    }
  },
  async nativeLogin(userInfo) {
    try {
      const { email, password } = userInfo;
      const auth = this.getSignAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 拿去store找user的資料 signinHandler(userCredential.user.uid);
    } catch (error) {
      const { message } = error;
      console.error(message);
      throw new Error(message);
    }
  },
  nativeSignOut() {
    try {
      const auth = this.getSignAuth();
      signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  },
  checkAuthState(router) {
    const auth = this.getSignAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // BUG: 之後要做待轉登入畫面，利用確認user來決定要直接去admin，還是留在login
        console.log(user.uid);
        router.push("/admin");
        return;
      }
      console.log("未登入狀態");
    });
  },
  async createUser(uid) {
    const db = this.getDataBase();
    const docRef = doc(db, "users", uid);
    await setDoc;
  },
};

// user
/*
  從登入那邊拿到uid
  新建立一個用uid當作id的docRef
  用set創建資料
*/
