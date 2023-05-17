using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Globalization;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace API.CreacionArchivos
{
    public static class ActaLotto
    {
        public static void CrearActaLoteriaPopular(DatosSorteo sorteo,String path){
            var context = new proyecto_bdContext();

            //Obteniendo Texto Inicial del acta de la base de datos y reemplazando los valores para ponerle los correspondiente al sorteo
            string textoInicialActa = context.Parametros.FirstOrDefault(x => x.CodigoParametro == "TextoInicialActa").ParametroValor;
            string tipoSorteoDetallado = context.TipoLoteria.FirstOrDefault(x => x.Codigo == sorteo.TipoLoteria).Descripcion;
            textoInicialActa=textoInicialActa.Replace("{HORASORTEO}",sorteo.FechaHora.Value.ToString("h:mm tt"))
                                            .Replace("{DIASORTEO}",sorteo.FechaHora.Value.ToString("dddd d 'de' MMMM 'del' yyyy", new CultureInfo("es-ES")))
                                            .Replace("{TIPOSORTEO}",tipoSorteoDetallado)
                                            .Replace("{NUMSORTEO}",sorteo.NumSorteo.ToString() +" y el Premio Acumulado");


            //Obteniendo los resultados del sorteo y poniendolos en un string separado por comas    
            
            var Resultados = context.Resultados.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.tipoResultado.ToLower() == "lotto").ToList();
            var ResultadosRevancha = context.Resultados.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.tipoResultado.ToLower() == "lotto revancha").ToList();

            var resultadosString = string.Join(", ", Resultados.Select(r => r.NumFavorecido));
            resultadosString = resultadosString.TrimEnd(',', ' ');

            var resultadosRevanchaString = string.Join(", ", ResultadosRevancha.Select(r => r.NumFavorecido));
            resultadosRevanchaString = resultadosRevanchaString.TrimEnd(',', ' ');
            //USANDO OPENXML

            // Crea un documento de Word vacío
            using (WordprocessingDocument wordDocument =
                WordprocessingDocument.Create(path, WordprocessingDocumentType.Document))
            {
                // Agrega un cuerpo al documento
                MainDocumentPart mainPart = wordDocument.AddMainDocumentPart();
                mainPart.Document = new Document();
                Body body = new Body();
                mainPart.Document.Append(body);

                                //===========================
                // Agregar una sección con un encabezado
                var sectionProps = new SectionProperties();
                var headerReference = new HeaderReference()
                {
                    Type = HeaderFooterValues.Default,
                    Id = "headerId"
                };
                sectionProps.Append(headerReference);
                body.Append(sectionProps);

                var headerPart = mainPart.AddNewPart<HeaderPart>("headerId");
                headerPart.Header = new Header();

                // Agrega los titulos del encabezado
                string titulo = "AUDITORIA INTERNA";
                string titulo2 = "ACTA DE FISCALIZACION";
                string tituloSorteo = "SORTEO LOTTO N° {NUMSORTEO}";
                string dia = "{DIASORTEO}";
                tituloSorteo = tituloSorteo.Replace("{NUMSORTEO}", sorteo.NumSorteo.ToString());
                dia = dia.Replace( // Formato: "lunes 1 de enero del 2020"
                    "{DIASORTEO}",
                    sorteo.FechaHora.Value.ToString(
                        "dddd d 'de' MMMM 'del' yyyy",
                        new CultureInfo("es-ES")
                    )
                );

                // Agrega un párrafo al encabezado
                Paragraph paragraphHeader = headerPart.Header.AppendChild(new Paragraph());
                Run runHeader = paragraphHeader.AppendChild(new Run());
                runHeader.AppendChild(new Text(titulo));
                runHeader.AppendChild(new Break()); // Agrega un salto de línea
                runHeader.AppendChild(new Break());
                runHeader.AppendChild(new Text(titulo2));
                runHeader.AppendChild(new Break());
                runHeader.AppendChild(new Text(tituloSorteo));
                runHeader.AppendChild(new Break());
                runHeader.AppendChild(new Text(dia));
                UtilidadesActas.Negrita(runHeader);
                UtilidadesActas.JustificarCentro(paragraphHeader);

                //===========================

                //(1era pagina)
                //Agregando los parrafos del texto Inicial del Acta 
                string[] parrafos = textoInicialActa.Split("\n");
                foreach (string parrafo in parrafos)
                {
                    // Agrega un párrafo al cuerpo
                    Paragraph paragraph = body.AppendChild(new Paragraph());
                    Run runPara = paragraph.AppendChild(new Run());
                    runPara.AppendChild(new Text(parrafo+"\n"));

                    UtilidadesActas.CambiarFuente(runPara,"Calibri");
                    UtilidadesActas.CambiarTamano(runPara,"24");//Equivale a 12 en Word

                    UtilidadesActas.JustificarParrafo(paragraph);
                }             

                //Agregando los resultados del sorteo
                string resultados="Se concluye que el sorteo de {TIPOSORTEO} N° {NUMSORTEO} cuyos números ganadores fueron Lotto {GANADORES} y Lotto con Revancha {GANADORESREVANCHA}, presenta un resultado {RESULTADOACTA}";
                resultados = resultados.Replace("{TIPOSORTEO}",tipoSorteoDetallado)
                                        .Replace("{NUMSORTEO}",sorteo.NumSorteo.ToString())
                                        .Replace("{GANADORES}",resultadosString)
                                        .Replace("{GANADORESREVANCHA}",resultadosRevanchaString)
                                        .Replace("{RESULTADOACTA}","_____");
                Paragraph paragraphResultados = body.AppendChild(new Paragraph());
                Run runResultados = paragraphResultados.AppendChild(new Run());
                runResultados.AppendChild(new Text(resultados));
                

                //Agregando las observaciones 
                String observaciones = "Observaciones:{OBSERVACIONES}";
                observaciones = observaciones.Replace("{OBSERVACIONES}","___________________________________________"+
                "___________________________________________________________________________________________________");
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
                runGerencia.AppendChild(new Text("          ________________________________________"));
                runGerencia.AppendChild(new Break()); //Agregar un enter
                runGerencia.AppendChild(new Text("Recibido: Gerencia de Produccion y Comercializacion"));
            }
        }
    }
}