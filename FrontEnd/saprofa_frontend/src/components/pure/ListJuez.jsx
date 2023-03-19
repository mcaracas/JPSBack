import React, { useDebugValue } from 'react'
import ListItem from './List-item'

const ListJuez = ({ items,titulo}) => {
  return (
   <>
   <div>
    <h2>{titulo}</h2>

    <ul>
      {items.map(item => (
        <ListItem key={item.id} item={item.juez} />
      ))}
    </ul>

</div>
    </>

  )
}   


export default ListJuez