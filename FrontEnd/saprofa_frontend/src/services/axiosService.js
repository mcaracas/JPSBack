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
