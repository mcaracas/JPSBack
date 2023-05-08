using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class RepListaChequeoActum
    {
        public int? IdDatoSorteo { get; set; }
        public int? IdChequeoDetalle { get; set; }
        public string Descripcion { get; set; }
        public string TipoListaChequeo { get; set; }
        public string Verificado { get; set; }
        public int? Orden { get; set; }
    }
}
