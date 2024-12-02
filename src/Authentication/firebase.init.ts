import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { SignInAndSignUp } from "./../Type/Authentication";
import { auth } from "./firebase.config";

type FirebaseUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
};

export const getUser = async (auth: Auth) => {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      const userData: FirebaseUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      return userData;
    } else {
      return null;
    }
  });
};

export const signWithEmailAndPassword = async ({
  email,
  password,
  auth,
}: SignInAndSignUp) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    throw new Error("Error signing in" + " " + error);
  }
};

export const createAccountEmailPassword = async ({
  email,
  auth,
  password,
}: SignInAndSignUp) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    throw new Error("Error creating account" + " " + error);
  }
};

export const signOutUser = async () => {
  const user = await signOut(auth);
  return user;
};
