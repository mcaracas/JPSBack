import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import MarchamoLotto from "../../components/pure/forms/MarchamoLotto";

const MarchamoLottoPage = (id) => {
    return (
        <div>
          <EncabezadoFranjas title= {"Marchamos Lotto"}></EncabezadoFranjas>
          <MarchamoLotto id={id}/>
        </div>
      )
}

export default MarchamoLottoPage;