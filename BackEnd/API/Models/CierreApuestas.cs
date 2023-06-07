#nullable disable

namespace API
{
    public partial class CierreApuestas
    {
        public int IdCierre { get; set; }
        public double Monto { get; set; }

        public int IdSort { get; set; } // FK

        
    }
}
