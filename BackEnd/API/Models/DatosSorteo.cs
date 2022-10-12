using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class DatosSorteo
    {
        public DatosSorteo()
        {
            DatosPreviosAdministracions = new HashSet<DatosPreviosAdministracion>();
            ListaChequeoSorteos = new HashSet<ListaChequeoSorteo>();
            Marchamo3monazos = new HashSet<Marchamo3monazo>();
            MarchamoLottos = new HashSet<MarchamoLotto>();
            MarchamoNtNtrs = new HashSet<MarchamoNtNtr>();
            MarchamoPopularNacionals = new HashSet<MarchamoPopularNacional>();
            Resultados = new HashSet<Resultado>();
        }

        public int IdInterno { get; set; }
        public int? IdUsuario { get; set; }
        public int? NumSorteo { get; set; }
        public string TipoLoteria { get; set; }
        public int? PlanPremios { get; set; }
        public DateTime? FechaHora { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual PlanPremio PlanPremiosNavigation { get; set; }
        public virtual TipoLoterium TipoLoteriaNavigation { get; set; }
        public virtual ICollection<DatosPreviosAdministracion> DatosPreviosAdministracions { get; set; }
        public virtual ICollection<ListaChequeoSorteo> ListaChequeoSorteos { get; set; }
        public virtual ICollection<Marchamo3monazo> Marchamo3monazos { get; set; }
        public virtual ICollection<MarchamoLotto> MarchamoLottos { get; set; }
        public virtual ICollection<MarchamoNtNtr> MarchamoNtNtrs { get; set; }
        public virtual ICollection<MarchamoPopularNacional> MarchamoPopularNacionals { get; set; }
        public virtual ICollection<Resultado> Resultados { get; set; }
    }
}
