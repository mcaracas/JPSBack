using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Representante
    {
        public int Id { get; set; }
        public int? IdDatosPrevios { get; set; }
        public string GerenteOperaciones { get; set; }
        public string GerenteProduccion { get; set; }
        public string Gerencia { get; set; }
        public string Juez { get; set; }
        public string Presentador { get; set; }
        public string Prompter { get; set; }
        public string EquipoComputo { get; set; }
        public virtual DatosPreviosAdministracion IdDatosPreviosNavigation { get; set; }
    }
}
