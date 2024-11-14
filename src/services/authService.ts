import { USER_COLLECTION } from '@/constants'
import { auth, db } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const signUpService = async (
  email: string,
  pass: string,
  displayName: string | null = null
) => {
  try {
    const userCre = await createUserWithEmailAndPassword(auth, email, pass)
    const user = userCre.user
    const { uid } = user
    await saveUsertoFireStore(uid, email, displayName || email, pass)
    console.log('sign up success : ', user)
    return user
  } catch (error) {
    console.log('error in sign up', error)
    return null
  }
}

const saveUsertoFireStore = async (
  uid: string,
  email: string,
  displayName: string,
  pass: string
) => {
  try {
    await setDoc(doc(db, USER_COLLECTION, uid), {
      email,
      pass,
      displayName
    })
  } catch (error) {
    console.log('error in add user 2 firestore', error)
  }
}

export const signInService = async (email: string, pass: string) => {
  try {
    const userCre = await signInWithEmailAndPassword(auth, email, pass)
    const user = userCre.user
    console.log('sign in success : ', user)
    return user
  } catch (error) {
    console.log('error in sign in', error)
    return null
  }
}

export const logOutService = async () => {
  try {
    signOut(auth)
  } catch (error) {
    console.log('error in log out', error)
  }
}
