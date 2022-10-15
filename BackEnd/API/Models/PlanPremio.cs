using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class PlanPremio
    {
        public PlanPremio()
        {
            DatosSorteos = new HashSet<DatosSorteo>();
            PlanPremiosDetalles = new HashSet<PlanPremiosDetalle>();
        }

        public int IdPlan { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<DatosSorteo> DatosSorteos { get; set; }

        public virtual ICollection<PlanPremiosDetalle> PlanPremiosDetalles { get; set; }
    }
}
