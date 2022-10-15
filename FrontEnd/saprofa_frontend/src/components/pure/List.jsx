import React from 'react'
import ListItem from './List-item'

const List = ({ items,titulo,parametro}) => {
  return (
   <>
   <div>
    <h2>{titulo}</h2>

    <ul>
      {items.map(item => (
        <ListItem key={item.id} item = {item.parametro} />
      ))}
    </ul>

</div>
    </>

  )
}   


export default List