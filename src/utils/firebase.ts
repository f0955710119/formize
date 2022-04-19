import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  Query,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

import type { DocumentReference, DocumentData } from "firebase/firestore";
import type { StorageReference } from "firebase/storage";
import type { UserInfoType } from "../types/login";
import type { Users } from "../types/firebase/usersType";
import type { Surveys } from "../types/survey";
import type { Questions } from "../types/question";

import helper from "./helper";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
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

const checkSignupErrorCase = (message: string) => {
  const signup = signupErrors.find((err) => message.includes(err.case));
  if (signup !== undefined) {
    return signup.errorMessage;
  }
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export default {
  async createNativeUser(userInfo: UserInfoType) {
    try {
      const { email, password } = userInfo;

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
      signOut(auth);
    } catch (error: any) {
      console.error(error.message);
    }
  },
  checkAuthState() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.uid);
          return;
        }
        reject(null);
      });
      unsubscribe();
    });
  },
  // FOR_USER
  async createUser(uid: string) {
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
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  },
  async updateUserGroupsIdArray(
    uid: string,
    groupId: string,
    isAddNewGroup: boolean
  ) {
    const userDocRef = doc(db, "users", uid);
    await setDoc(
      userDocRef,
      { groupId: isAddNewGroup ? arrayUnion(groupId) : arrayRemove(groupId) },
      { merge: true }
    );
  },
  // FOR_GENERAL
  generateDocRef(collectionName: string) {
    const id = helper.generateId(8);
    const docRef = doc(db, collectionName, id);
    return docRef;
  },
  async setNewDoc<T extends Surveys | Questions | { exists: boolean }>(
    docRef: DocumentReference<DocumentData>,
    data: T
  ) {
    try {
      await setDoc(docRef, data);
      return "成功發送資料";
    } catch (error: any) {
      throw error.message;
    }
  },
  async getDocData(collectionName: string, docId: string) {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw "沒有找到文件，確認一下拼字跟帶入的值";
    return docSnap.data();
  },
  async updateFieldArrayValue<T extends string>(
    {
      docPath,
      fieldKey,
      updateData,
    }: { docPath: string; fieldKey: string; updateData: T },
    isAddNewValue: boolean = true
  ) {
    const docRef = doc(db, docPath);
    try {
      await setDoc(
        docRef,
        {
          [fieldKey]: isAddNewValue
            ? arrayUnion(updateData)
            : arrayRemove(updateData),
        },
        { merge: true }
      );
    } catch (error: any) {
      throw error.message;
    }
  },
  // STORAGE
  getStorageRef(photoName: string, photoFormat: string) {
    return ref(
      storage,
      `gs://${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${photoName}.${photoFormat}`
    );
  },
  async uploadImage(ref: StorageReference, file: Blob) {
    await uploadBytes(ref, file).catch((error) => console.error(error.message));
  },
  async getStoredImages(ref: StorageReference) {
    try {
      const imageURL = await getDownloadURL(ref);
      return imageURL;
    } catch (error: any) {
      console.error(error.message);
    }
  },
};
