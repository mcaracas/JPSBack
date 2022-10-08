using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class ListaChequeoDetalle
    {
        public ListaChequeoDetalle()
        {
            ListaChequeoSorteos = new HashSet<ListaChequeoSorteo>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string TipoLoteria { get; set; }

        public virtual TipoLoterium TipoLoteriaNavigation { get; set; }
        public virtual ICollection<ListaChequeoSorteo> ListaChequeoSorteos { get; set; }
    }
}
