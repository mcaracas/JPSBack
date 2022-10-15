import React from 'react'
import FranjaLogo from '../../components/pure/FranjaLogo'
import FranjaPrincipal from '../../components/pure/Franja'
import FranjaRoja from '../../components/pure/FranjaR'
import ContenedorLista from '../../components/container/ContenedorLista'
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas'
import TituloPrincipal from '../../components/pure/TituloPrincipal'



const NombreFiscalizadores = () => {
  return (
    <div>
      <EncabezadoFranjas titulo= {"FISCALIZADORES"}></EncabezadoFranjas>
      <ContenedorLista/>
    </div>
  )
}

export default NombreFiscalizadores
