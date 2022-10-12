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
    return APIRequest.post('/marchamoLotto',lottery);
}

export function insertMarchamo3Monazos(lottery){
    return APIRequest.post('/marchamo3monazos',lottery);
}

export function insertMarchamoNT(lottery){
    return APIRequest.post('/marchamoNT',lottery);
}

export function insertMarchamoFisica(lottery){
    return APIRequest.post('/marchamoFisica',lottery);
}