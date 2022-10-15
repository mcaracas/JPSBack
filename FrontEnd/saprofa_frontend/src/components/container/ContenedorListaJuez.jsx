
import React from 'react'
import './contenedorLista.scss'
import ListItem from '../pure/List-item'
import axios from 'axios';
import List from '../pure/List'
import { useEffect, useState } from 'react';

const ContenedorListaJuez = () => {

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
          .then(res => {
            const persons = res.data;
            setItems(res.data)
    
          })
      }, [])
    
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [items, setItems] = useState([])

    return (
        <div>
           <div className="contenedor">
    <List items = {items} titulo = {"JUEZ"} parametro={"juez"}/>
    </div> 
        </div>
    );
}

export default ContenedorListaJuez;



