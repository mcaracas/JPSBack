import APIRequest from "../utils/config/axios.config";

/**
 * @param {String} username 
 * @param {String} password 
 * @returns post request
 */
export function login(values) {
    const data ={
        '"id"': 19,
        '"nombre"': values.username,
        '"clave"': values.password,
        '"datosSorteos"': null
    }
    return APIRequest.post('/usuario',data);
}

export function insertMarchamo(marchamoList){
    return APIRequest.post('/Marchamo',marchamoList);
}

export function getActualLotteryInfo(){
    return APIRequest.get('/DatosSorteo');
}