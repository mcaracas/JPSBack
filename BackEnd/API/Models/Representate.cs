#nullable disable

namespace API
{
    public partial class Representate
    {
        public int Id { get; set; }
        public int? IdDatosPrevios { get; set; }
        public string GOperaciones { get; set; }
        public string GProduccion { get; set; }
        public string Gerencia { get; set; }
        public string Juez { get; set; }

        public virtual DatosPreviosAdministracion IdDatosPreviosNavigation { get; set; }
    }
}
