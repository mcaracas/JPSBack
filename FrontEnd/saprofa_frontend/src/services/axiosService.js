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

export function insertMarchamoLotto(lottery){
    return APIRequest.post('/MarchamoLotto',lottery);
}

export function insertMarchamo3Monazos(lottery){
    return APIRequest.post('/Marchamo3monazo',lottery);
}

export function insertMarchamoNT(lottery){
    return APIRequest.post('/MarchamoNtNtr',lottery);
}

export function insertMarchamoFisica(lottery){
    return APIRequest.post('/marchamoFisica',lottery);
}