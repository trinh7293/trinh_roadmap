import { FLOW_COLLECTION } from '@/constants'
import { db } from '@/firebase'
import { Flow } from '@/types'
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { nanoid } from 'nanoid/non-secure'

export const unsubUserFlows = (userId: string, cb: (flows: Flow[]) => void) => {
  const qAuthor = query(
    collection(db, FLOW_COLLECTION),
    where('authorId', '==', userId)
  )
  // const qMember = query(
  //   collection(db, USER_FLOW_MEMBER_COLLECTION),
  //   where('userId', '==', userId)
  // )
  // const qMemberSnap = await getDocs(qMember)
  // const qAuthorSnap = await getDocs(qAuthor)
  // const lstFlows = [] as string[]
  // qMemberSnap.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   const data = doc.data()
  //   const { flowId } = data
  //   lstFlows.push(flowId)
  //   console.log(doc.id, ' => ', doc.data())
  // })
  // qAuthorSnap.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   const flowId = doc.id
  //   lstFlows.push(flowId)
  //   console.log(doc.id, ' => ', doc.data())
  // })
  const unsub = onSnapshot(qAuthor, (qs) => {
    const lstFlows = [] as Flow[]
    qs.forEach((doc) => {
      const data = doc.data() as Flow
      lstFlows.push({
        id: doc.id,
        ...data
      })
    })
    cb(lstFlows)
  })
  return unsub
}

export const addFlowService = async (
  userId: string,
  flName: string,
  description: string
) => {
  const id = nanoid()
  const flowData: Flow = {
    name: flName,
    description,
    authorId: userId
  }
  try {
    await setDoc(doc(db, FLOW_COLLECTION, id), flowData)
    console.log('success add flow', flowData, 'with id', id)
  } catch (error) {
    console.log('error in add flow', error)
  }
}
