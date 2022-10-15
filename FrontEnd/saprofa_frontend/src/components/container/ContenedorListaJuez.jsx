import React from 'react'
import './contenedorLista.scss'
import ListItem from '../pure/List-item'
import axios from 'axios';
import { useEffect, useState } from 'react';
import ListJuez from '../pure/ListJuez';

const ContenedorListaJuez = () => {

    useEffect(() => {
        axios.get('https://localhost:7216/Representate')
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
    <ListJuez items = {items} titulo = {"JUEZ"} />
    </div> 
        </div>
    );
}

export default ContenedorListaJuez;



