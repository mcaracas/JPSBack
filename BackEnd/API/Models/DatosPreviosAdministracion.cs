using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class DatosPreviosAdministracion
    {
        public DatosPreviosAdministracion()
        {
            Representantes = new HashSet<Representante>();
        }

        public int Id { get; set; }
        public int? IdDatoSorteo { get; set; }
        public string NomFiscalizador { get; set; }
        public float? Ventas { get; set; }
        public float? Escrutinio { get; set; }
        public string LugarRealizacion { get; set; }
        public float? CompraExcedentes { get; set; }

        public virtual DatosSorteo IdDatoSorteoNavigation { get; set; }
        public virtual ICollection<Representante> Representantes { get; set; }
    }
}
