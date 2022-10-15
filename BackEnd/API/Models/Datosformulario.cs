using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Datosfomulario
    {
        public string Id { get; set; }
        public int? NumeroPremio { get; set; }
        public float? MontoUnitario { get; set; }
        public int? FraccionEntero { get; set; }
        public string NomFiscalizador { get; set; }
        public float? Ventas { get; set; }
        public float? Escrutinio { get; set; }
        public float? CompraExcedentes { get; set; }
        public string Descripcion { get; set; }
        public DateTime? FechaRealización { get; set; }
        public string NumeroMarchamo { get; set; }
    }
}
