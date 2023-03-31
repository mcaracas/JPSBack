import React, { useState } from 'react';
import '../../styles/sidebar.scss'



const Sidebar = () => {

    const [showMarchamos, setShowMarchamos] = useState(false);

    const handleOpenMarchamo = () => {
        setShowMarchamos(!showMarchamos);
    }

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <a className="menu-opc" href="/ChooseLottery">
                    <i className="bi bi-house"></i>
                    &nbsp;
                    Seleccionar sorteo
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/DatosPrevios">
                    <i className="bi bi-house"></i>
                    &nbsp;
                    Datos previos
                </a>
            </li>
            {/* For the Marchamo add a dropdown menu */}
            <li className="list-group-item">
                <a className="menu-opc dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    onClick={handleOpenMarchamo}>
                    Marchamos
                </a>

                {showMarchamos ?
                    <div className='dropdown'>
                        <a className="menu-opc" href="/MarchamoPopular">
                            <i className="bi bi-house"></i>
                            Marchamo Popular
                        </a>
                        <a className="menu-opc" href="/MarchamoNacional">
                            <i className="bi bi-house"></i>
                            Marchamo Nacional
                        </a>
                        <a className="menu-opc" href="/MarchamoLotto">
                            <i className="bi bi-house"></i>
                            Marchamo Lotto
                        </a>
                        <a className="menu-opc" href="/MarchamoNuevosTiempos">
                            <i className="bi bi-house"></i>
                            Marchamo Nuevos Tiempos
                        </a>
                        <a className="menu-opc" href="/Marchamo3Monazos">
                            <i className="bi bi-house"></i>
                            Marchamo 3 Monazos
                        </a>
                    </div>

                    : null
                }
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/NombreFiscalizadores">
                    <i className="bi bi-house"></i>
                    &nbsp;
                    Nombre de fiscalizadores
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/Valija3Monazos">
                    <i className="bi bi-house"></i>
                    &nbsp;
                    Valija 3 monazos
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/ValijaNuevosTiempos">
                    <i className="bi bi-house"></i>
                    &nbsp;
                    Valija Nuevos tiempos
                </a>
            </li>

        </ul>
    );
}

export default Sidebar;

//SUAVE NANDO ME ESTAN HABLANDO


//Pages to add link:
// ChooseLottery
// DatosPrevios
// DROPDOWN MENU:
//          MarchamoPopular
//          MarchamoNacional
//          MarchamoLotto
//          MarchamoNuevosTiempos
//          Marchamo3Monazos
// NombreFiscalizadores
// Valija3Monazos
// ValijaNuevosTiempos
// DROPDOWN MENU:
//      PruebasLotto
//      Pruebas3Monazos
//      PruebasNuevosTiempos
// PlanPremios
// ResultadosLoteriaFisica
// ResultadosLoteriaElectronica
// ConclusionesRecomendaciones
// CierreApuestas
// VerificaMontosAcumulados
// DatosParticipantesPage
// TomoFolio