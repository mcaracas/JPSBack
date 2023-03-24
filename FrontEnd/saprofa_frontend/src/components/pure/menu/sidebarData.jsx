import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';


export const SidebarData = [
    {
        title: 'Seleccionar Sorteo',
        path: '/ChooseLottery',
        icon: <AiIcons.AiFillHome />,

    },
    {
        title: 'Pruebas',
        icon: <GrIcons.GrDocumentTest />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Pruebas 3 Monazos',
                path: '/Pruebas3Monazos',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Pruebas Lotto',
                path: '/PruebasLotto',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Pruebas Nuevos Tiempos',
                path: '/PruebasNuevosTiempos',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'Marchamos',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Marchamo 3 Monazos',
                path: '/Marchamo3Monazos',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Marchamo Lotto',
                path: '/MarchamoLotto',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Marchamo Nuevos Tiempos',
                path: '/MarchamoNuevosTiempos',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Marchamo Popular',
                path: '/MarchamoPopular',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Marchamo Nacional',
                path: '/MarchamoNacional',
                icon: <IoIcons.IoIosPaper />
            },
        ]
    },
        

]