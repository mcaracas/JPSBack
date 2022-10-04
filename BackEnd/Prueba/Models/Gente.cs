using System;
using System.Collections.Generic;

#nullable disable

namespace APISAPROFA
{
    public partial class Gente
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int? IdSexo { get; set; }

        public virtual Csexo IdSexoNavigation { get; set; }
    }
}
