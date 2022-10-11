#nullable disable

namespace API
{
    public partial class Acumulado
    {
        public string TipoLoteria { get; set; }
        public double? Monto { get; set; }

        public virtual TipoLoterium TipoLoteriaNavigation { get; set; }
    }
}
