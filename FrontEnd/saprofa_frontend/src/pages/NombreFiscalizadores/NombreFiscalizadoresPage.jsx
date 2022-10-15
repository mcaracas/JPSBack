import React, { useEffect, useState } from 'react'
import ContenedorLista from '../../components/container/ContenedorLista'
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas'


const NombreFiscalizadores = () => {
  return (
    <div>
      <EncabezadoFranjas title= {"FISCALIZADORES"}></EncabezadoFranjas>
      <ContenedorLista/>
    </div>
  )
}

export default NombreFiscalizadores
