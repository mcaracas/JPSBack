import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import PruebasLottoForm from '../../components/pure/forms/PruebasLottoForm';
const PruebasLottoPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Pruebas de lotto"}></EncabezadoFranjas>
            <div className='row mt-5'></div>
            <div className='row mt-5'></div>
            <div className='mt-2'>
                <PruebasLottoForm></PruebasLottoForm>
            </div>

        </div>
    );
}

export default PruebasLottoPage;
