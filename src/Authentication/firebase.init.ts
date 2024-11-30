"use server";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SignInAndSignUp } from "./../Type/Authentication";
import { auth } from "./firebase.config";

export const signWithEmailAndPassword = async ({
  email,
  password,
}: SignInAndSignUp) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.log("sign in error: " + error);
  }
};

export const createAccountEmailPassword = async ({
  email,
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
    console.log("sign up error: " + error);
  }
};
