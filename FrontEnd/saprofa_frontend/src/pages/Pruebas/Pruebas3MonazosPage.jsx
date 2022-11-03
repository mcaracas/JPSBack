import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Pruebas3MonazosForm from '../../components/pure/forms/Pruebas3MonazosForm';

const Pruebas3MonazosPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Pruebas 3 Monazos"}/>
            <Pruebas3MonazosForm IdDatoSorteo={151}/>
        </div>
    );
}

export default Pruebas3MonazosPage;
