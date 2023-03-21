#nullable disable

namespace API
{
    public partial class AcumGtec
    {
        public int IdAcumulado { get; set; }
        public string TipoLoteria { get; set; }
        public double? Monto { get; set; }

        public int idSorteo { get; set; }
    }
}
