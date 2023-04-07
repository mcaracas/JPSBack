import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import PruebasLottoForm from '../../components/pure/forms/PruebasLottoForm';
import Container from '../../components/container/container';
const PruebasLottoPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Pruebas de lotto"}></EncabezadoFranjas>
            <Container component={<PruebasLottoForm IdDatoSorteo={152}></PruebasLottoForm>} />
        </div>
    );
}

export default PruebasLottoPage;
