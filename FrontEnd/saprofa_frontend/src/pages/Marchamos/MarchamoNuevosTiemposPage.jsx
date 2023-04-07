import Container from "../../components/container/container";
import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import MarchamoNuevosTiempos from "../../components/pure/forms/MarchamoNuevosTiempos";

const MarchamoNuevosTiemposPage = (id) => {
  return (
    <div>
      <EncabezadoFranjas title={"Marchamo Nuevos Tiempos y Reventados"}></EncabezadoFranjas>
      <Container component={<MarchamoNuevosTiempos id={id} />} />
    </div>
  )
}

export default MarchamoNuevosTiemposPage;