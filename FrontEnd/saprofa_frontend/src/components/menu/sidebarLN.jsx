import React from 'react';

const SidebarLN = () => {
    return (
        <ul className='list-group'>
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
                <a className="menu-opc" href="/SeriesEnJuego">
                    Series en juego
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/MarchamoNacional">
                    Ingreso de marchamos
                </a>
            </li>
            {/* @TODO: Compra de excedentes */}
            <li className="list-group-item">
                <a className="menu-opc" href="/CompararVentas">
                    Comparar Ventas
                </a>
            </li>
            <li className="list-group-item">
                <a className="menu-opc" href="/ResultadosLoteriaFisica">
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

export default SidebarLN;
