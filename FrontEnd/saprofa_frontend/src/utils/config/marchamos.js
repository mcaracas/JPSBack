
import { getParametros } from "../../services/axiosService";

export async function parametros() {
    try {
        const response = await getParametros();
        const parametrosMarchamo = {
            'ELECTRONICA' : response.data[0].parametroValor,
            'SERIE' : response.data[1].parametroValor,
            'NUMERO' : response.data[2].parametroValor,
            'OTROS' : response.data[3].parametroValor,
            'PREMIO' : response.data[4].parametroValor,
        };
        return parametrosMarchamo;
    } catch (error) {
        console.log(`Error al obtener los parametros de marchamo: ${error}`);
    }
}