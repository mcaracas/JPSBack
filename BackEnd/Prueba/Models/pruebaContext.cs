using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace APISAPROFA
{
    public partial class pruebaContext : DbContext
    {
        public pruebaContext()
        {
        }

        public pruebaContext(DbContextOptions<pruebaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Csexo> Csexos { get; set; }
        public virtual DbSet<Gente> Gentes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySQL("server=proyecto-inge2022.mysql.database.azure.com;userid=saprofa;password=ProyectoInge2022!;database=prueba");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Csexo>(entity =>
            {
                entity.HasKey(e => e.IdSexo)
                    .HasName("PRIMARY");

                entity.ToTable("csexo");

                entity.Property(e => e.IdSexo)
                    .HasColumnType("int(11)")
                    .HasColumnName("idSexo");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(30)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Gente>(entity =>
            {
                entity.ToTable("gente");

                entity.HasIndex(e => e.IdSexo, "idSexo");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.IdSexo)
                    .HasColumnType("int(11)")
                    .HasColumnName("idSexo");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(30)
                    .HasColumnName("nombre");

                entity.HasOne(d => d.IdSexoNavigation)
                    .WithMany(p => p.Gentes)
                    .HasForeignKey(d => d.IdSexo)
                    .HasConstraintName("gente_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
