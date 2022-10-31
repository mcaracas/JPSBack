using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Prueba
    {
        public int IdPrueba { get; set; }
        public int? IdDatoSorteo { get; set; }
        public string Numero { get; set; }
        public string Bolita { get; set; }

        public virtual DatosSorteo IdDatoSorteoNavigation { get; set; }
    }
}
