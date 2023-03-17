import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ConclusionesRecomendaciones from '../../components/pure/conclusionesRecomendaciones/ConclusionesFiscalizacion';
import '../../styles/conclusionesrecomendaciones.scss';

const ConclusionesRecomendacionesPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Conclusiones y Recomendaciones"} />
            <ConclusionesRecomendaciones></ConclusionesRecomendaciones>
        </div>
    );
}

export default ConclusionesRecomendacionesPage;