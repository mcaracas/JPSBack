import React, { useDebugValue } from 'react'
import ListItem from './List-item'

const List = ({ items, titulo, juez }) => {
  // let nombrejuez = items[0].juez;
  return (
    <div>
      <div className='diplay-flex justify-content-between'>
        <div  className='row'>
          <h2 className='col'>{titulo}</h2>
          <h2 className='col'>Juez</h2>
        </div>
        <div className='row'>
          <div className='col'>
            <ul>
              {items.map(item => (
                <ListItem key={item.id} item={item.nombre}/>
              ))}
            </ul>
          </div>
          <div className='col'>
                <li>{juez}</li>
          </div>
        </div>
      </div>
    </div>


  )
}


export default List
