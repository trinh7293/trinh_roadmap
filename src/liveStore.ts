import { getYjsDoc, syncedStore } from '@syncedstore/core'
import { Edge } from '@xyflow/react'
import { CustomNode } from './types'
import { WebrtcProvider } from 'y-webrtc'

export const liveStore = syncedStore({
  nodes: [] as CustomNode[],
  edges: [] as Edge[]
})

export const initProvider = (roomId: string) => {
  const doc = getYjsDoc(liveStore)
  const webrtcProvider = new WebrtcProvider(roomId, doc)
  const connect = () => webrtcProvider.connect()
  const disconnect = () => webrtcProvider.disconnect()
  return { connect, disconnect }
}
