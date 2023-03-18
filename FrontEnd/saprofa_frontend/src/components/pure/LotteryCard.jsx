import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getDatosFormularios } from '../../services/axiosService';

const LotteryCard = ({ lottery }) => {

    const navigate = useNavigate();

    const tipoLoteria = lottery.tipoLoteria;
    const numSorteo = lottery.numSorteo;

    const getImg = (tipoLoteria) => {
        switch (tipoLoteria) {
            case 'LN': return 'loteria_nacional.png';
            case 'LP': return 'loteria_popular.png';
            case '3M': return 'tres_monazos.png';
            case 'LTT' : return 'lotto.png';
            case 'NT' : return 'nuevos_tiempos.png';
            default : return 'logo_jps.png';
        }
    }

    const getNavigation = (tipoLoteria) => {
        switch (tipoLoteria) {
            case 'LN': return '/MarchamoNacional';
            case 'LP': return '/MarchamoPopular';
            case '3M': return '/Marchamo3Monazos';
            case 'LTT' : return '/MarchamoLotto';
            case 'NT' : return '/MarchamoNuevosTiempos';
            default : return 'logo_jps.png';
        }
    }

    //If clicks on a lottery, redirect to correspondent page
    const click = async (tipo) => {
        // alert(`clicked ${tipo}`)
        const datosFormulario = await getDatosFormularios(`${tipoLoteria}${numSorteo}`);
        sessionStorage.setItem('lottery', JSON.stringify(lottery));
        sessionStorage.setItem('datosFormulario', JSON.stringify(datosFormulario.data));
        navigate(getNavigation(tipo));
    }

    return (
        <div onClick={()=>click(tipoLoteria,numSorteo)} className="card p-2 m-5" style={{position: 'relative', width: '18rem', height:'18rem', borderRadius:'5%'}}>
            <img className="card-img-top" src={require(`./../../img/${getImg(tipoLoteria)}`)} width='200' height='200' alt='nombre' style={{borderRadius:'5%'}}/>
            <div className="card-body">
                <h5 className="card-title">{`Sorteo: ${numSorteo}`}</h5>
            </div>
        </div>
    );
}


LotteryCard.propTypes = {
    lottery : PropTypes.object.isRequired,
}

export default LotteryCard;
