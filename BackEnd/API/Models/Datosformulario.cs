using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Datosfomulario
    {
        public string Id { get; set; }
        public int? IdPlanPremios { get; set; }
        public int? IdDatosPrevios { get; set; }

        public virtual DatosPreviosAdministracion IdDatosPreviosNavigation { get; set; }
        public virtual PlanPremio IdPlanPremiosNavigation { get; set; }
    }
}
