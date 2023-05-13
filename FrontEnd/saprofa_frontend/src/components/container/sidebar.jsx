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


    console.log(tipoLoteria);
    return (
        //check tipoLoteria and render the correct sidebar
        <>
            {tipoLoteria === "NT" ? <SidebarNT /> : null}
            {tipoLoteria === "3M" ? <Sidebar3M /> : null}
            {tipoLoteria === "LTT" ? <SidebarLTT /> : null}
            {tipoLoteria === "LN" ? <SidebarLN /> : null}
            {tipoLoteria === "LP" ? <SidebarLP /> : null}
        </>


    );
}

export default Sidebar;