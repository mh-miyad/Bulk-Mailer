/* eslint-disable @typescript-eslint/no-explicit-any */
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_KEYWORD,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

interface FirebaseContext {
  app: any;
  db: Firestore;
  auth: Auth;
}

export const useFirebase = (): FirebaseContext => {
  const [firebaseContext, setFirebaseContext] =
    useState<FirebaseContext | null>(null);

  useEffect(() => {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const db: Firestore = getFirestore(app);
    const auth: Auth = getAuth(app);

    setFirebaseContext({ app, db, auth });
  }, []);

  if (!firebaseContext) {
    throw new Error("Firebase not initialized");
  }

  return firebaseContext;
};
