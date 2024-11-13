import { FLOW_COLLECTION, USER_FLOW_MEMBER_COLLECTION } from '@/constants'
import { db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const fetchUserFlows = async (userId: string) => {
  const qAuthor = query(
    collection(db, FLOW_COLLECTION),
    where('authorId', '==', userId)
  )
  const qMember = query(
    collection(db, USER_FLOW_MEMBER_COLLECTION),
    where('userId', '==', userId)
  )
  const qMemberSnap = await getDocs(qMember)
  const qAuthorSnap = await getDocs(qAuthor)
  const lstFlows = [] as string[]
  qMemberSnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data()
    const { flowId } = data
    lstFlows.push(flowId)
    console.log(doc.id, ' => ', doc.data())
  })
  qAuthorSnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const flowId = doc.id
    lstFlows.push(flowId)
    console.log(doc.id, ' => ', doc.data())
  })
  return lstFlows
}
