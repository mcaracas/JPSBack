import { getHoraIngreso } from "../../services/axiosService";

export function getTiempoFiscalizacion() {
    getHoraIngreso()
        .then((response) => {
            // To get the hour and date from the server
            const horaSalida = response.data;
            const horaIngreso = sessionStorage.getItem('HoraIngreso');

            // To get just the hour and minutes
            const ingreso = horaIngreso.substring(11, 16);
            const salida = horaSalida.substring(11, 16);

            // To get the difference between the two hours
            const timeDiff = new Date("1970-01-01 " + salida + ":00") - new Date("1970-01-01 " + ingreso + ":00");
            const diffHrs = Math.floor((timeDiff % 86400000) / 3600000); // hours
            const diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000); // minutes

            return diffHrs + ":" + diffMins;    // Format: hh:mm
        });

}