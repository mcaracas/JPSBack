using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Resultado
    {
        public int IdResultado { get; set; }

        public int NumeroResultado { get; set; }
        public int? NumPremioPlan { get; set; }
        public int? IdDatoSorteo { get; set; }
        public string NumFavorecido { get; set; }
        public string SeriePremio { get; set; }
        public bool? Verificado { get; set; }
        public bool? VerificaAcumulado { get; set; }
        public virtual DatosSorteo IdDatoSorteoNavigation { get; set; }
        public virtual PlanPremiosDetalle NumPremioPlanNavigation { get; set; }
    }
}
