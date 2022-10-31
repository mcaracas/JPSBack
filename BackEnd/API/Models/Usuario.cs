using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Usuario
    {
        public Usuario()
        {
            DatosSorteos = new HashSet<DatosSorteo>();
        }
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Clave { get; set; }
        public string Usuario1 { get; set; }
        public virtual ICollection<DatosSorteo> DatosSorteos { get; set; }
    }
}
