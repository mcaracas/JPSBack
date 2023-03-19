import React, { useDebugValue } from 'react'
import ListItem from './List-item'
import './../container/contenedorLista.scss'

const List = ({ items, titulo, juez }) => {
  // let nombrejuez = items[0].juez;
  return (
    <div>
      <div className='row justify-content-between'>
        <div className='col-6 mt-2'>
          <h3 className='text-center'>{titulo}</h3>
          <div className='row'>
            <ul>
              {items.map(item => (
                <ListItem key={item.id} item={item.nombre} />
              ))}
            </ul>
          </div>
        </div>
        <div className='col-5 mt-3'>
          <h2 className='text-center'>Juez</h2>
          <div className='row'>
            <li>{juez}</li>
          </div>
        </div>
      </div>
    </div>
  )
}


export default List
