import React from "react"
import './franjaR.scss'
import PropTypes from 'prop-types'

function FranjaRoja({ title }) {
    return <header className="franjaR mb-5">{title}</header>
}

FranjaRoja.propTypes = {
    title: PropTypes.string,
};

export default FranjaRoja;