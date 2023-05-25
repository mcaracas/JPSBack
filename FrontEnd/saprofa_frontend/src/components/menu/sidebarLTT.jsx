import React from 'react';

const SidebarLTT = ({src, sorteo}) => {
    return (
        <ul className='list-group'>
            <li className="list-group-item">
                <img className="logoSorteo" src={src} alt='nombre' />
                <h2 className="sorteo">{sorteo}</h2>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/ChooseLottery">
                    Seleccionar sorteo
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/DatosParticipantesPage">
                    Nombre de representantes
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/MarchamoLotto">
                    Ingreso de marchamos
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/PruebasLotto">
                    Pruebas
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/CompararVentas">
                    Comparar Ventas
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/ResultadosLoteriaElectronica">
                    Resultados
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/Escrutinio">
                    Escrutinio
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/TomoFolio">
                    Tomo y Folio
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/ListaChequeo">
                    Lista de Chequeo
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/ConclusionesRecomendaciones">
                    Conclusiones y Recomendaciones
                </a>
            </li>
        </ul>
    );
}

export default SidebarLTT;
