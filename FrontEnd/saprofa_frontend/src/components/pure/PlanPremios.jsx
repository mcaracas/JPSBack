import React, { useState, useEffect } from 'react';
import { getPlanPremios } from '../../services/axiosService';

const PlanPremios = ({ idPlanPremios, onSelectChange }) => {

    const [planPremios, setPlanPremios] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        getPlanPremios(idPlanPremios).then(res => {
            if (res.status === 200) {
                setPlanPremios(res.data);
                setSelectedValue(res.data[0].MontoUnitario);
                sessionStorage.setItem('planPremios', JSON.stringify(res.data));
            } else {
                throw new Error('No se obtuvo el plan de premios');
            }
        }).catch(err => {
            alert(`Algo salió mal: ${err}`);
        })
    }, []);

    const handleTipoPremio = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);
        onSelectChange(selectedValue);
    };

    return (
        <select className="form-select form-select-sm" value={selectedValue} onChange={ handleTipoPremio }>
            {planPremios && planPremios.map((planPremio) => (
                <option 
                value={planPremio.MontoUnitario}
                key={planPremio.numPremio}
                >
                {planPremio.descripcion}
                </option>
            ))}
        </select>
    );
}

export default PlanPremios;
