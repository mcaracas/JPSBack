import React from "react"

import './franjaR.scss'
import PropTypes from 'prop-types'

function FranjaRoja({title}){
return <header className="franjaR"><h2>{title}</h2></header>
}

FranjaRoja.propTypes = {
    title: PropTypes.string.isRequired,
};

export default FranjaRoja;