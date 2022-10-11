using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class MarchamoPopularNacional
    {
        public int Id { get; set; }
        public int? IdSorteo { get; set; }
        public string AperturaSerie1 { get; set; }
        public string AperturaSerie2 { get; set; }
        public string AperturaSerie3 { get; set; }
        public string AperturaSerie4 { get; set; }
        public string AperturaNumero { get; set; }
        public string AperturaPremio { get; set; }
        public string AperturaAcumuladoFichero { get; set; }
        public string AperturaAcumuladoTula { get; set; }
        public string CierreSeries { get; set; }
        public string CierreNumero { get; set; }
        public string CierrePremio { get; set; }
        public string CierreAcumuladoFichero { get; set; }
        public string CierreAcumuladoTula { get; set; }
        public string TomoAnterior { get; set; }
        public string TomoActua { get; set; }

        public virtual DatosSorteo IdSorteoNavigation { get; set; }
    }
}
