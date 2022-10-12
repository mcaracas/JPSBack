using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class TipoLoterium
    {
        public TipoLoterium()
        {
            DatosSorteos = new HashSet<DatosSorteo>();
            ListaChequeoDetalles = new HashSet<ListaChequeoDetalle>();
        }

        public string Codigo { get; set; }
        public string Descripcion { get; set; }

        public virtual Acumulado Acumulado { get; set; }
        public virtual ICollection<DatosSorteo> DatosSorteos { get; set; }
        public virtual ICollection<ListaChequeoDetalle> ListaChequeoDetalles { get; set; }
    }
}
