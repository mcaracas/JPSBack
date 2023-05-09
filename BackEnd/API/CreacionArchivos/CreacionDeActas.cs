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
                    //CrearActaLoteriaChances(datosSorteo, path);
                    break;
                case "3M":
                    //CrearActaLoteriaBilletes(datosSorteo, path);
                    break;
                case "LTT":
                    //CrearActaLoteriaBilletesChances(datosSorteo, path);
                    break;
                case "NV":
                    //CrearActaLoteriaBilletesChances(datosSorteo, path);
                default:
                    break;
            }

        }        
        
     
    }
        

    
}