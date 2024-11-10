import { db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'

const fs = [
  {
    id: 'flow1Id',
    name: 'flow3 name'
  },
  {
    id: 'flow2Id',
    name: 'flow3 name'
  },
  {
    id: 'flow3Id',
    name: 'flow3 name'
  },
  {
    id: 'flow4Id',
    name: 'flow4 name'
  },
  {
    id: 'flow5Id',
    name: 'flow5 name'
  }
]
//   Promise.all(
//     flow2Add.map((f) =>
//       setDoc(doc(db, 'flows', f.id), {
//         name: f.name
//       })
//     )
//   )
const us = [
  {
    id: 'trinh1Id',
    name: 'trinh 1 name'
  },
  {
    id: 'trinh2Id',
    name: 'trinh 2 name'
  },
  {
    id: 'trinh3Id',
    name: 'trinh 3 name'
  },
  {
    id: 'trinh4Id',
    name: 'trinh 4 name'
  }
]

const addJ = () => {
  const jInfras = [
    [1, 0],
    [2, 0],
    [2, 1],
    [3, 1],
    [0, 2],
    [1, 2]
  ]
  const j2A = jInfras.map((jI) => {
    const [userIndex, flIndex] = jI
    const userId = us[userIndex].id
    const flowId = fs[flIndex].id
    const id = `${userId}_${flowId}`
    return {
      id,
      userId,
      flowId
    }
  })
  Promise.all(
    j2A.map((j) => {
      const { id, flowId, userId } = j
      return setDoc(doc(db, 'user_flow_member', id), {
        userId,
        flowId
      })
    })
  )
}

// const proHIhi = () => {
//   const us = [
//     {
//       id: 'trinh3Id',
//       name: 'trinh 3 name'
//     },
//     {
//       id: 'trinh4Id',
//       name: 'trinh 4 name'
//     }
//   ]
//   Promise.all(
//     us.map((u) =>
//       setDoc(doc(db, 'users', u.id), {
//         name: u.name
//       })
//     )
//   )
// }

const Add = () => {
  //   const fs = [
  //     {
  //       id: 'flow1Id',
  //       name: 'flow3 name'
  //     },
  //     {
  //       id: 'flow2Id',
  //       name: 'flow3 name'
  //     },
  //     {
  //       id: 'flow3Id',
  //       name: 'flow3 name'
  //     },
  //     {
  //       id: 'flow4Id',
  //       name: 'flow4 name'
  //     },
  //     {
  //       id: 'flow5Id',
  //       name: 'flow5 name'
  //     }
  //   ]
  //   //   Promise.all(
  //   //     flow2Add.map((f) =>
  //   //       setDoc(doc(db, 'flows', f.id), {
  //   //         name: f.name
  //   //       })
  //   //     )
  //   //   )
  //   const us = [
  //     {
  //       id: 'trinh1Id',
  //       name: 'trinh 1 name'
  //     },
  //     {
  //       id: 'trinh2Id',
  //       name: 'trinh 2 name'
  //     },
  //     {
  //       id: 'long',
  //       name: 'long'
  //     },
  //     {
  //       id: 'truong',
  //       name: 'truong'
  //     }
  //   ]
  // const jInfras = [[1,0],
  // [2,0],
  // [0,1],
  // [3,1],
  // [2,0],
  // [2,0],

  // ]

  // ]
  //   const j2a = [
  //     {
  //       id: `${us[0].id}_${fs[0].id}`
  //       userId:
  //     }
  //   ]
  //   junction_user_flow
  // Promise.all(
  //   user2Add.map((u) =>
  //     setDoc(doc(db, 'users', u.id), {
  //       name: u.name
  //     })
  //   )
  // )
  addJ()
  //   proHIhi()
  return <div>success</div>
}

export default Add
