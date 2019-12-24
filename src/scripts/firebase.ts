import firebase from "firebase/app"
import "firebase/auth"
import "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBvGJhoGu1t-X9iIJwRPP29x-dyXKPGlH4",
  authDomain: "surreal-tales.firebaseapp.com",
  databaseURL: "https://surreal-tales.firebaseio.com",
  projectId: "surreal-tales",
  storageBucket: "surreal-tales.appspot.com",
  messagingSenderId: "759909063351",
  appId: "1:759909063351:web:9d5d1c0505b6462ecb8b32",
  measurementId: "G-7CLNK42W7E",
}

firebase.initializeApp(firebaseConfig)

export const analytics = firebase.analytics()
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const facebookProvider = new firebase.auth.FacebookAuthProvider()
