import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { UserInfoType } from "../types/login";
import { Users, Group } from "../types/firebase/usersType";
import {
  Settings,
  Styles,
  Surveys,
  SurveyInput,
} from "../types/firebase/surveysType";

import {
  QuestionLineText,
  QuestionChoices,
  QuestionMartix,
  QuestionNumber,
  QuestionSlider,
  QuestionOrder,
  QuestionDate,
} from "../types/firebase/questionsType";

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

const signupErrors = [
  {
    case: "auth/email-already-in-use",
    errorMessage: "此帳號已註冊過，請換別的Email嘗試",
  },
  {
    case: "auth/user-not-found",
    errorMessage: "此帳號不存在，請重新輸入再嘗試",
  },
];

const checkSingupErrorCase = (message: string) => {
  const signup = signupErrors.find((err) => message.includes(err.case));
  if (signup !== undefined) {
    return signup.errorMessage;
  }
};

export default {
  app: initializeApp(firebaseConfig),
  getDataBase() {
    return getFirestore(this.app);
  },
  getSignAuth() {
    return getAuth(this.app);
  },
  async createNativeUser(userInfo: UserInfoType) {
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
    } catch (error: any) {
      const { message } = error;
      const errorMessage = checkSingupErrorCase(message);
      if (!errorMessage) throw new Error(message);
      throw new Error(errorMessage);
    }
  },
  async nativeLogin(userInfo: UserInfoType) {
    try {
      const { email, password } = userInfo;
      const auth = this.getSignAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      this.getUser(userCredential.user.uid);
      // 拿去store找user的資料 signinHandler(userCredential.user.uid);
    } catch (error: any) {
      const { message } = error;
      console.error(message);
      throw new Error(message);
    }
  },
  nativeSignOut() {
    try {
      const auth = this.getSignAuth();
      signOut(auth);
    } catch (error: any) {
      console.error(error.message);
    }
  },
  // BUG: router 通常而且之後不會這樣用，先用any帶過
  checkAuthState(router: any) {
    const auth = this.getSignAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // BUG: 之後要做待轉登入畫面，利用確認user來決定要直接去admin，還是留在login
        router.push("/admin");
        return;
      }
      console.log("未登入狀態");
    });
  },
  async createUser(uid: string) {
    const db = this.getDataBase();
    const newUserRef = doc(db, "users", uid);
    const defalutUsers: Users = {
      id: newUserRef.id,
      groups: [
        {
          name: "預設群組",
          surveys: [""],
        },
      ],
    };

    await setDoc(newUserRef, defalutUsers);
  },
  async getUser(uid: string): Promise<void> {
    const db = this.getDataBase();
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  },
  async updateUser(uid: string, groups: Group[]): Promise<void> {
    const db = this.getDataBase();
    const userDocRef = doc(db, "users", uid);
    const updateUser = {
      id: userDocRef.id,
      groups,
    };
    await updateDoc(userDocRef, updateUser);
  },
  async createSurvey(surveyInputs: SurveyInput) {
    const db = this.getDataBase();
    const surveyDocRef = doc(collection(db, "surveys"));
    const { id } = surveyDocRef;
    const survey: Surveys = {
      id,
      title: surveyInputs.title,
      url: surveyInputs.url,
      createdDate: new Date(),
      responsedTimes: 0,
      openTimes: 0,
      settings: surveyInputs.settings,
      styles: surveyInputs.styles,
      questionDocId: surveyInputs.questionDocId,
      responseDocId: surveyInputs.responseDocId,
    };
    await setDoc(surveyDocRef, survey);
  },
  async createQuestions() {},
};

// user
/*
  從登入那邊拿到uid
  新建立一個用uid當作id的docRef
  用set創建資料
*/

/*
生成一個docRef
doc(collection(db, "surveys"));
*/
