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

export function getMarchamos() {
    return APIRequest.get('/Series');
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

export function getPlanPremios(id) {
    return APIRequest.get('/PlanPremiosDetalle/' + id);
}

export function getDatosPrevios(id) {
    return APIRequest.get('/DatosPreviosA/' + id);
}

export function getDatosParticipantes(id) {
    return APIRequest.get(`/Representate/${id}`);
}

export function insertDatosAdministracion(datos) {
    return APIRequest.post('/Representate', datos);
}
//get -> rellenar los campos en el formulario
export function getPremioFromAdministracion(numeroResultado) {
    return APIRequest.get(`/VerificarResultadosLF/${numeroResultado}`);
}

//post -> mandar la tabla con resultados a insertar en la BD
export function insertarPremios(premios) {
    return APIRequest.post('/VerificarResultadosLF', premios);
}

export function postResultadosElectronica(resultado) {
    return APIRequest.post('/Resultado', resultado);
}

export function postTomoFolio(data) {
    return APIRequest.post('/TomoFolio', data);
}

export function getUltimoTomofolio(idInterno) {
    return APIRequest.get('/TomoFolio/UltimoTomofolio/' + idInterno);
}

export function getCierreApuestas(id) {
    return APIRequest.get('/CierreApuestas/' + id);
}

export function getMontoAcumulado(id) {
    return APIRequest.get('/VerificarAcumGtec/' + id);
}

export function insertarApuestas(monto) {
    console.log(monto);
    return APIRequest.post('/CierreApuestas/', monto)
}

export function insertaMontoAcumulado(monto) {
    console.log(monto);
    return APIRequest.post('/VerificarAcumGtecController/', monto)
}

export function getListaChequeo(idInterno) {
    return APIRequest.get('/ListaChequeoDetalle/ListaChequeoParaSorteo/' + idInterno);
}
export function insertarFicheros(ficheros) {
    console.log(ficheros);
    return APIRequest.post('/Series', ficheros);
}

export function getEscrutinio(id) {
    return APIRequest.get('/Escrutinio/' + id);
}

export function insertarEscrutinio(id, escrutinio) {
    const data = {
        "idSorteo": id,
        "escrutinio": escrutinio,
    }
    return APIRequest.post('/Escrutinio', data);
}

export function getPremios() {
    return APIRequest.get('/PlanPremiosDetalle');
}

export function insertaProcedimiento(procedimiento) {
    console.log("Data: ", procedimiento);
    return APIRequest.post('/ListaChequeoSorteo', procedimiento);
}

export function getVentas(id) {
    return APIRequest.get('/Ventas/' + id);
}

export function insertaVentas(ventas) {
    return APIRequest.post('/Ventas', ventas);
}

export function getEmailSorteo(id) {
    console.log(id);
    return APIRequest.get('/Util/EnviarEmailSorteo/' + id);
}

export function getName(username) {
    return APIRequest.get(`/Usuario/${username}`);
}

export function getParametroBydId(id) {
    return APIRequest.get(`/Parametro/${id}`);
}

export function getParametros() {
    return APIRequest.get(`/Parametro`);
}

export function getGerenciaGeneral(){
    return APIRequest.get('/Administracion/RepresentanteGG')
}

export function getGerenciaProduccion(){
    return APIRequest.get('/Administracion/RepresentanteGPC')
}

export function getGerenciaOpreacion(){
    return APIRequest.get('/Administracion/RepresentanteGO')
}

