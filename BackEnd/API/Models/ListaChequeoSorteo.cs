#nullable disable

namespace API
{
    public partial class ListaChequeoSorteo
    {
        public int Id { get; set; }
        public int? IdDatoSorteo { get; set; }
        public int? IdChequeoDetalle { get; set; }
        public bool? Verificado { get; set; }

        public virtual ListaChequeoDetalle IdChequeoDetalleNavigation { get; set; }
        public virtual DatosSorteo IdDatoSorteoNavigation { get; set; }
    }
}
