import APIRequest from "../utils/config/axios.config";

/**
 * @param {String} username 
 * @param {String} password 
 * @returns post request
 */
export function login(values) {
    const data ={
        '"id"': values.username,
        '"clave"': values.password
    }
    console.log(data);
    return APIRequest.post('/usuario/login',data);
}

export function insertMarchamo(marchamoList){
    return APIRequest.post('/Marchamo',marchamoList);
}

export function getActualLotteryInfo(){
    return APIRequest.get('/DatosSorteo');
}