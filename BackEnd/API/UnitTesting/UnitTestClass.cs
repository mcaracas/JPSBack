using Xunit;
using Microsoft.AspNetCore.Mvc;
using API;
using API.Utilidades;
using API.Controllers;

namespace API.UnitTesting
{
    public class UnitTestClass
    {
        //Pruebas Encriptacion
        [Fact]
        public void PassingDecryptTest()
        {
            Assert.Equal("Clave123.", Utilidades.Utilidades.Decrypt("VFkhpfIwlH+IvI0uHHzn3Q=="));
        }

        [Fact]
        public void FailingDecryptTest()
        {
            Assert.NotEqual("Clave123", Utilidades.Utilidades.Decrypt("VFkhpfIwlH+IvI0uHHzn3Q=="));
        }

        [Fact]
        public void PassingEncryptTest()
        {
            Assert.Equal("VFkhpfIwlH+IvI0uHHzn3Q==", Utilidades.Utilidades.Encrypt("Clave123."));
        }

        [Fact]
        public void FailingEncryptTest()
        {
            Assert.NotEqual("VFkhpfIwlH+IvI0uHHzn3Q", Utilidades.Utilidades.Encrypt("Clave123."));
        }


        //Pruebas de Login
        [Fact]
        public void PassingLoginTest()
        {
            var context = new proyecto_bdContext();
            var claveEncriptada = Utilidades.Utilidades.Encrypt("Clave123.");
            var usuario = context.Usuarios.FirstOrDefault(x => x.Usuario1 == "L0112345678" && x.Clave == claveEncriptada);
            Assert.NotNull(usuario);
        }

        [Fact]
        public void FailingLoginTest()
        {
            var context = new proyecto_bdContext();
            var claveEncriptada = Utilidades.Utilidades.Encrypt("Clave123");
            var usuario = context.Usuarios.FirstOrDefault(x => x.Usuario1 == "L0112345678" && x.Clave == claveEncriptada);
            Assert.Null(usuario);
        }

        //Pruebas de Pruebas
        [Fact]
        public void PassingPruebasGetTest()
        {
            var context = new proyecto_bdContext();
            var result = context.Pruebas.ToList();
            Assert.NotEmpty(result);
        }

        [Fact]
        public void PassingPruebasSorteoGet()
        {
            var context = new proyecto_bdContext();
            var pruebas = context.Pruebas.Where(x => x.IdDatoSorteo == 1).ToList();
            Assert.NotEmpty(pruebas);
        }

        [Fact]
        public void FailingPruebasSorteoGet()
        {
            var context = new proyecto_bdContext();
            var pruebas = context.Pruebas.Where(x => x.IdDatoSorteo == 99999996).ToList();
            Assert.Empty(pruebas);
        }

/*
        //Pruebas de Resultado
        [Fact]
        public void PassingResultadoGetTest()
        {
            var context = new proyecto_bdContext();
            var result = context.Resultados.ToList();
            Assert.NotEmpty(result);
        }

        [Fact]
        public void PassingResultadoSorteoGet()
        {
            var context = new proyecto_bdContext();
            var resultados = context.Resultados.Where(x => x.IdDatoSorteo == 1).ToList();
            Assert.NotEmpty(resultados);
        }

        [Fact]
        public void FailingResultadoSorteoGet()
        {
            var context = new proyecto_bdContext();
            var resultados = context.Resultados.Where(x => x.IdDatoSorteo == 99999996).ToList();
            Assert.Empty(resultados);
        }
        */

        //test de tomo folio
        [Fact]
        public void PassingTomoFolioGetTest()
        {
            var context = new proyecto_bdContext();
            var result = context.TomoFolios.ToList();
            Assert.NotEmpty(result);
        }

        [Fact]
        public void PassingTomoFolioGet()
        {
            var context = new proyecto_bdContext();
            var tomoFolios = context.TomoFolios.Where(x => x.IdTomoFolio == 1).ToList();
            Assert.NotEmpty(tomoFolios);
        }

        [Fact]
        public void FailingTomoFolioGet()
        {
            var context = new proyecto_bdContext();
            var tomoFolios = context.TomoFolios.Where(x => x.IdTomoFolio == 99999996).ToList();
            Assert.Empty(tomoFolios);
        }

        [Fact]
        public void PassingTomoFolioUltimoGet()
        {
            var context = new proyecto_bdContext();

            var DatosSorteo= context.DatosSorteos.FirstOrDefault(x => x.IdInterno == 1);
            if(DatosSorteo == null)
                return ;
            var TomoFolio = context.TomoFolios.Where(x => (x.IdDatoSorteoNavigation.TipoLoteria == DatosSorteo.TipoLoteria && x.Estado=="Activo")  ).OrderByDescending(x => x.Tomo).ThenByDescending(x =>x.Folio).FirstOrDefault();
            TomoFolio.IdDatoSorteoNavigation = null;
            Assert.NotNull(TomoFolio);
        }

        
    }
}