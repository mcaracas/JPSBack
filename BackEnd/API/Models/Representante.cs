using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Representante
    {
        public int Id { get; set; }
        public int? IdDatosPrevios { get; set; }
        public string Nombre { get; set; }
        public string Juez { get; set; }

        public virtual DatosPreviosAdministracion IdDatosPreviosNavigation { get; set; }
    }
}
