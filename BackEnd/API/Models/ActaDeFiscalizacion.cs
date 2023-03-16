using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class ActaDeFiscalizacion
    {
        public int IdSorteo { get; set; }
        public string Protocolo { get; set; }
        public string OtrasConclusiones { get; set; }
        public string ConclusionesDetalle { get; set; }
        public string Recomendacion { get; set; }
        public string RecomendacionDetalle { get; set; }
    }
}
