import React from 'react'
import './contenedorLista.scss'
import ListItem from '../pure/List-item'
import axios from 'axios';
import List from '../pure/List'
import { useEffect, useState } from 'react';
import { getRepresentante } from '../../services/axiosService';


const ContenedorLista = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    getRepresentante().then(res => {
      console.log(res.data)
      setItems(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  let nombrejuez = "";
  const guardarNombre = () => {
    nombrejuez = items[0].juez
  }
  return (
    <div className="contenedor">
      {/* {items&&guardarNombre} */}
      {console.log(nombrejuez)}
      {items && <List items={items} titulo={"REPRESENTANTES DE GERENCIA"} />}
      <div>
        <h2>JUEZ</h2>
        <ul>
          {nombrejuez}
        </ul>
      </div>
    </div>
  )
}

export default ContenedorLista