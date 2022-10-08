using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Marchamo
    {
        public int IdMarchamo { get; set; }
        public int IdDatosSorteo { get; set; }
        public string TipoMarchamo { get; set; }
        public string NumeroMarchamo { get; set; }
        public string Tipo { get; set; }
        public string Valija { get; set; }
        public string Observacion { get; set; }

        public virtual DatosSorteo IdDatosSorteoNavigation { get; set; }
    }
}
