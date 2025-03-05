import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBoOynM_UmkGQG7r3simeowqgKK41Ig31E',
  authDomain: 'keep-notes-23dba.firebaseapp.com',
  projectId: 'keep-notes-23dba',
  storageBucket: 'keep-notes-23dba.firebasestorage.app',
  messagingSenderId: '452052164312',
  appId: '1:452052164312:web:00a90815b6f03774eb01ad',
  measurementId: 'G-5LYW5CDF1N',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
// const db = firebase.firestore()

export { auth, analytics }

export default boot()
