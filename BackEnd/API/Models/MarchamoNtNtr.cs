using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class MarchamoNtNtr
    {
        public int Id { get; set; }
        public int? IdSorteo { get; set; }
        public string AperturaNt { get; set; }
        public string CierreNt { get; set; }
        public string Contingencia1Nt { get; set; }
        public string Contingencia2Nt { get; set; }
        public string AperturaNtr { get; set; }
        public string CierreNtr { get; set; }
        public string Contingencia1Ntr { get; set; }

        public virtual DatosSorteo IdSorteoNavigation { get; set; }
    }
}
