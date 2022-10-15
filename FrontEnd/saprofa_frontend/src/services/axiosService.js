import APIRequest from "../utils/config/axios.config";

/**
 * @param {Object} values
 * @returns post request
 */
 export function login(values) {    // Check credentials
    const data ={"id": values.username, 
    "clave": values.password.toString()}
    return APIRequest.post('/usuario/login',data);
}

export function getHoraIngreso(){   // Get the current date and time from the server
    return APIRequest.get('/util/FechaHoraActual');
}

export function insertMarchamo(marchamoList){
    return APIRequest.post('/Marchamo',marchamoList);
}

export function getActualLotteryInfo(){
    return APIRequest.get('/DatosSorteo');
}

//RF01 - Datos Previos
export function getPlanPremiosDetalle(id){
    return APIRequest.get('/PlanPremiosDetalle/'+id);
}

export function getPlanPremios(id){
    return APIRequest.get('/PlanPremios/'+id);
}

export function getRepresentante(){
    return APIRequest.get('/Representate');
}

export function getDatosSorteo(id){
    return APIRequest.get('/DatosSorteo/'+id);
}

export function getMarchamo(id){
    return APIRequest.get('/Marchamo/'+id);
}

export function getUsuario(id){
    return APIRequest.get('/Usuario/'+id);
}