import React from 'react'
//@ts-ignore
import { getColumnLabel } from './utils.ts'

const ColumnHeader = ({colIndex}) => {
  return (
    <td key={colIndex} className="column-header">{getColumnLabel(colIndex - 1)}</td> //ABCD col
  )
}

export default ColumnHeader