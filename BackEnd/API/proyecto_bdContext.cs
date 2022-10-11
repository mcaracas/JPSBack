using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace API
{
    public partial class proyecto_bdContext : DbContext
    {
        public proyecto_bdContext()
        {
        }

        public proyecto_bdContext(DbContextOptions<proyecto_bdContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Acumulado> Acumulados { get; set; }
        public virtual DbSet<DatosFichero> DatosFicheros { get; set; }
        public virtual DbSet<DatosPreviosAdministracion> DatosPreviosAdministracions { get; set; }
        public virtual DbSet<DatosSorteo> DatosSorteos { get; set; }
        public virtual DbSet<ListaChequeoDetalle> ListaChequeoDetalles { get; set; }
        public virtual DbSet<ListaChequeoSorteo> ListaChequeoSorteos { get; set; }
        public virtual DbSet<Marchamo3monazo> Marchamo3monazos { get; set; }
        public virtual DbSet<MarchamoLotto> MarchamoLottos { get; set; }
        public virtual DbSet<MarchamoNtNtr> MarchamoNtNtrs { get; set; }
        public virtual DbSet<MarchamoPopularNacional> MarchamoPopularNacionals { get; set; }
        public virtual DbSet<PlanPremio> PlanPremios { get; set; }
        public virtual DbSet<PlanPremiosDetalle> PlanPremiosDetalles { get; set; }
        public virtual DbSet<Prueba> Pruebas { get; set; }
        public virtual DbSet<RepFavorecidosUltimoAnno> RepFavorecidosUltimoAnnos { get; set; }
        public virtual DbSet<RepSorteoPorUsuario> RepSorteoPorUsuarios { get; set; }
        public virtual DbSet<RepVentasPorFecha> RepVentasPorFechas { get; set; }
        public virtual DbSet<Representate> Representates { get; set; }
        public virtual DbSet<Resultado> Resultados { get; set; }
        public virtual DbSet<ResultadosBitacora> ResultadosBitacoras { get; set; }
        public virtual DbSet<TipoLoterium> TipoLoteria { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL(Environment.GetEnvironmentVariable("MESSAGE"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Acumulado>(entity =>
            {
                entity.HasKey(e => e.TipoLoteria)
                    .HasName("PRIMARY");

                entity.ToTable("acumulados");

                entity.Property(e => e.TipoLoteria)
                    .HasMaxLength(50)
                    .HasColumnName("tipo_loteria");

                entity.Property(e => e.Monto).HasColumnName("monto");

                entity.HasOne(d => d.TipoLoteriaNavigation)
                    .WithOne(p => p.Acumulado)
                    .HasForeignKey<Acumulado>(d => d.TipoLoteria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("acumulados_ibfk_1");
            });

            modelBuilder.Entity<DatosFichero>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("datos_ficheros");

                entity.HasIndex(e => e.IdDatosPrevAdmi, "id_datos_prev_admi");

                entity.Property(e => e.CantBolitas)
                    .HasColumnType("int(11)")
                    .HasColumnName("cant_bolitas");

                entity.Property(e => e.FechaHora).HasColumnName("fecha_hora");

                entity.Property(e => e.IdDatosPrevAdmi)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_datos_prev_admi");

                entity.Property(e => e.Marchamo)
                    .HasColumnType("int(11)")
                    .HasColumnName("marchamo");

                entity.HasOne(d => d.IdDatosPrevAdmiNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdDatosPrevAdmi)
                    .HasConstraintName("datos_ficheros_ibfk_1");
            });

            modelBuilder.Entity<DatosPreviosAdministracion>(entity =>
            {
                entity.ToTable("datos_previos_administracion");

                entity.HasIndex(e => e.IdDatoSorteo, "id_dato_sorteo");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.CompraExcedentes).HasColumnName("compra_excedentes");

                entity.Property(e => e.Escrutinio).HasColumnName("escrutinio");

                entity.Property(e => e.IdDatoSorteo)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_dato_sorteo");

                entity.Property(e => e.LugarRealizacion)
                    .HasMaxLength(50)
                    .HasColumnName("lugar_realizacion");

                entity.Property(e => e.NomFiscalizador)
                    .HasMaxLength(50)
                    .HasColumnName("nom_fiscalizador");

                entity.Property(e => e.Ventas).HasColumnName("ventas");

                entity.HasOne(d => d.IdDatoSorteoNavigation)
                    .WithMany(p => p.DatosPreviosAdministracions)
                    .HasForeignKey(d => d.IdDatoSorteo)
                    .HasConstraintName("datos_previos_administracion_ibfk_1");
            });

            modelBuilder.Entity<DatosSorteo>(entity =>
            {
                entity.HasKey(e => e.IdInterno)
                    .HasName("PRIMARY");

                entity.ToTable("datos_sorteo");

                entity.HasIndex(e => e.IdUsuario, "id_usuario");

                entity.HasIndex(e => e.PlanPremios, "plan_premios");

                entity.HasIndex(e => e.TipoLoteria, "tipo_loteria");

                entity.HasIndex(e => new { e.NumSorteo, e.TipoLoteria }, "uk_datos_sorteo")
                    .IsUnique();

                entity.Property(e => e.IdInterno)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_interno");

                entity.Property(e => e.FechaHora).HasColumnName("fecha_hora");

                entity.Property(e => e.IdUsuario)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_usuario");

                entity.Property(e => e.NumSorteo)
                    .HasColumnType("int(11)")
                    .HasColumnName("num_sorteo");

                entity.Property(e => e.PlanPremios)
                    .HasColumnType("int(11)")
                    .HasColumnName("plan_premios");

                entity.Property(e => e.TipoLoteria)
                    .HasMaxLength(10)
                    .HasColumnName("tipo_loteria");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.DatosSorteos)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("datos_sorteo_ibfk_1");

                entity.HasOne(d => d.PlanPremiosNavigation)
                    .WithMany(p => p.DatosSorteos)
                    .HasForeignKey(d => d.PlanPremios)
                    .HasConstraintName("datos_sorteo_ibfk_3");

                entity.HasOne(d => d.TipoLoteriaNavigation)
                    .WithMany(p => p.DatosSorteos)
                    .HasForeignKey(d => d.TipoLoteria)
                    .HasConstraintName("datos_sorteo_ibfk_2");
            });

            modelBuilder.Entity<ListaChequeoDetalle>(entity =>
            {
                entity.ToTable("lista_chequeo_detalle");

                entity.HasIndex(e => e.TipoLoteria, "tipo_loteria");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .HasColumnType("varchar(5000)")
                    .HasColumnName("descripcion");

                entity.Property(e => e.TipoLoteria)
                    .HasMaxLength(10)
                    .HasColumnName("tipo_loteria");

                entity.HasOne(d => d.TipoLoteriaNavigation)
                    .WithMany(p => p.ListaChequeoDetalles)
                    .HasForeignKey(d => d.TipoLoteria)
                    .HasConstraintName("lista_chequeo_detalle_ibfk_1");
            });

            modelBuilder.Entity<ListaChequeoSorteo>(entity =>
            {
                entity.ToTable("lista_chequeo_sorteo");

                entity.HasIndex(e => e.IdChequeoDetalle, "id_chequeo_detalle");

                entity.HasIndex(e => e.IdDatoSorteo, "id_dato_sorteo");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.IdChequeoDetalle)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_chequeo_detalle");

                entity.Property(e => e.IdDatoSorteo)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_dato_sorteo");

                entity.Property(e => e.Verificado)
                    .HasColumnType("bit(1)")
                    .HasColumnName("verificado");

                entity.HasOne(d => d.IdChequeoDetalleNavigation)
                    .WithMany(p => p.ListaChequeoSorteos)
                    .HasForeignKey(d => d.IdChequeoDetalle)
                    .HasConstraintName("lista_chequeo_sorteo_ibfk_2");

                entity.HasOne(d => d.IdDatoSorteoNavigation)
                    .WithMany(p => p.ListaChequeoSorteos)
                    .HasForeignKey(d => d.IdDatoSorteo)
                    .HasConstraintName("lista_chequeo_sorteo_ibfk_1");
            });

            modelBuilder.Entity<Marchamo3monazo>(entity =>
            {
                entity.ToTable("marchamo_3monazos");

                entity.HasIndex(e => e.IdSorteo, "idSorteo_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.AperturaValijaA)
                    .HasMaxLength(45)
                    .HasColumnName("apertura_valija_A");

                entity.Property(e => e.AperturaValijaB)
                    .HasMaxLength(45)
                    .HasColumnName("apertura_valija_B");

                entity.Property(e => e.Contingencia)
                    .HasMaxLength(45)
                    .HasColumnName("contingencia");

                entity.Property(e => e.IdSorteo)
                    .HasColumnType("int(11)")
                    .HasColumnName("idSorteo");

                entity.HasOne(d => d.IdSorteoNavigation)
                    .WithMany(p => p.Marchamo3monazos)
                    .HasForeignKey(d => d.IdSorteo)
                    .HasConstraintName("idSorteo");
            });

            modelBuilder.Entity<MarchamoLotto>(entity =>
            {
                entity.ToTable("marchamo_lotto");

                entity.HasIndex(e => e.IdSorteo, "idSorteo_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Apertura)
                    .HasMaxLength(45)
                    .HasColumnName("apertura");

                entity.Property(e => e.Cierre)
                    .HasMaxLength(45)
                    .HasColumnName("cierre");

                entity.Property(e => e.Contingencia)
                    .HasMaxLength(45)
                    .HasColumnName("contingencia");

                entity.Property(e => e.IdSorteo)
                    .HasColumnType("int(11)")
                    .HasColumnName("idSorteo");

                entity.HasOne(d => d.IdSorteoNavigation)
                    .WithMany(p => p.MarchamoLottos)
                    .HasForeignKey(d => d.IdSorteo)
                    .HasConstraintName("id_Sorteo");
            });

            modelBuilder.Entity<MarchamoNtNtr>(entity =>
            {
                entity.ToTable("marchamo_nt_ntr");

                entity.HasIndex(e => e.IdSorteo, "idSorteo_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.AperturaNt)
                    .HasMaxLength(45)
                    .HasColumnName("aperturaNT");

                entity.Property(e => e.AperturaNtr)
                    .HasMaxLength(45)
                    .HasColumnName("aperturaNTR");

                entity.Property(e => e.CierreNt)
                    .HasMaxLength(45)
                    .HasColumnName("cierreNT");

                entity.Property(e => e.CierreNtr)
                    .HasMaxLength(45)
                    .HasColumnName("cierreNTR");

                entity.Property(e => e.Contingencia1Nt)
                    .HasMaxLength(45)
                    .HasColumnName("contingencia1NT");

                entity.Property(e => e.Contingencia1Ntr)
                    .HasMaxLength(45)
                    .HasColumnName("contingencia1NTR");

                entity.Property(e => e.Contingencia2Nt)
                    .HasMaxLength(45)
                    .HasColumnName("contingencia2NT");

                entity.Property(e => e.IdSorteo)
                    .HasColumnType("int(11)")
                    .HasColumnName("idSorteo");

                entity.HasOne(d => d.IdSorteoNavigation)
                    .WithMany(p => p.MarchamoNtNtrs)
                    .HasForeignKey(d => d.IdSorteo)
                    .HasConstraintName("idSort");
            });

            modelBuilder.Entity<MarchamoPopularNacional>(entity =>
            {
                entity.ToTable("marchamo_popular_nacional");

                entity.HasIndex(e => e.IdSorteo, "id_sorteo_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.AperturaAcumuladoFichero)
                    .HasMaxLength(45)
                    .HasColumnName("apertura_acumulado_fichero");

                entity.Property(e => e.AperturaAcumuladoTula)
                    .HasMaxLength(45)
                    .HasColumnName("apertura_acumulado_tula");

                entity.Property(e => e.AperturaNumero)
                    .HasMaxLength(45)
                    .HasColumnName("apertura_numero");

                entity.Property(e => e.AperturaPremio)
                    .HasMaxLength(45)
                    .HasColumnName("apertura_premio");

                entity.Property(e => e.AperturaSerie1)
                    .HasMaxLength(45)
                    .HasColumnName("apertura_serie1");

                entity.Property(e => e.AperturaSerie2)
                    .HasMaxLength(45)
                    .HasColumnName("apertura_serie2");

                entity.Property(e => e.AperturaSerie3)
                    .HasMaxLength(45)
                    .HasColumnName("apertura_serie3");

                entity.Property(e => e.AperturaSerie4)
                    .HasMaxLength(45)
                    .HasColumnName("apertura_serie4");

                entity.Property(e => e.CierreAcumuladoFichero)
                    .HasMaxLength(45)
                    .HasColumnName("cierre_acumulado_fichero");

                entity.Property(e => e.CierreAcumuladoTula)
                    .HasMaxLength(45)
                    .HasColumnName("cierre_acumulado_tula");

                entity.Property(e => e.CierreNumero)
                    .HasMaxLength(45)
                    .HasColumnName("cierre_numero");

                entity.Property(e => e.CierrePremio)
                    .HasMaxLength(45)
                    .HasColumnName("cierre_premio");

                entity.Property(e => e.CierreSeries)
                    .HasMaxLength(45)
                    .HasColumnName("cierre_series");

                entity.Property(e => e.IdSorteo)
                    .HasColumnType("int(11)")
                    .HasColumnName("idSorteo");

                entity.Property(e => e.TomoActua)
                    .HasMaxLength(45)
                    .HasColumnName("tomoActua");

                entity.Property(e => e.TomoAnterior)
                    .HasMaxLength(45)
                    .HasColumnName("tomoAnterior");

                entity.HasOne(d => d.IdSorteoNavigation)
                    .WithMany(p => p.MarchamoPopularNacionals)
                    .HasForeignKey(d => d.IdSorteo)
                    .HasConstraintName("id_sorteom");
            });

            modelBuilder.Entity<PlanPremio>(entity =>
            {
                entity.HasKey(e => e.IdPlan)
                    .HasName("PRIMARY");

                entity.ToTable("plan_premios");

                entity.Property(e => e.IdPlan)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_plan");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(200)
                    .HasColumnName("descripcion");
            });

            modelBuilder.Entity<PlanPremiosDetalle>(entity =>
            {
                entity.HasKey(e => e.NumPremio)
                    .HasName("PRIMARY");

                entity.ToTable("plan_premios_detalle");

                entity.HasIndex(e => e.IdPlan, "id_plan");

                entity.Property(e => e.NumPremio)
                    .HasColumnType("int(11)")
                    .HasColumnName("num_premio");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(200)
                    .HasColumnName("descripcion");

                entity.Property(e => e.FraccionEntero)
                    .HasColumnType("int(11)")
                    .HasColumnName("fraccion_entero");

                entity.Property(e => e.IdPlan)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_plan");

                entity.Property(e => e.MontoUnitario).HasColumnName("monto_unitario");

                entity.HasOne(d => d.IdPlanNavigation)
                    .WithMany(p => p.PlanPremiosDetalles)
                    .HasForeignKey(d => d.IdPlan)
                    .HasConstraintName("plan_premios_detalle_ibfk_1");
            });

            modelBuilder.Entity<Prueba>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("pruebas");

                entity.HasIndex(e => e.IdDatoSorteo, "id_dato_sorteo");

                entity.Property(e => e.Bolita)
                    .HasMaxLength(1)
                    .HasColumnName("bolita")
                    .IsFixedLength(true);

                entity.Property(e => e.IdDatoSorteo)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_dato_sorteo");

                entity.Property(e => e.Numero)
                    .HasMaxLength(3)
                    .HasColumnName("numero");

                entity.HasOne(d => d.IdDatoSorteoNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdDatoSorteo)
                    .HasConstraintName("pruebas_ibfk_1");
            });

            modelBuilder.Entity<RepFavorecidosUltimoAnno>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("rep_favorecidos_ultimo_anno");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(100)
                    .HasColumnName("descripcion");

                entity.Property(e => e.FechaHora).HasColumnName("fecha_hora");

                entity.Property(e => e.NumFavorecido)
                    .HasMaxLength(2)
                    .HasColumnName("num_favorecido");
            });

            modelBuilder.Entity<RepSorteoPorUsuario>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("rep_sorteo_por_usuario");

                entity.Property(e => e.FechaHora).HasColumnName("fecha_hora");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .HasColumnName("nombre");

                entity.Property(e => e.TipoLoteria)
                    .HasMaxLength(10)
                    .HasColumnName("tipo_loteria");
            });

            modelBuilder.Entity<RepVentasPorFecha>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("rep_ventas_por_fecha");

                entity.Property(e => e.DateDFechaHora)
                    .HasColumnType("date")
                    .HasColumnName("date(d.fecha_hora)");

                entity.Property(e => e.Ventas).HasColumnName("ventas");
            });

            modelBuilder.Entity<Representate>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("representates");

                entity.HasIndex(e => e.IdDatosPrevios, "id_Datos_Previos_idx");

                entity.Property(e => e.GOperaciones)
                    .HasMaxLength(45)
                    .HasColumnName("G_Operaciones");

                entity.Property(e => e.GProduccion)
                    .HasMaxLength(45)
                    .HasColumnName("G_Produccion");

                entity.Property(e => e.Gerencia).HasMaxLength(45);

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.IdDatosPrevios)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_Datos_Previos");

                entity.Property(e => e.Juez).HasMaxLength(45);

                entity.HasOne(d => d.IdDatosPreviosNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdDatosPrevios)
                    .HasConstraintName("id_Datos_Previos");
            });

            modelBuilder.Entity<Resultado>(entity =>
            {
                entity.HasKey(e => e.IdResultado)
                    .HasName("PRIMARY");

                entity.ToTable("resultados");

                entity.HasIndex(e => e.IdDatoSorteo, "id_dato_sorteo");

                entity.HasIndex(e => e.NumPremioPlan, "num_premio_plan");

                entity.Property(e => e.IdResultado)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_resultado");

                entity.Property(e => e.IdDatoSorteo)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_dato_sorteo");

                entity.Property(e => e.NumFavorecido)
                    .HasMaxLength(2)
                    .HasColumnName("num_favorecido");

                entity.Property(e => e.NumPremioPlan)
                    .HasColumnType("int(11)")
                    .HasColumnName("num_premio_plan");

                entity.Property(e => e.SeriePremio)
                    .HasMaxLength(3)
                    .HasColumnName("serie_premio");

                entity.Property(e => e.VerificaAcumulado)
                    .HasColumnType("bit(1)")
                    .HasColumnName("verificaAcumulado");

                entity.Property(e => e.Verificado)
                    .HasColumnType("bit(1)")
                    .HasColumnName("verificado");

                entity.HasOne(d => d.IdDatoSorteoNavigation)
                    .WithMany(p => p.Resultados)
                    .HasForeignKey(d => d.IdDatoSorteo)
                    .HasConstraintName("resultados_ibfk_1");

                entity.HasOne(d => d.NumPremioPlanNavigation)
                    .WithMany(p => p.Resultados)
                    .HasForeignKey(d => d.NumPremioPlan)
                    .HasConstraintName("resultados_ibfk_2");
            });

            modelBuilder.Entity<ResultadosBitacora>(entity =>
            {
                entity.HasKey(e => e.IdBit)
                    .HasName("PRIMARY");

                entity.ToTable("resultados_bitacora");

                entity.Property(e => e.IdBit)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_bit");

                entity.Property(e => e.AccBit)
                    .IsRequired()
                    .HasMaxLength(1)
                    .HasColumnName("acc_bit")
                    .IsFixedLength(true);

                entity.Property(e => e.FecBit)
                    .HasColumnType("date")
                    .HasColumnName("fec_bit");

                entity.Property(e => e.IdDatoSorteo)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_dato_sorteo");

                entity.Property(e => e.IdResultado)
                    .HasColumnType("int(11)")
                    .HasColumnName("id_resultado");

                entity.Property(e => e.NumFavorecido)
                    .HasMaxLength(2)
                    .HasColumnName("num_favorecido");

                entity.Property(e => e.NumPremioPlan)
                    .HasColumnType("int(11)")
                    .HasColumnName("num_premio_plan");

                entity.Property(e => e.SeriePremio)
                    .HasMaxLength(3)
                    .HasColumnName("serie_premio");

                entity.Property(e => e.UsuBit)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("usu_bit");

                entity.Property(e => e.Verificado)
                    .HasColumnType("bit(1)")
                    .HasColumnName("verificado");
            });

            modelBuilder.Entity<TipoLoterium>(entity =>
            {
                entity.HasKey(e => e.Codigo)
                    .HasName("PRIMARY");

                entity.ToTable("tipo_loteria");

                entity.Property(e => e.Codigo)
                    .HasMaxLength(10)
                    .HasColumnName("codigo");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(100)
                    .HasColumnName("descripcion");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuario");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Clave)
                    .HasMaxLength(100)
                    .HasColumnName("clave");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .HasColumnName("nombre");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
