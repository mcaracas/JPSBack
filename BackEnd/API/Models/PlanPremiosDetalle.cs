using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class PlanPremiosDetalle
    {
        public PlanPremiosDetalle()
        {
            Resultados = new HashSet<Resultado>();
        }

        public int NumPremio { get; set; }
        public int? IdPlan { get; set; }
        public float? MontoUnitario { get; set; }
        public int? FraccionEntero { get; set; }
        public string Descripcion { get; set; }

        public virtual PlanPremio IdPlanNavigation { get; set; }
        public virtual ICollection<Resultado> Resultados { get; set; }
    }
}
