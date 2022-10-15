import React from 'react'
import FranjaLogo from '../../components/pure/FranjaLogo'
import FranjaPrincipal from '../../components/pure/Franja'
import FranjaRoja from '../../components/pure/FranjaR'
import ContenedorLista from '../../components/container/ContenedorLista'
import EncabezadoFranjas from '../../components/container/EncabezadoFranjas'
import TituloPrincipal from '../../components/pure/TituloPrincipal'
import ContenedorListaJuez from '../../components/container/ContenedorListaJuez'


const NombreFiscalizadores = () => {
  return (
    <div>
      <EncabezadoFranjas titulo= {"FISCALIZADORES"}></EncabezadoFranjas>
      <ContenedorLista/>
      <ContenedorListaJuez/>
      </div>
  )
}

export default NombreFiscalizadores
