import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Container from '../../components/container/container';
import CompararVentas from './../../components/pure/forms/CompararVentas';


const CompararVentasPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Comparar Ventas"} />
            <Container component={<CompararVentas/>}/>
        </div>
    );
}

export default CompararVentasPage;
