using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Marchamo
    {
        public int Id { get; set; }
        public int IdSorteo { get; set; }
        public string Tipo { get; set; }
        public string Valija { get; set; }
        public string TipoMarchamo { get; set; }
        public string NumeroMarchamo { get; set; }

        public virtual DatosSorteo IdSorteoNavigation { get; set; }
    }
}
