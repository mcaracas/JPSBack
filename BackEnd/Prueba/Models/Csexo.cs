using System;
using System.Collections.Generic;

#nullable disable

namespace APISAPROFA
{
    public partial class Csexo
    {
        public Csexo()
        {
            Gentes = new HashSet<Gente>();
        }

        public int IdSexo { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Gente> Gentes { get; set; }
    }
}
