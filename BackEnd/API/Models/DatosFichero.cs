#nullable disable

namespace API
{
    public partial class DatosFichero
    {
        public int? IdDatosPrevAdmi { get; set; }
        public int? Marchamo { get; set; }
        public int? CantBolitas { get; set; }
        public DateTime? FechaHora { get; set; }

        public virtual DatosPreviosAdministracion IdDatosPrevAdmiNavigation { get; set; }
    }
}
