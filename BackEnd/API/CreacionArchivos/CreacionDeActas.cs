using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using iTextSharp.text;
//using iTextSharp.text.pdf;
using System.IO;
using System.Globalization;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace API.CreacionArchivos
{
    public static class CreacionDeActas
    {
        public static void CrearActa(DatosSorteo datosSorteo, string path)
        {
            switch (datosSorteo.TipoLoteria)
            {
                case "LP":
                    ActaLoteriaPopular.CrearActaLoteriaPopular(datosSorteo, path);
                    break;
                case "LN":
                    ActaLoteriaNacional.CrearActaLoteriaNacional(datosSorteo, path);
                    break;
                case "3M":
                    Acta3monazos.CrearActa3monazos(datosSorteo, path);
                    break;
                case "LTT":
                    ActaLotto.CrearActaLoteriaPopular(datosSorteo, path);
                    break;
                case "NT":
                    ActaNuevosTiempos.CrearActaNuevosTiempos(datosSorteo, path);
                    break;
                default:
                    break;
            }
        }
    }
}
