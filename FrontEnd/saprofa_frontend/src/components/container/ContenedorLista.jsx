import React from 'react'
import './contenedorLista.scss'
import ListItem from '../pure/List-item'
import axios from 'axios';
import List from '../pure/List'
import { useEffect, useState } from 'react';


const ContenedorLista = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axios.get('https://localhost:7216/Representate')
          .then(res => {
            setItems(res.data)
    
          })
      }, [])
    
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [items, setItems] = useState([])


  return (
    <div className="contenedor">
    <List items = {items} titulo = {"Representantes de gerencia"} />
    <List items = {items} titulo = {"Juez"}/>
    </div>
  )
}

export default ContenedorLista

