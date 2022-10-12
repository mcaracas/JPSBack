using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class MarchamoLotto
    {
        public int Id { get; set; }
        public int? IdSorteo { get; set; }
        public string Apertura { get; set; }
        public string Cierre { get; set; }
        public string Contingencia { get; set; }

        public virtual DatosSorteo IdSorteoNavigation { get; set; }
    }
}
