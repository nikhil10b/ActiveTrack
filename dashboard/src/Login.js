// src/Login.js
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQYNZBV6yrA5FgycnrVZjqo0E4KPg-GDo",
    authDomain: "activitytracker-9aa4e.firebaseapp.com",
    projectId: "activitytracker-9aa4e",
    storageBucket: "activitytracker-9aa4e.appspot.com",
    messagingSenderId: "934778305994",
    appId: "1:934778305994:web:83c8a0567941a93344e333",
    measurementId: "G-HJZ869TXD7"
  };

  // Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  function Login() {
    const handleGoogleLogin = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        await firebase.auth().signInWithPopup(provider);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    return (
      <div className="container mx-auto max-w-sm mt-8">
        <h1 className="text-3xl font-bold mb-4">Login with Google</h1>
        <button onClick={handleGoogleLogin} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Sign in with Google
        </button>
      </div>
    );
  }
  
  export default Login;