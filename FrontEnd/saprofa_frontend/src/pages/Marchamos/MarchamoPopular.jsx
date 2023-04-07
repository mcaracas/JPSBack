import Container from "../../components/container/container";
import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import MarchamoPopular from "../../components/pure/forms/MarchamoPopular";

const MarchamoPopularPage = (id) => {
    return (
        <div>
          <EncabezadoFranjas title= {"Marchamo Popular"}></EncabezadoFranjas>
          <Container component={<MarchamoPopular id={id}/>} />
        </div>
      )
}

export default MarchamoPopularPage;