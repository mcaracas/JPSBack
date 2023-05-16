import React, { useState, useEffect  } from 'react';
import { getPlanPremios } from '../../services/axiosService';

const PlanPremios = ({ idPlanPremios, onSelectChange }) => {

    const [planPremios, setPlanPremios] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [indexPremio, setIndexPremio] = useState(0);

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
        console.log("INDEXTIPOPREMIO: ", indexPremio);
        setSelectedValue(selectedValue);
        onSelectChange(selectedValue, indexPremio, reducirCantidadPremio);
        reducirCantidadPremio(indexPremio);
    };

    const reducirCantidadPremio = (idxTipoPremio) => {
        console.log("idxTipoPremio: ", idxTipoPremio);
        // const cant = planPremios[idxTipoPremio].cantidadPremios;
        // console.log("cant: ", cant);
        // if (cant === 1) {
        //     //remove item
        //     const newPlanPremios = planPremios.filter((planPremio, idx) => idx !== idxTipoPremio);
        //     setPlanPremios(newPlanPremios);
        //     return;
        // }
        // const newPlanPremios = {...planPremios};
        // console.log("newPlanPremios: ", newPlanPremios);
        // newPlanPremios[idxTipoPremio].cantidadPremios = cant - 1;
        // console.log("newPlanPremios: ", newPlanPremios);
        // setPlanPremios(newPlanPremios);
    };

    return (
        <select className="form-select form-select-sm" value={selectedValue} onChange={handleTipoPremio}>
            {planPremios && planPremios.map((planPremio) => (
                <option
                    value={planPremio.MontoUnitario}
                    key={planPremio.numPremio}
                    onClick={() => setIndexPremio(planPremio.numPremio-1)}
                >
                    {planPremio.descripcion} ({planPremio.cantidadPremios})
                </option>
            ))}
        </select>
    );
};

export default PlanPremios;
