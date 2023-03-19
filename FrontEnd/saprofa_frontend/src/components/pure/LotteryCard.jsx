import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const LotteryCard = ({ tipoLoteria, numSorteo }) => {

    const navigate = useNavigate();

    const defaultLottery = {
        tipoLoteria : 'Loteria Nacional',
        numSorteo : 4076,
    };

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
    const click = (tipo) => {
        // alert(`clicked ${tipo}`)
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
    tipoLoteria : PropTypes.string.isRequired,
    numSorteo : PropTypes.number.isRequired,
}

export default LotteryCard;
