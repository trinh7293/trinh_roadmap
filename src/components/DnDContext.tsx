import { createContext, useContext, useState } from 'react'

export enum NodeTypeEnum {
  INPUT = 'input',
  DEFAULT = 'default',
  OUTPUT = 'output'
}

export type DnDContextType = {
  nodeType: NodeTypeEnum | null
  updateNodeType: (nt: NodeTypeEnum) => void
}

const DnDContext = createContext<DnDContextType | null>(null)

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [nodeType, setType] = useState<NodeTypeEnum | null>(null)
  const updateNodeType = (nt: NodeTypeEnum) => {
    setType(nt)
  }
  return (
    <DnDContext.Provider value={{ nodeType, updateNodeType }}>
      {children}
    </DnDContext.Provider>
  )
}

export default DnDContext

export const useDnD = () => {
  return useContext(DnDContext)
}
