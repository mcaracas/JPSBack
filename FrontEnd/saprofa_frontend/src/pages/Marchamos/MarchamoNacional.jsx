import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import MarchamoNacional from "../../components/pure/forms/MarchamoNacional";

const MarchamoNacionalPage = (id) => {
    return (
        <div>
          <EncabezadoFranjas title= {"Marchamo Nacional"}></EncabezadoFranjas>
          <MarchamoNacional id={id}/>
        </div>
      )
}

export default MarchamoNacionalPage;