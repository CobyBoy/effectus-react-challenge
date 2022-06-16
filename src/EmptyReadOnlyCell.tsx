import React from 'react'

const EmptyReadOnlyCell = ({colIndex}) => {
  return (
    <td key={colIndex} className="column-header"/>
  )
}

export default EmptyReadOnlyCell