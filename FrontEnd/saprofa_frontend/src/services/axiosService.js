import APIRequest from "../utils/config/axios.config";

/**
 * @param {String} username 
 * @param {String} password 
 * @returns post request
 */
export function login(username, password) {
    return APIRequest.post('/usuario',{
        '"id"': 19,
        '"nombre"': username,
        '"clave"': password,
        '"datosSorteos"': null
    });
}

export function insertMarchamoLotto(marchamoList){
    return APIRequest.post('/MarchamoLotto',marchamoList);
}

export function insertMarchamo3Monazos(marchamoList){
    return APIRequest.post('/Marchamo3monazo',marchamoList);
}

export function insertMarchamoNT(marchamoList){
    return APIRequest.post('/MarchamoNtNtr',marchamoList);
}

export function insertMarchamoFisica(marchamoList){
    return APIRequest.post('/marchamoFisica',marchamoList);
}

export function getActualLotteryInfo(){
    return APIRequest.get('/DatosSorteo');
}