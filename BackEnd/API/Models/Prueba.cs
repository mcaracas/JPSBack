﻿#nullable disable

namespace API
{
    public partial class Prueba
    {
        public int? IdDatoSorteo { get; set; }
        public string Numero { get; set; }
        public string Bolita { get; set; }

        public virtual DatosSorteo IdDatoSorteoNavigation { get; set; }
    }
}
