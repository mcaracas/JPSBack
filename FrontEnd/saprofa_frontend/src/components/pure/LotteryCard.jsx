import React from 'react';
import PropTypes from 'prop-types';

const LotteryCard = ({ tipoLoteria, numSorteo }) => {

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
    return (
        <div className="card p-2 m-5" style={{position: 'relative', width: '18rem', height:'18rem', borderRadius:'5%'}}>
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
