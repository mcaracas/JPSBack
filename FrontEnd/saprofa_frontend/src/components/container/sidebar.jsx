import React, { useState } from 'react';
import '../../styles/sidebar.scss'



const Sidebar = () => {

    const [showMarchamos, setShowMarchamos] = useState(false);
    const [showPruebas, setShowPruebas] = useState(false);
    const [showResultados, setShowResultados] = useState(false);

    const handleOpenMarchamo = () => {
        setShowMarchamos(!showMarchamos);
    }

    const handleOpenPruebas = () => {
        setShowPruebas(!showPruebas);
    }

    const handleOpenResultados = () => {
        setShowResultados(!showResultados);
    }

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <a className="menu-opc" href="/ChooseLottery">
                    Seleccionar sorteo
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/DatosParticipantesPage">
                    Nombre de fiscalizadores
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/DatosPrevios">
                    Lista de Chequeo
                </a>
            </li>
            {/* PRUEBAS */}
            <li className='list-group-item'>
                <a className="menu-opc dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    onClick={handleOpenPruebas}
                >
                    Pruebas
                </a>
                {showPruebas ?
                    <div className='dropdown'>
                        <a className="menu-opc" href="/PruebasLotto">
                            Pruebas Lotto
                        </a>
                        <a className="menu-opc" href="/Pruebas3Monazos">
                            Pruebas 3 Monazos
                        </a>
                        <a className="menu-opc" href="/PruebasNuevosTiempos">
                            Pruebas Nuevos Tiempos
                        </a>
                    </div>
                    : null
                }
            </li>
            {/* MARCHAMOS */}
            <li className="list-group-item">
                <a className="menu-opc dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    onClick={handleOpenMarchamo}
                >
                    Marchamos
                </a>
                {showMarchamos ?
                    <div className='dropdown'>
                        <a className="menu-opc" href="/MarchamoPopular">
                            {/* <i className="bi bi-house"></i> */}
                            Marchamo Popular
                        </a>
                        <a className="menu-opc" href="/MarchamoNacional">
                            {/* <i className="bi bi-house"></i> */}
                            Marchamo Nacional
                        </a>
                        <a className="menu-opc" href="/MarchamoLotto">
                            {/* <i className="bi bi-house"></i> */}
                            Marchamo Lotto
                        </a>
                        <a className="menu-opc" href="/MarchamoNuevosTiempos">
                            {/* <i className="bi bi-house"></i> */}
                            Marchamo Nuevos Tiempos
                        </a>
                        <a className="menu-opc" href="/Marchamo3Monazos">
                            {/* <i className="bi bi-house"></i> */}
                            Marchamo 3 Monazos
                        </a>
                    </div>
                    : null
                }
            </li>
            <li className='list-group-item'>
                <a className="menu-opc" href="/CierreApuestas">
                    Cierre de Apuestas
                </a>

            </li>
            {/* INGRESO RESULTADOS */}
            <li className="list-group-item">
                <a className="menu-opc dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    onClick={handleOpenResultados}
                >
                    Ingreso de <br></br>Resultados
                </a>
                {showResultados ?
                    <div className='dropdown'>
                        <a className="menu-opc" href="/ResultadosLoteriaFisica">
                            Loteria Fisica
                        </a>
                        <a className="menu-opc" href="/ResultadosLoteriaElectronica">
                            Loteria Electronica
                        </a>
                    </div>
                    : null
                }
            </li>
            {/* @TODO: Ingreso de escrutinio */}
            <li className="list-group-item">
                <a className="menu-opc" href="/ConclusionesRecomendaciones">
                    Conclusiones y Recomendaciones
                </a>
            </li>
            {/* @TODO: Actas */}
            <li className="list-group-item">
                <a className="menu-opc dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                // onClick={handleOpenResultados}
                >
                    Actas
                </a>

            </li>
        </ul>
    );
}

export default Sidebar;