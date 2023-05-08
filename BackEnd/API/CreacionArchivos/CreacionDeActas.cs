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
                    CrearActaLoteriaNacional(datosSorteo, path);
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

        private static void CrearActaLoteriaNacional(DatosSorteo sorteo,String path){
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

                //(1era pagina)
                //Agregando los parrafos del texto Inicial del Acta 
                string[] parrafos = textoInicialActa.Split("\n");
                foreach (string parrafo in parrafos)
                {
                    // Agrega un párrafo al cuerpo
                    Paragraph paragraph = body.AppendChild(new Paragraph());
                    Run runPara = paragraph.AppendChild(new Run());
                    runPara.AppendChild(new Text(parrafo+"\n"));

                    CambiarFuente(runPara,"Calibri");
                    CambiarTamano(runPara,"24");//Equivale a 12 en Word

                    JustificarParrafo(paragraph);
                }
                AgregarSaltoPagina(body);



                //(2da pagina)
                //Agregando las observaciones 
                String observaciones = "Observaciones:{OBSERVACIONES}";
                Paragraph paragraphObservaciones = body.AppendChild(new Paragraph());
                Run runObservaciones = paragraphObservaciones.AppendChild(new Run());
                runObservaciones.AppendChild(new Text(observaciones));

                Paragraph paragraphFirma = body.AppendChild(new Paragraph());
                JustificarDerecha(paragraphFirma);
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
                AgregarSaltoPagina(body);



                //(3era pagina)
                //Objetivos y Normativa
                string ObjetivosActa = context.Parametros.FirstOrDefault(x => x.CodigoParametro == "ObjetivosActa").ParametroValor;
                string[] parrafosObjetivos = ObjetivosActa.Split("\n");
                foreach (string parrafo in parrafosObjetivos)
                {
                    // Agrega un párrafo al cuerpo
                    Paragraph paragraph = body.AppendChild(new Paragraph());
                    Run runPara = paragraph.AppendChild(new Run());
                    runPara.AppendChild(new Text(parrafo+"\n"));

                    CambiarFuente(runPara,"Calibri");
                    CambiarTamano(runPara,"24");//Equivale a 12 en Word
                    if (parrafo.ToLower().Contains("objetivo"))
                    {
                        Negrita(runPara);
                    }

                    JustificarParrafo(paragraph);
                }


                string Normativa = context.Parametros.FirstOrDefault(x => x.CodigoParametro == "NormativaActaLoteriaPopular").ParametroValor;
                Normativa=Normativa.Replace("{DIASORTEO}",sorteo.FechaHora.Value.ToString("dddd d 'de' MMMM 'del' yyyy", new CultureInfo("es-ES")))
                                    .Replace("{TIPOSORTEO}",tipoSorteoDetallado)
                                    .Replace("{NUMSORTEO}",sorteo.NumSorteo.ToString());
                string[] parrafosNormativa = Normativa.Split("\n");
                foreach (string parrafo in parrafosNormativa)
                {
                    // Agrega un párrafo al cuerpo
                    Paragraph paragraph = body.AppendChild(new Paragraph());
                    Run runPara = paragraph.AppendChild(new Run());
                    runPara.AppendChild(new Text(parrafo+"\n"));

                    CambiarFuente(runPara,"Calibri");
                    CambiarTamano(runPara,"24");//Equivale a 12 en Word
                    if (parrafo.ToLower().Contains("normativa aplicable") || parrafo.ToLower().Contains("alcance:"))
                    {
                        Negrita(runPara);
                    }

                    JustificarParrafo(paragraph);
                }

                Paragraph paragraphFirmaNormativa = body.AppendChild(new Paragraph());
                JustificarCentro(paragraphFirmaNormativa);
                Run runFirmaNormativa = paragraphFirmaNormativa.AppendChild(new Run());
                runFirmaNormativa.AppendChild(new Text("____________________________________"));
                runFirmaNormativa.AppendChild(new Break()); //Agregar un enter
                runFirmaNormativa.AppendChild(new Text("Fiscalizador de la Auditoria Interna"));
                runFirmaNormativa.AppendChild(new Break());
                runFirmaNormativa.AppendChild(new Break());
                AgregarSaltoPagina(body);



                //(5ta pagina)
                //Agregando los parrafos para los procedimientos
                var procedimientosPrevios = context.RepListaChequeoActa.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.TipoListaChequeo == "previo").ToList().OrderBy(x=>x.Orden);
                var procedimientosDurante = context.RepListaChequeoActa.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.TipoListaChequeo == "durante").ToList().OrderBy(x=>x.Orden);
                var procedimientosPosterior = context.RepListaChequeoActa.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.TipoListaChequeo == "posterior").ToList().OrderBy(x=>x.Orden);
                var procedimientosSolicitud = context.RepListaChequeoActa.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.TipoListaChequeo == "solicitud").ToList().OrderBy(x=>x.Orden);
                var procedimientosGeneracion = context.RepListaChequeoActa.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.TipoListaChequeo == "generacion").ToList().OrderBy(x=>x.Orden);



                //Creando las tablas de PROCEDIMIENTOS
                CrearTablaProcedimientos(body,procedimientosPrevios);
                AgregarSaltoPagina(body);
                CrearTablaProcedimientos(body,procedimientosDurante);
                AgregarSaltoPagina(body);
                CrearTablaProcedimientos(body,procedimientosPosterior);
                AgregarSaltoPagina(body);
                CrearTablaProcedimientos(body,procedimientosSolicitud);
                AgregarSaltoPagina(body);
                CrearTablaProcedimientos(body,procedimientosGeneracion);
                AgregarSaltoPagina(body);



                /*
                //Creando la tabla de PROCEDIMIENTOS PREVIOS
                Table tablePrevio = new Table();
                TableProperties tablePropertiesPrevio = new TableProperties();            
                tablePrevio.AppendChild(tablePropertiesPrevio);



                // Establecer ancho de columna fijo
                TableGrid tg = new TableGrid(new GridColumn() { Width = "1500" }, new GridColumn() { Width = "1500" });
                tablePrevio.AppendChild(tg);

                // Agregar estilo a la tabla
                TableStyle tableStyle = new TableStyle() { Val = "TableGrid" };
                tablePrevio.AppendChild(tableStyle);

                // Agregar borde a la tabla
                TableBorders tableBorders = new TableBorders(
                    new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new InsideHorizontalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new InsideVerticalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 }
                );
                tablePropertiesPrevio.AppendChild(tableBorders);



                // Agregar encabezado a la tabla
                TableRow tableHeaderRowPrevio = new TableRow();
                tablePrevio.AppendChild(tableHeaderRowPrevio);

                TableCell tableHeaderPrevioCell1 = new TableCell();
                tableHeaderRowPrevio.AppendChild(tableHeaderPrevioCell1);
                Paragraph procedimientoPrevioHeader = new Paragraph(new Run(new Text("Procedimiento")));
                JustificarCentro(procedimientoPrevioHeader);
                tableHeaderPrevioCell1.Append(procedimientoPrevioHeader);

                TableCell tableHeaderPrevioCell2 = new TableCell();
                tableHeaderRowPrevio.AppendChild(tableHeaderPrevioCell2);
                Paragraph chequeoPrevioHeader = new Paragraph(new Run(new Text("Chequeo")));
                JustificarCentro(chequeoPrevioHeader);
                tableHeaderPrevioCell2.Append(chequeoPrevioHeader);


                // Llenar los datos de la tabla
                foreach (var procPrevio in procedimientosPrevios)
                {
                    TableRow tableDataRow = new TableRow();
                    tablePrevio.AppendChild(tableDataRow);

                    TableCell tableDataCell1 = new TableCell();
                    tableDataRow.AppendChild(tableDataCell1);
                    Paragraph procedimientoData = new Paragraph(new Run(new Text(procPrevio.Descripcion)));
                    JustificarParrafo(procedimientoData);
                    tableDataCell1.Append(procedimientoData);
                    tableDataCell1.Append(new TableCellProperties(new TableCellMargin
                    {
                        LeftMargin = new LeftMargin { Width = "100" },
                        RightMargin = new RightMargin { Width = "100" },
                        TopMargin = new TopMargin { Width = "0" },
                        BottomMargin = new BottomMargin { Width = "0" }
                    }));

                    TableCell tableDataCell2 = new TableCell();
                    tableDataRow.AppendChild(tableDataCell2);
                    Paragraph chequeoData = new Paragraph(new Run(new Text(procPrevio.Verificado)));
                    tableDataCell2.Append(chequeoData);
                    tableDataCell2.Append(new TableCellProperties(new TableCellMargin
                    {
                        LeftMargin = new LeftMargin { Width = "100" },
                        RightMargin = new RightMargin { Width = "100" },
                        TopMargin = new TopMargin { Width = "0" },
                        BottomMargin = new BottomMargin { Width = "0" }
                    }));
                }

                body.AppendChild(tablePrevio);   
                */         
            }   
        }    

        private static void CrearTablaProcedimientos(Body body, IOrderedEnumerable<RepListaChequeoActum> procedimientos){
            //Creando la tabla de PROCEDIMIENTOS
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

            // Agregar encabezado a la tabla   
            TableRow tableHeaderRow = new TableRow();
            table.AppendChild(tableHeaderRow);

            TableCell tableHeaderCell1 = new TableCell();
            tableHeaderRow.AppendChild(tableHeaderCell1);
            Paragraph procedimientoHeader = new Paragraph(new Run(new Text("Procedimiento")));
            JustificarCentro(procedimientoHeader);
            tableHeaderCell1.Append(procedimientoHeader);

            TableCell tableHeaderCell2 = new TableCell();
            tableHeaderRow.AppendChild(tableHeaderCell2);
            Paragraph chequeoHeader = new Paragraph(new Run(new Text("Chequeo")));
            JustificarCentro(chequeoHeader);
            tableHeaderCell2.Append(chequeoHeader);


            // Llenar los datos de la tabla
            foreach (var proc in procedimientos)
            {
                TableRow tableDataRow = new TableRow();
                table.AppendChild(tableDataRow);

                TableCell tableDataCell1 = new TableCell();
                tableDataRow.AppendChild(tableDataCell1);
                Paragraph procedimientoData = new Paragraph(new Run(new Text(proc.Descripcion)));
                JustificarParrafo(procedimientoData);
                tableDataCell1.Append(procedimientoData);
                tableDataCell1.Append(new TableCellProperties(new TableCellMargin
                {
                    LeftMargin = new LeftMargin { Width = "100" },
                    RightMargin = new RightMargin { Width = "100" },
                    TopMargin = new TopMargin { Width = "0" },
                    BottomMargin = new BottomMargin { Width = "0" }
                }));

                TableCell tableDataCell2 = new TableCell();
                tableDataRow.AppendChild(tableDataCell2);
                Paragraph chequeoData = new Paragraph(new Run(new Text(proc.Verificado)));
                tableDataCell2.Append(chequeoData);
                tableDataCell2.Append(new TableCellProperties(new TableCellMargin
                {
                    LeftMargin = new LeftMargin { Width = "100" },
                    RightMargin = new RightMargin { Width = "100" },
                    TopMargin = new TopMargin { Width = "0" },
                    BottomMargin = new BottomMargin { Width = "0" }
                }));
            }

            body.AppendChild(table);
        }







        #region Utilidades Documento
        private static void AgregarSaltoPagina (Body body){
            // Agrega un salto de página al cuerpo
            Paragraph breakParagraph = new Paragraph(new Run(new Break() { Type = BreakValues.Page }));
            body.Append(breakParagraph);
        }  

         private static void CambiarFuente(Run run, string fuente){
            // Establece la fuente del texto
            RunProperties runProperties = new RunProperties();
            RunFonts runFonts = new RunFonts() { Ascii = fuente };
            runProperties.Append(runFonts);
            run.PrependChild(runProperties);
        }

        private static void CambiarTamano(Run run, string tamano){
            // Establece el tamaño de la letra del texto
            RunProperties runProperties = new RunProperties();
            FontSize fontSize = new FontSize() { Val = tamano };
            runProperties.Append(fontSize);
            run.PrependChild(runProperties);
        }   

        private static void Negrita(Run run){
            // Pone el texto de TODO el parrafo en Negrita
            RunProperties runProperties = new RunProperties();
            Bold bold = new Bold();
            runProperties.Append(bold);
            run.PrependChild(runProperties);
        }

        private static void JustificarParrafo(Paragraph paragraph){
            // Justifica el texto del párrafo
            paragraph.ParagraphProperties = new ParagraphProperties(
                new Justification() { Val = JustificationValues.Both });
        }

        private static void JustificarDerecha(Paragraph paragraph){
            // Justifica el texto del párrafo a la derecha
            paragraph.ParagraphProperties = new ParagraphProperties(
                new Justification() { Val = JustificationValues.Right });
        }

        private static void JustificarCentro(Paragraph paragraph){
            // Justifica el texto del párrafo al centro
            paragraph.ParagraphProperties = new ParagraphProperties(
                new Justification() { Val = JustificationValues.Center });
        }
        #endregion

        

       

        
    }
        

    
}


/*
USANDO ITEXTSHARP
// Crear un objeto Rectangle con dimensiones de "letter"
Rectangle pageSize = PageSize.LETTER;

// Crear un documento
Document documento = new Document(pageSize);

// Establecer los márgenes
documento.SetMargins(144, 144, 144, 144); // 72 píxeles = 1 pulgada

// Crear documento PDF
Document document = new Document();
PdfWriter writer = PdfWriter.GetInstance(document, new FileStream(path, FileMode.Create));
document.Open();

// Parte el textoInicialActa en parrafos para agregarles el formato
string[] parrafos = textoInicialActa.Split("\n");

foreach (string parrafo in parrafos)
{
    // Escribir parrafos en el PDF
    Paragraph paragraph = new Paragraph(parrafo+ "\n" );
    paragraph.Alignment = Element.ALIGN_JUSTIFIED; //Parrafo Justificado
    paragraph.SpacingAfter = 10f; //Espacio despues del parrafo
    document.Add(paragraph);
}

// Escribir texto en el PDF
// Paragraph paragraph = new Paragraph(textoInicialActa);
// paragraph.Alignment = Element.ALIGN_JUSTIFIED; //Parrago Justificado
// document.Add(paragraph);

// Cerrar documento
document.Close();
*/      