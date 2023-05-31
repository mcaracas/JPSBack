import Container from "../../components/container/container";
import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import MarchamoLotto from "../../components/pure/forms/MarchamoLotto";
import { getParametros } from "../../services/axiosService";

let codigoMarchamo = "";
const parametros = async () => {
  try {
    const response = await getParametros();
    if (response.status === 200) {
      const data = response.data;
      // El arreglo data guarda varios parametros de la tabla de parametros,
      // en la primera posicion se encuentra el codigo de marchamo de electronica.
      codigoMarchamo = data[0].parametroValor;
      console.log(codigoMarchamo)
    }
  } catch (error) {
    console.log(`Error al obtener los parametros de marchamo: ${error}`);
  }
}

const MarchamoLottoPage = (id) => {
  parametros();
    return (
        <div>
          <EncabezadoFranjas title= {"Marchamos Lotto"}></EncabezadoFranjas>
          <Container component={codigoMarchamo && <MarchamoLotto id={id} codigoMarchamo={codigoMarchamo}/>} />
        </div>
      )
}

export default MarchamoLottoPage;