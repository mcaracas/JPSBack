using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class TomoFolio
    {
        public int IdTomoFolio { get; set; }
        public int Tomo { get; set; }
        public int Folio { get; set; }
        public int IdDatoSorteo { get; set; }
        public string Estado { get; set; }

        public virtual DatosSorteo IdDatoSorteoNavigation { get; set; }
    }
}
