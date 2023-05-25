import React, { useState } from 'react';
import '../../styles/sidebar.scss'
import SidebarNT from "./../menu/sidebarNT"
import Sidebar3M from "./../menu/sidebar3M"
import SidebarLTT from "./../menu/sidebarLTT"
import SidebarLN from "./../menu/sidebarLN"
import SidebarLP from "./../menu/sidebarLP"



const Sidebar = () => {

    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const tipoLoteria = lottery?.tipoLoteria;
    const numeroSorteo = lottery?.numSorteo;
    const sorteo = `${' Nº ' + numeroSorteo}`;

    const getImg = () => {
        switch (tipoLoteria) {
            case 'LN': return 'loteria_nacional.png';
            case 'LP': return 'loteria_popular.png';
            case '3M': return 'tres_monazos.png';
            case 'LTT' : return 'lotto.png';
            case 'NT' : return 'nuevos_tiempos.png';
            default : return 'logo_jps.png';
        }
    }
    
    const src = require(`./../../img/${getImg(tipoLoteria)}`);

    console.log(tipoLoteria);
    return (
        //check tipoLoteria and render the correct sidebar
        <>
            {tipoLoteria === "NT" ? <SidebarNT src={src} sorteo={sorteo}/> : null}
            {tipoLoteria === "3M" ? <Sidebar3M src={src} sorteo={sorteo}/> : null}
            {tipoLoteria === "LTT" ? <SidebarLTT src={src} sorteo={sorteo}/> : null}
            {tipoLoteria === "LN" ? <SidebarLN src={src} sorteo={sorteo}/> : null}
            {tipoLoteria === "LP" ? <SidebarLP src={src} sorteo={sorteo}/> : null}
        </>


    );
}

export default Sidebar;