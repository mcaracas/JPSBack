using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class ResultadosBitacora
    {
        public int IdBit { get; set; }
        public DateTime FecBit { get; set; }
        public string AccBit { get; set; }
        public string UsuBit { get; set; }
        public int IdResultado { get; set; }
        public int? NumPremioPlan { get; set; }
        public int? IdDatoSorteo { get; set; }
        public string NumFavorecido { get; set; }
        public string SeriePremio { get; set; }
        public bool? Verificado { get; set; }
    }
}
