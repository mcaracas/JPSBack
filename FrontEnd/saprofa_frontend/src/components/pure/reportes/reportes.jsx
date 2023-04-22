import React from 'react';
import { getEmailSorteo } from '../../../services/axiosService';


const Reportes = () => {

    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const idInterno = lottery?.idInterno;

    const handleSubmit = async () => {
        const response = await getEmailSorteo(idInterno);
    }
    return (
        <div>
            <h1>Reportes</h1>
            <br/>
            <button onClick={handleSubmit} type="submit" className="btn" >Obtener Reporte </button>
        </div>

    );
}

export default Reportes;