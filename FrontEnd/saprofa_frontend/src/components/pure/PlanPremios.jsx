import React, { useState, useEffect } from 'react';
import { getPlanPremios } from '../../services/axiosService';

const PlanPremios = ({ idPlanPremios }) => {

    const [planPremios, setPlanPremios] = useState([]);

    useEffect(() => {
        getPlanPremios(idPlanPremios).then(res => {
            if (res.status === 200) {
                setPlanPremios(res.data)
            } else {
                throw new Error('No se obtuvo el plan de premios');
            }
        }).catch(err => {
            alert(`Algo salió mal: ${err}`);
        })
    }, []);


    return (
        <select className="form-select form-select-sm">
            {planPremios && planPremios.map((planPremio) => (
                <option 
                value={planPremio.numPremio}
                key={planPremio.numPremio}
                >
                {planPremio.descripcion}
                </option>
            ))}
        </select>
    );
}

export default PlanPremios;
