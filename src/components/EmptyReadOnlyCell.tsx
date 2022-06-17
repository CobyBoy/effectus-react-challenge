import React from 'react'

const EmptyReadOnlyCell = ({colIndex}:{ colIndex: number}) => {
  return (
    <td key={colIndex} className="column-header"/>
  )
}

export default EmptyReadOnlyCell