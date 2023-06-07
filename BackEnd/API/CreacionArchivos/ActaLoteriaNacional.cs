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
    public static class ActaLoteriaNacional
    {
        public static void CrearActaLoteriaNacional(DatosSorteo sorteo,String path){
            var context = new proyecto_bdContext();

            //Obteniendo Texto Inicial del acta de la base de datos y reemplazando los valores para ponerle los correspondiente al sorteo
            string textoInicialActa = context.Parametros.FirstOrDefault(x => x.CodigoParametro == "TextoInicialActa").ParametroValor;
            string tipoSorteoDetallado = context.TipoLoteria.FirstOrDefault(x => x.Codigo == sorteo.TipoLoteria).Descripcion;
            textoInicialActa=textoInicialActa.Replace("{HORASORTEO}",sorteo.FechaHora.Value.ToString("h:mm tt"))
                                            .Replace("{DIASORTEO}",sorteo.FechaHora.Value.ToString("dddd d 'de' MMMM 'del' yyyy", new CultureInfo("es-ES")))
                                            .Replace("{TIPOSORTEO}",tipoSorteoDetallado)
                                            .Replace("{NUMSORTEO}",sorteo.NumSorteo.ToString() +" y el Premio Acumulado");

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
                string tituloSorteo = "SORTEO LOTERIA NACIONAL N° {NUMSORTEO}";
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
                InsertarSeccionGanadores(body,sorteo,tipoSorteoDetallado);
                UtilidadesActas.AgregarSaltoPagina(body);



                //(2da pagina)
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
        #region METODOS PARA LOTERIA NACIONAL
        private static void InsertarSeccionGanadores(Body body, DatosSorteo sorteo, string tipoSorteo){
            var context = new proyecto_bdContext();
            var numerosGanadores = context.Resultados.Where(n => n.IdDatoSorteo == sorteo.IdInterno).ToList();
            
            //Agregando los parrafos antes de la tbla de los numeros ganadores
            Paragraph paragraphGanadores = body.AppendChild(new Paragraph());
            Run runGanadores = paragraphGanadores.AppendChild(new Run());
            runGanadores.AppendChild(new Text($"Los numeros gandores del sorteo de {tipoSorteo} N° {sorteo.NumSorteo.ToString()} fueron:"));

            

            //Creando la tabla
            //Agregando Estilos y propiedades
            Table table = new Table();
            TableProperties tableProperties = new TableProperties();            
            table.AppendChild(tableProperties);

            // Establecer ancho de columna fijo
            TableGrid tg = new TableGrid(new GridColumn() { Width = "1500" }, new GridColumn() { Width = "1500" });
            table.AppendChild(tg);

            // Agregar estilo a la tabla
            TableStyle tableStyle = new TableStyle() { Val = "TableGrid" };
            table.AppendChild(tableStyle);

            // Agregar borde a la tabla
            TableBorders tableBorders = new TableBorders(
                new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                new InsideHorizontalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                new InsideVerticalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 }
            );
            table.AppendChild(tableBorders);



            // Construyendo la tabla   

            
            //ROW 1
            TableRow tableDataRow = new TableRow();
            table.AppendChild(tableDataRow);

            TableCellProperties tableCellPropertiesHeader = new TableCellProperties();
            tableCellPropertiesHeader.GridSpan = new GridSpan() { Val = 4 };
            TableCell tableDataCell1 = new TableCell();
            tableDataRow.AppendChild(tableDataCell1);
            Paragraph loteriaData = new Paragraph(new Run(new Text("LOTERÍA NACIONAL")));
            UtilidadesActas.JustificarCentro(loteriaData);
            tableDataCell1.AppendChild(loteriaData);
            tableDataCell1.Append(tableCellPropertiesHeader);
            tableDataCell1.Append(UtilidadesActas.CrearMargenCeldas());

            //ROW 2

            TableRow tableDataRow2 = new TableRow();
            table.AppendChild(tableDataRow2);

            TableCell tableDataCell21 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell21);
            Paragraph sorteoData21 = new Paragraph(new Run(new Text($"")));
            tableDataCell21.AppendChild(sorteoData21);
            tableDataCell21.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell22 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell22);
            Paragraph sorteoData22 = new Paragraph(new Run(new Text($"Serie")));
            tableDataCell22.AppendChild(sorteoData22);
            UtilidadesActas.JustificarCentro(sorteoData22);
            tableDataCell22.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell23 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell23);
            Paragraph sorteoData23 = new Paragraph(new Run(new Text($"Numero")));
            tableDataCell23.AppendChild(sorteoData23);
            UtilidadesActas.JustificarCentro(sorteoData23);
            tableDataCell23.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 3
            TableRow tableDataRow3 = new TableRow();
            table.AppendChild(tableDataRow3);

            TableCell tableDataCell31 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell31);
            Paragraph sorteoData31 = new Paragraph(new Run(new Text($"Primero premio")));
            tableDataCell31.AppendChild(sorteoData31);
            tableDataCell31.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell32 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell32);
            Paragraph sorteoData32 = new Paragraph(new Run(new Text(numerosGanadores.Where(n => n.tipoResultado == "Premio Mayor").FirstOrDefault().SeriePremio)));
            UtilidadesActas.JustificarCentro(sorteoData32);
            tableDataCell32.AppendChild(sorteoData32);
            tableDataCell32.Append(UtilidadesActas.CrearMargenCeldas());


            TableCell tableDataCell33 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell33);
            Paragraph sorteoData33 = new Paragraph(new Run(new Text(numerosGanadores.Where(n => n.tipoResultado == "Premio Mayor").FirstOrDefault().NumFavorecido)));
            tableDataCell33.AppendChild(sorteoData33);
            UtilidadesActas.JustificarCentro(sorteoData33);
            tableDataCell33.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 4
            TableRow tableDataRow4 = new TableRow();
            table.AppendChild(tableDataRow4);

            TableCell tableDataCell41 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell41);
            Paragraph sorteoData41 = new Paragraph(new Run(new Text("Segundo premio")));
            tableDataCell41.AppendChild(sorteoData41);
            tableDataCell41.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell42 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell42);
            Paragraph sorteoData42 = new Paragraph(new Run(new Text(numerosGanadores.Where(n => n.tipoResultado == "Segundo Premio").FirstOrDefault().SeriePremio)));
            tableDataCell42.AppendChild(sorteoData42);
            UtilidadesActas.JustificarCentro(sorteoData42);
            tableDataCell42.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell43 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell43);
            Paragraph sorteoData43 = new Paragraph(new Run(new Text(numerosGanadores.Where(n => n.tipoResultado == "Segundo Premio").FirstOrDefault().NumFavorecido)));
            tableDataCell43.AppendChild(sorteoData43);
            UtilidadesActas.JustificarCentro(sorteoData43);
            tableDataCell43.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 5
            TableRow tableDataRow5 = new TableRow();
            table.AppendChild(tableDataRow5);

            TableCell tableDataCell51 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell51);
            Paragraph sorteoData51 = new Paragraph(new Run(new Text($"Tercer premio")));
            tableDataCell51.AppendChild(sorteoData51);
            tableDataCell51.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell52 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell52);
            Paragraph sorteoData52 = new Paragraph(new Run(new Text(numerosGanadores.Where(n => n.tipoResultado == "Tercer Premio").FirstOrDefault().SeriePremio)));
            tableDataCell52.AppendChild(sorteoData52);
            UtilidadesActas.JustificarCentro(sorteoData52);
            tableDataCell52.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell53 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell53);
            Paragraph sorteoData53 = new Paragraph(new Run(new Text(numerosGanadores.Where(n => n.tipoResultado == "Tercer Premio").FirstOrDefault().NumFavorecido)));
            tableDataCell53.AppendChild(sorteoData53);
            UtilidadesActas.JustificarCentro(sorteoData53);
            tableDataCell53.Append(UtilidadesActas.CrearMargenCeldas());

            body.Append(table);

            UtilidadesActas.AgregarEnter(body);

            var montoAcumuladoProximo = context.Acumulados.Where(x => x.TipoLoteria == "Pop_Nac").FirstOrDefault().Monto;

            var parrafoPremios = context.Parametros.Where(x => x.CodigoParametro == "ParrafoPremiosLoteriaPopular").FirstOrDefault().ParametroValor;
            parrafoPremios = parrafoPremios.Replace("{CANTIDADBOLITAACUMULADO1}", "______")
                                            .Replace("{CANTIDADBOLITAACUMULADO2}", "______")
                                            .Replace("{PREMIOBOLITA1}", "____________")
                                            .Replace("{PREMIOBOLITA2}", "____________")
                                            .Replace("{MONTOPROXIMOACUMULADO}", montoAcumuladoProximo.ToString())
                                            .Replace("{CANTIDADPROXIMABOLITAS}", "______")
                                            .Replace("{RESULTADOFISCALIZACION}", "C");


            Paragraph paragraphPremios = body.AppendChild(new Paragraph());
            Run runPremios = paragraphPremios.AppendChild(new Run());
            UtilidadesActas.JustificarParrafo(paragraphPremios);
            runPremios.AppendChild(new Text(parrafoPremios));      

        
        }
    }
    #endregion
}