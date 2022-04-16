import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  Query,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { UserInfoType } from "../types/login";
import type { Users, Group } from "../types/firebase/usersType";
import type {
  Settings,
  Styles,
  Surveys,
  SurveyInput,
} from "../types/firebase/surveysType";
import type {
  QuestionLineText,
  QuestionChoices,
  QuestionMartix,
  QuestionNumber,
  QuestionSlider,
  QuestionOrder,
  QuestionDate,
  QuestionType,
  Questions,
  Question,
} from "../types/firebase/questionsType";

import { Response, Answer } from "../types/firebase/responsesTpye";

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

const generateId = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const checkSignupErrorCase = (message: string) => {
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
      const errorMessage = checkSignupErrorCase(message);
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
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.uid);
          router.push("/admin");
          return;
        }
        reject(null);
      });
      unsubscribe();
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
      createdTime: new Date(),
      responsedTimes: 0,
      openTimes: 0,
      settings: surveyInputs.settings,
      styles: surveyInputs.styles,
      questionDocId: surveyInputs.questionDocId,
      responseDocId: surveyInputs.responseDocId,
    };
    await setDoc(surveyDocRef, survey);
  },
  async createQuestions(questionsInput: Questions) {
    const db = this.getDataBase();
    const questionDocRef = doc(collection(db, "questions"));
    const { id } = questionDocRef;
    await setDoc(questionDocRef, questionsInput);
    return id;
  },
  async createResponse(reponse: Response) {
    const db = this.getDataBase();
    const responseDocRef = doc(collection(db, "responses"));
    const { id } = responseDocRef;
    await setDoc(responseDocRef, reponse);
    return id;
  },
};
