import React from 'react'
import FranjaLogo from '../../components/pure/header/FranjaLogo'
import FranjaPrincipal from '../../components/pure/header/Franja'
import FranjaRoja from '../../components/pure/header/FranjaR'
import ContenedorLista from '../../components/container/ContenedorLista'
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas'
import TituloPrincipal from '../../components/pure/header/TituloPrincipal'



const NombreFiscalizadores = () => {
  return (
    <div>
      <EncabezadoFranjas titulo= {"FISCALIZADORES"}></EncabezadoFranjas>
      <ContenedorLista/>
    </div>
  )
}

export default NombreFiscalizadores
