import {
  syncedStore
  // getYjsDoc
} from '@syncedstore/core'
import { Edge, Node as NodeTypeFlow } from '@xyflow/react'
// import { Edge, Node } from '@xyflow/react'
// import { WebrtcProvider } from 'y-webrtc'
// import { IndexeddbPersistence } from 'y-indexeddb'

// (optional, define types for TypeScript)

// Create your SyncedStore store
// export type FlowType = {
//   nodes: Node[]
//   edges: Edge[]
// }
export const storeBoard = syncedStore({
  nodes: [] as NodeTypeFlow[],
  edges: [] as Edge[]
})

// Create a document that syncs automatically using Y-WebRTC
// const doc = getYjsDoc(storeBoard)
// export const webrtcProvider = new WebrtcProvider('syncedstore-flow', doc)
// // this allows you to instantly get the (cached) documents data
// export const indexeddbProvider = new IndexeddbPersistence('syncedstore-flow', doc)
// indexeddbProvider.whenSynced.then(() => {
//   console.log('loaded data from indexed db')
// })

// export const disconnect = () => webrtcProvider.disconnect()
// export const connect = () => webrtcProvider.connect()
