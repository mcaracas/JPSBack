import Container from "../../components/container/container";
import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import MarchamoNacional from "../../components/pure/forms/MarchamoNacional";

const MarchamoNacionalPage = (id) => {
    return (
        <div>
          <EncabezadoFranjas title= {"Marchamo Nacional"}></EncabezadoFranjas>
          <Container component={<MarchamoNacional id={id}/>}></Container>
        </div>
      )
}

export default MarchamoNacionalPage;