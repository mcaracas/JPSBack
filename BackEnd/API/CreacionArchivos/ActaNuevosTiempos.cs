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
    public static class ActaNuevosTiempos
    {
        public static void CrearActaNuevosTiempos(DatosSorteo sorteo, String path)
        {
            var context = new proyecto_bdContext();

            //Obteniendo Texto Inicial del acta de la base de datos y reemplazando los valores para ponerle los correspondiente al sorteo
            string textoInicialActa = context.Parametros
                .FirstOrDefault(x => x.CodigoParametro == "TextoInicialActa")
                .ParametroValor;
            string tipoSorteoDetallado = context.TipoLoteria
                .FirstOrDefault(x => x.Codigo == sorteo.TipoLoteria)
                .Descripcion;

            textoInicialActa = textoInicialActa
                .Replace("{HORASORTEO}", sorteo.FechaHora.Value.ToString("h:mm tt"))
                .Replace(
                    "{DIASORTEO}",
                    sorteo.FechaHora.Value.ToString(
                        "dddd d 'de' MMMM 'del' yyyy",
                        new CultureInfo("es-ES")
                    )
                )
                .Replace("{TIPOSORTEO}", tipoSorteoDetallado)
                .Replace("{NUMSORTEO}", sorteo.NumSorteo.ToString());

            //USANDO OPENXML

            // Crea un documento de Word vacío
            using (
                WordprocessingDocument wordDocument = WordprocessingDocument.Create(
                    path,
                    WordprocessingDocumentType.Document
                )
            )
            {
                // Agrega un cuerpo al documento
                MainDocumentPart mainPart = wordDocument.AddMainDocumentPart();
                mainPart.Document = new Document();
                Body body = new Body();
                mainPart.Document.Append(body);

                //(1era pagina)
                //Agregando los parrafos del texto Inicial del Acta
                string[] parrafos = textoInicialActa.Split("\n");
                foreach (string parrafo in parrafos)
                {
                    // Agrega un párrafo al cuerpo
                    Paragraph paragraph = body.AppendChild(new Paragraph());
                    Run runPara = paragraph.AppendChild(new Run());
                    runPara.AppendChild(new Text(parrafo + "\n"));

                    UtilidadesActas.CambiarFuente(runPara, "Calibri");
                    UtilidadesActas.CambiarTamano(runPara, "24"); //Equivale a 12 en Word

                    UtilidadesActas.JustificarParrafo(paragraph);
                }
                var numerosGanadores = context.Resultados
                    .Where(n => n.IdDatoSorteo == sorteo.IdInterno)
                    .ToList();
                string resultados =
                    "Se concluye que el sorteo de Lotería Nuevos Tiempos N° {NUMSORTEO}, cuyo número ganador fue {RESULTADO} y el sorteo Nuevos Tiempos modalidad Reventados fue bolita {BOLITA}, y presenta un resultado {RESULTADOREVENTADO}.";
                resultados = resultados.Replace("{NUMSORTEO}", sorteo.NumSorteo.ToString());
                resultados = resultados.Replace(
                    "{RESULTADO}",
                    numerosGanadores[0].NumFavorecido.ToString()
                );
                Paragraph paragraphResultados = body.AppendChild(new Paragraph());
                Run runResultados = paragraphResultados.AppendChild(new Run());
                runResultados.AppendChild(new Text(resultados));

                //Agregando las observaciones
                String observaciones = "Observaciones:{OBSERVACIONES}";
                observaciones = observaciones.Replace(
                    "{OBSERVACIONES}",
                    "___________________________________________"
                        + "___________________________________________________________________________________________________"
                );
                Paragraph paragraphObservaciones = body.AppendChild(new Paragraph());
                Run runObservaciones = paragraphObservaciones.AppendChild(new Run());
                runObservaciones.AppendChild(new Text(observaciones));

                Paragraph paragraphFirma = body.AppendChild(new Paragraph());
                UtilidadesActas.JustificarDerecha(paragraphFirma);
                Run runFirma = paragraphFirma.AppendChild(new Run());
                runFirma.AppendChild(new Text("____________________________________"));
                runFirma.AppendChild(new Break()); //Agregar un enter
                runFirma.AppendChild(new Text("Fiscalizador de la Auditoria Interna"));
                runFirma.AppendChild(new Break());
                runFirma.AppendChild(new Break());

                Paragraph paragraphFirmaGerencia = body.AppendChild(new Paragraph());
                Run runGerencia = paragraphFirmaGerencia.AppendChild(new Run());
                runGerencia.AppendChild(
                    new Text("          ________________________________________")
                );
                runGerencia.AppendChild(new Break()); //Agregar un enter
                runGerencia.AppendChild(
                    new Text("Recibido: Gerencia de Produccion y Comercializacion")
                );
                runGerencia.AppendChild(new Break());

                string infoBolita =
                    "R = Reventada bolita roja, B = Bolita blanca, G = Reventada 80x bolita gris.";
                string infoResultado = "C = Conforme, S = Con salvedad.";

                Paragraph paragraphInfo = body.AppendChild(new Paragraph());
                Run runInfo = paragraphInfo.AppendChild(new Run());
                runInfo.AppendChild(new Text(infoBolita));
                runInfo.AppendChild(new Break());
                runInfo.AppendChild(new Text(infoResultado));
                runInfo.AppendChild(new Break());
            }
        }
    }
}
