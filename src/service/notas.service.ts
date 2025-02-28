import {
  addDoc,
  getDocs,
  deleteDoc,
  setDoc,
  collection,
  getFirestore,
  doc,
} from 'firebase/firestore'
import type { INota } from 'src/interfaces/nota.interface'

const docName = 'notas'

const db = getFirestore()
const colecaoRef = collection(db, docName)

export const postNota = async (nota: INota) => {
  await addDoc(colecaoRef, nota)
}

export const getNotas = async () => {
  const querySnapshot = await getDocs(colecaoRef)

  const documentos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return documentos
}

export const deleteNota = async (id: string) => {
  const ref = doc(db, docName, id)
  return await deleteDoc(ref)
}

export const updateNota = async (nota: INota) => {
  const ref = doc(db, docName, nota.id)
  return await setDoc(ref, nota)
}
