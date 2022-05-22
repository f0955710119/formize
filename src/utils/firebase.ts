import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  FieldValue,
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  where,
  arrayUnion,
  arrayRemove,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import type { DocumentReference, DocumentData } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import type { StorageReference } from "firebase/storage";

import type { Forms } from "../types/form";
import type { Group } from "../types/group";
import type { UserInfoType } from "../types/login";
import type { Questions } from "../types/question";
import type { Responses } from "../types/responses";
import helper from "./helper";
import firestoreCollectionConfig from "../configs/firestoreCollectionConfig";

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
  {
    case: "auth/configuration-not-found",
    errorMessage: "無法建立帳號，請稍後再試",
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

export const user = auth.currentUser;

const throwNewError = (message: string) => {
  throw new Error(message);
};

const setUserData = async (uid: string) => {
  const newUserRef = doc(db, "users", uid);
  const { id } = newUserRef;
  const defalutUsers = {
    id,
    groupId: [],
  };
  await setDoc(newUserRef, defalutUsers).catch(() =>
    throwNewError("fail to set up user doc in firebase")
  );
  return id;
};

export default {
  async createNativeUser(userInfo: UserInfoType) {
    try {
      const { email, password } = userInfo;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;
      await setUserData(uid);
      return uid;
    } catch (error: any) {
      const { message } = error;
      const errorMessage = checkSignupErrorCase(message);
      if (!errorMessage) {
        console.error(message);
        throw new Error("創建帳號失敗，請重新整理頁面");
      }
      throw new Error(errorMessage);
    }
  },
  async nativeLogin(userInfo: UserInfoType) {
    try {
      const { email, password } = userInfo;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;
      const data = await this.getDocData(firestoreCollectionConfig.USERS, uid);
      return data;
    } catch (error: any) {
      const { message } = error;
      console.error(message);
      throw new Error("登入失敗，請重整頁面或稍後再試");
    }
  },
  async nativeSignOut() {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error(error.message);
    }
  },
  checkAuthState() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.uid);
          return;
        }
        resolve("未登入狀態");
      });
      unsubscribe();
    });
  },
  // FOR_DOC
  async updateExistedDoc(
    collectionName: string,
    docId: string,
    field: string,
    data: string | number | Date | null
  ) {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      [field]: data,
    });
  },
  async updateExistResponseFields(
    collectionName: string,
    docId: string,
    dataArr: [],
    id: string
  ) {
    const docRef = doc(db, collectionName, docId);
    const updateObj: { [key: string]: FieldValue } = {};
    dataArr.forEach((d: { questionId: string; input: string }) => {
      const key = d.questionId as string;
      updateObj[key] = arrayUnion({ [id]: d.input });
    });
    await updateDoc(docRef, updateObj);
  },
  // FOR_FILTER
  async getAllEqualDoc(collectionName: string, fieldKey: string, equalValue: string) {
    const collectionRef = collection(db, collectionName);
    const fields = query(collectionRef, where(fieldKey, "==", equalValue));

    const querySnapshot = await getDocs(fields);
    const datas = querySnapshot.docs.map((doc) => doc.data());
    return datas;
  },
  // FOR_GENERAL
  generateDocRef(collectionName: string) {
    const id = helper.generateId(8);
    const docRef = doc(db, collectionName, id);
    return docRef;
  },
  // prettier-ignore
  async setNewDoc<T extends Forms | Questions | Group | Responses>(docRef: DocumentReference<DocumentData>, data: T) {
    try {
      await setDoc(docRef, data);
      return "成功發送資料";
    } catch (error: any) {
      const {message} = error
      console.error(message)
      throwNewError('新增資料失敗，請稍後再嘗試')
    }
  },
  async getDocData(collectionName: string, docId: string) {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throwNewError("fail to get user data since the doc does not exist");
    }
  },
  async updateFieldArrayValue<T>(
    { docPath, fieldKey, updateData }: { docPath: string; fieldKey: string; updateData: T },
    isAddNewValue: boolean = true
  ) {
    const docRef = doc(db, docPath);
    try {
      await setDoc(
        docRef,
        {
          [fieldKey]: isAddNewValue ? arrayUnion(updateData) : arrayRemove(updateData),
        },
        { merge: true }
      );
    } catch (error: any) {
      throw error.message;
    }
  },
  async deleteDocDate(collectionName: string, docId: string) {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  },
  // STORAGE
  generateStorageRef(refName: string) {
    return ref(storage, refName);
  },
  getStorageRef(photoName: string) {
    return ref(storage, `gs://${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${photoName}`);
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
  async generateImageUrl(file: File) {
    try {
      const ref = this.getStorageRef(file.name);
      await this.uploadImage(ref, file);
      const url = await this.getStoredImages(ref);
      return url;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  },
  async deleteImage(url: string | null | undefined) {
    if (url === null || url === undefined) return;
    const imageRef = ref(storage, `${url}`);
    await deleteObject(imageRef);
  },
  async createUploadedImages(imageFile: File | null) {
    if (imageFile === null) return null;
    const newImageFileUrl = await this.generateImageUrl(imageFile);
    return newImageFileUrl !== undefined ? newImageFileUrl : null;
  },
};
