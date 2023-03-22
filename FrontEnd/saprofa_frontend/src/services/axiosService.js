import APIRequest from "../utils/config/axios.config";

/**
 * @param {Object} values
 * @returns post request
 */
export function login(values) {
    const data = {
        "usuario1": values.username.toString().trim(),
        "clave": values.password.toString().trim()
    }
    return APIRequest.post('/usuario/login', data);
}

export function register(values) {
    console.log(values);
    return APIRequest.post('/usuario/Register', {
        contentType: 'application/json; charset=utf-8',
        "nombre": values.name.toString().trim(),
        "clave": values.password.toString().trim(),
        "usuario1": values.username.toString().trim()
    });
}

export function actaFiscalizacion(values) {
    console.log(values.recomendaciones);

    if (values.procesosConformeEstablecido === false) {
        values.procesosConformeEstablecido = "";
    } else {
        values.procesosConformeEstablecido = "Si";
    }

    if (values.recomendaciones === false) {
        values.recomendaciones = "";
    } else {
        values.recomendaciones = "Ninguna";
    }

    return APIRequest.post('/ActaDeFiscalizacion', {
        contentType: 'application/json; charset=utf-8',
        "idDatoSorteo": "1",                                //FALTA QUE ESTO LO SAQUE DE LA SESION
        "protocolo": values.procesosConformeEstablecido,
        "otrasConclusiones": values.otrasObservaciones,
        "conclusionesDetalle": values.detalles,
        "recomendacion": values.recomendaciones,
        "recomendacionDetalle": values.resultadosSorteo
    });
}

export function getMail(username) {
    return APIRequest.get(`/Usuario/` + username);
}

export function updatePassword(username) {
    return APIRequest.put(`/Usuario/${username}`, { "usuario1": username });
}

export function getParametero() {
    return APIRequest.get('/Parametro/login');
}

export function getHoraIngreso() {   // Get the current date and time from the server
    return APIRequest.get('/util/FechaHoraActual');
}

export function getRepresentante() {
    return APIRequest.get('/representate');
}

export function insertMarchamo(marchamoList) {
    return APIRequest.post('/Marchamo', marchamoList);
}

export function getActualLotteryInfo() {
    return APIRequest.get('/DatosSorteo/SorteoActual');
}

export function getDatosFormularios(id) {
    return APIRequest.get('/DatosFormulariosA/' + id);
}

export function insertPrueba(prueba) {
    return APIRequest.post('/Prueba', prueba);
}

export function insertListaPrueba(Lista) {
    return APIRequest.post('/Prueba/ListaPruebas', Lista);
}

export function getPlanPremios(id){
    return APIRequest.get('/PlanPremiosDetalle/'+id);
}

export function getDatosPrevios(id){
    return APIRequest.get('/DatosPreviosA/'+id);
}

export function getDatosParticipantes(id){
    return APIRequest.get(`/Representate`);
}

export function insertDatosAdministracion(datos){
    return APIRequest.post('/Representate',datos);
}
//get -> rellenar los campos en el formulario
export function getPremioFromAdministracion(numeroResultado){
    return APIRequest.get(`/VerificarResultadosLF/${numeroResultado}`);
}

//post -> mandar la tabla con resultados a insertar en la BD
export function insertarPremios(premios){
    return APIRequest.post('/VerificarResultadosLF',premios);
}

export function getUltimoTomofolio(idInterno){
    return APIRequest.get('/TomoFolio/UltimoTomofolio/'+idInterno);
}