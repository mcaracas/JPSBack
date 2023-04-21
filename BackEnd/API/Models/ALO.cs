namespace API
{
    public partial class ALO
    {
        public int Id { get; set; }
        public int Id_sorteo { get; set; }
        public int ser_premi { get; set; }
        public string? Bolita_leyenda { get; set; }
        public DateTime Hora { get; set; }
        public string? Marchamo1 { get; set; }
        public string? Marchamo2 { get; set; }
        public string? Marchamo3 { get; set; }
        public string? Marchamo4 { get; set; }
        public string? no_juegan1 { get; set; }
        public string? no_juegan2 { get; set; }
        public string? no_juegan3 { get; set; }
        public string? no_juegan4 { get; set; }
        public string? Observaciones { get; set; }
        public float premio_total { get; set; }
        public int ser_cant_juegan { get; set; }
        public int ser_cant_no_juegan { get; set; }
        public string? ser_custodiado { get; set; }
        public string? ser_firma { get; set; }
        public string? ser_numeros_o_f { get; set; }
        public string? ser_premios_marchamos { get; set; }

        //public virtual DatosSorteo IdDatoSorteoNavigation { get; set; }
    }
}
