import React from 'react'
import './contenedorLista.scss'
import ListItem from '../pure/List-item'
import axios from 'axios';
import List from '../pure/List'
import { useEffect, useState } from 'react';
import { getRepresentante } from '../../services/axiosService';


const ContenedorLista = () => {
  let nombrejuez = "";
  const [items, setItems] = useState();
  useEffect(() => {
    getRepresentante().then(res => {
      if(res.status === 200){
        setItems(res.data)
      }else{
        throw new Error('No se obtuvieron los datos de los representantes de la administracion');
      }
    }).catch(err => {
      alert(`Algo salió mal: ${err}`);
    })
  }, [])

  return (
    <div className="contenedor">
      {/* {items&&guardarNombre} */}
      {items && <List items={items} titulo={"REPRESENTANTES DE GERENCIA"} juez={items[0].juez}/>}
      {/* <div>
        <h2>JUEZ</h2>
        <ul>
          {nombrejuez}
        </ul>
      </div> */}
    </div>
  )
}

export default ContenedorLista