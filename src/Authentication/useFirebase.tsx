/* eslint-disable @typescript-eslint/no-explicit-any */
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
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
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
  userEmail: string | null;
}

export const useFirebase = (): FirebaseContext | null => {
  const [firebaseContext, setFirebaseContext] =
    useState<FirebaseContext | null>(null);

  useEffect(() => {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const db: Firestore = getFirestore(app);
    const auth: Auth = getAuth(app);

    // Listen for authentication changes and update userEmail
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseContext({
        app,
        db,
        auth,
        userEmail: user?.email || null,
      });
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  return firebaseContext;
};
