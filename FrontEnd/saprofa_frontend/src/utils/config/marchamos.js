
import { getParametros } from "../../services/axiosService";

export async function parametros() {
    try {
        const response = await getParametros();
        return response.data;
    } catch (error) {
        console.log(`Error al obtener los parametros de marchamo: ${error}`);
    }
}