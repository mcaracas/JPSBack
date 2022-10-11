import React from 'react';
import PropTypes from 'prop-types';

const LotteryCard = ({ name, id }) => {

    const defaultLottery = {
        name : 'Loteria Nacional',
        id : 'LN4076'
    };

    const getImg = (name) => {
        switch (name) {
            case 'Loteria Nacional': return 'loteria_nacional.png';
            case 'Loteria Popular': return 'loteria_popular.png';
            case '3 Monazos': return 'tres_monazos.png';
            case 'Lotto' : return 'lotto.png';
            case 'Nuevos Tiempos' : return 'nuevos_tiempos.png';
            default : return 'logo_jps.png';
        }
    }
    return (
        <div className="card p-2 m-5" style={{position: 'relative', width: '18rem', borderRadius:'5%'}}>
            <img className="card-img-top" src={require(`./../../img/${getImg(name)}`)} alt='nombre' style={{borderRadius:'5%'}}/>
            <div className="card-body">
                <h5 className="card-title">{id} - {name}</h5>
            </div>
        </div>
    );
}


LotteryCard.propTypes = {
    name : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired,
}

export default LotteryCard;
