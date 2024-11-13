import { getYjsDoc, syncedStore } from '@syncedstore/core'
import { Edge } from '@xyflow/react'
import { CustomNode } from '@/types'
import { WebrtcProvider } from 'y-webrtc'
import { WebsocketProvider } from 'y-websocket'

export const liveStore = syncedStore({
  nodes: [] as CustomNode[],
  edges: [] as Edge[]
})

export const initRTCProvider = (roomId: string) => {
  const doc = getYjsDoc(liveStore)
  const webrtcProvider = new WebrtcProvider(roomId, doc)
  const connect = () => webrtcProvider.connect()
  const disconnect = () => webrtcProvider.disconnect()
  return { connect, disconnect }
}

export const initWSCProvider = (roomId: string) => {
  const doc = getYjsDoc(liveStore)
  const wsProvider = new WebsocketProvider('ws://localhost:1234', roomId, doc, {
    connect: false
  })
  // const webrtcProvider = new WebrtcProvider(roomId, doc)
  const connect = () => wsProvider.connect()
  const disconnect = () => wsProvider.disconnect()
  return { connect, disconnect }
}
