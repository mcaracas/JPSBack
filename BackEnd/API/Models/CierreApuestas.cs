#nullable disable

namespace API
{
    public partial class CierreApuestas
    {
        public int IdCierre { get; set; }
        public float Monto { get; set; }

        public int IdSort { get; set; } // FK

        
    }
}
