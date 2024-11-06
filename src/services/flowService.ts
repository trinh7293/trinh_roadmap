import { db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { BoardDoc, FlowData, HandleDataFromServer, UserDoc } from '../types'
import { BOARD_COLLECTION, USER_COLLECTION } from '../constants'

export const getUserData = async (userId: string): Promise<string[]> => {
  const userRef = doc(db, USER_COLLECTION, userId)
  const userSnap = await getDoc(userRef)
  if (userSnap.exists()) {
    const userData = userSnap.data() as UserDoc
    const boardIds = userData.boards
    return boardIds
  } else {
    console.log('No such user!')
    return []
  }
}

export const getBoardData = async (
  boardId: string,
  callback: HandleDataFromServer
) => {
  const boardRef = doc(db, BOARD_COLLECTION, boardId)
  const boardSnap = await getDoc(boardRef)
  if (boardSnap.exists()) {
    const boardData = boardSnap.data() as BoardDoc
    console.log('Document data:', boardData)
    callback(boardData.flowData)
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!')
  }
}

export const setBoardData = async (boardId: string, flowData: FlowData) => {
  const boardRef = doc(db, BOARD_COLLECTION, boardId)
  await setDoc(boardRef, { flowData }, { merge: true })
}
