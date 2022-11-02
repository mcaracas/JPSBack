import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import PlanPremios from '../../components/pure/PlanPremios';

const PlanPremiosPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Plan de premios"}></EncabezadoFranjas>
            <div><br></br><br></br><br></br></div>
            <div className='col-2'>
                <PlanPremios idPlanPremios={1}></PlanPremios>
            </div>
        </div>
    );
}

export default PlanPremiosPage;
