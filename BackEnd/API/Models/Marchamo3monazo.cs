using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Marchamo3monazo
    {
        public int Id { get; set; }
        public int? IdSorteo { get; set; }
        public string AperturaValijaA { get; set; }
        public string AperturaValijaB { get; set; }
        public string Contingencia { get; set; }

        public virtual DatosSorteo IdSorteoNavigation { get; set; }
    }
}
