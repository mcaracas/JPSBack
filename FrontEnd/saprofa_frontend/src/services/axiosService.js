import APIRequest from "../utils/config/axios.config";

/**
 * @param {Object} values
 * @returns post request
 */
export function login(values) {
    const data ={"nombre": values.username.toString().trim(), 
    "clave": values.password.toString().trim()}
    return APIRequest.post('/usuario/login',data);
}

export function register(values) {
    return APIRequest.post('/usuario/Register',{
        contentType: 'application/json; charset=utf-8',
        "nombre": values.name.toString().trim(),
        "clave": values.password.toString().trim(),
        "usuario1": values.username.toString().trim()});
}

export function getHoraIngreso(){   // Get the current date and time from the server
    return APIRequest.get('/util/FechaHoraActual');
}

export function getRepresentante(){   
    return APIRequest.get('/representate');
}

export function insertMarchamo(marchamoList){
    return APIRequest.post('/Marchamo',marchamoList);
}

export function getActualLotteryInfo(){
    return APIRequest.get('/DatosSorteo/SorteoActual');
}

export function getDatosFormularios(id){
    return APIRequest.get('/DatosFormulariosA/'+id);
}

export function insertPrueba(prueba){
    return APIRequest.post('/Prueba',prueba);
}