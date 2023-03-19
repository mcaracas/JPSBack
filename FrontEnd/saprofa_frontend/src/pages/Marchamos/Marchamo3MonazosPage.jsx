import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import Marchamo3Monazos from "../../components/pure/forms/Marchamo3Monazos";

const Marchamo3MonazosPage = (id) => {
    return (
        <div>
          <EncabezadoFranjas title= {"Marchamos 3 Monazos"}></EncabezadoFranjas>
          <Marchamo3Monazos id={id}/>
        </div>
      )
}

export default Marchamo3MonazosPage;
