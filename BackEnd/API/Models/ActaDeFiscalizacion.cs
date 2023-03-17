using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class ActaDeFiscalizacion
    {  
        public int Id { get; set; }
        public int? IdDatoSorteo { get; set; }
        public string Protocolo { get; set; }
        public string OtrasConclusiones { get; set; }
        public string ConclusionesDetalle { get; set; }
        public string Recomendacion { get; set; }
        public string RecomendacionDetalle { get; set; }
        public virtual DatosSorteo IdDatoSorteoNavigation { get; set; }
    }
}
