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
    public static class ActaLoteriaPopular
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

                    UtilidadesActas.CambiarFuente(runPara,"Calibri");
                    UtilidadesActas.CambiarTamano(runPara,"24");//Equivale a 12 en Word

                    UtilidadesActas.JustificarParrafo(paragraph);
                }
                UtilidadesActas.AgregarSaltoPagina(body);



                //(2da pagina)
                //Agregando las observaciones 
                String observaciones = "Observaciones:{OBSERVACIONES}";
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
                UtilidadesActas.AgregarSaltoPagina(body);



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

                    UtilidadesActas.CambiarFuente(runPara,"Calibri");
                    UtilidadesActas.CambiarTamano(runPara,"24");//Equivale a 12 en Word
                    if (parrafo.ToLower().Contains("objetivo"))
                    {
                        UtilidadesActas.Negrita(runPara);
                    }

                    UtilidadesActas.JustificarParrafo(paragraph);
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

                    UtilidadesActas.CambiarFuente(runPara,"Calibri");
                    UtilidadesActas.CambiarTamano(runPara,"24");//Equivale a 12 en Word
                    if (parrafo.ToLower().Contains("normativa aplicable") || parrafo.ToLower().Contains("alcance:"))
                    {
                        UtilidadesActas.Negrita(runPara);
                    }

                    UtilidadesActas.JustificarParrafo(paragraph);
                }

                Paragraph paragraphFirmaNormativa = body.AppendChild(new Paragraph());
                UtilidadesActas.JustificarCentro(paragraphFirmaNormativa);
                Run runFirmaNormativa = paragraphFirmaNormativa.AppendChild(new Run());
                runFirmaNormativa.AppendChild(new Text("____________________________________"));
                runFirmaNormativa.AppendChild(new Break()); //Agregar un enter
                runFirmaNormativa.AppendChild(new Text("Fiscalizador de la Auditoria Interna"));
                runFirmaNormativa.AppendChild(new Break());
                runFirmaNormativa.AppendChild(new Break());
                UtilidadesActas.AgregarSaltoPagina(body);



                //(5ta pagina)
                //Agregando los parrafos para los procedimientos
                var procedimientosPrevios = context.RepListaChequeoActa.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.TipoListaChequeo == "previo").ToList().OrderBy(x=>x.Orden);
                var procedimientosDurante = context.RepListaChequeoActa.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.TipoListaChequeo == "durante").ToList().OrderBy(x=>x.Orden);
                var procedimientosPosterior = context.RepListaChequeoActa.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.TipoListaChequeo == "posterior").ToList().OrderBy(x=>x.Orden);
                var procedimientosSolicitud = context.RepListaChequeoActa.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.TipoListaChequeo == "solicitud").ToList().OrderBy(x=>x.Orden);
                var procedimientosGeneracion = context.RepListaChequeoActa.Where(x => x.IdDatoSorteo == sorteo.IdInterno && x.TipoListaChequeo == "generacion").ToList().OrderBy(x=>x.Orden);


                Paragraph paragraphProcedimientosInicial = body.AppendChild(new Paragraph());
                UtilidadesActas.JustificarParrafo(paragraphProcedimientosInicial);
                Run runProcedimientosInicial = paragraphProcedimientosInicial.AppendChild(new Run());
                runProcedimientosInicial.AppendChild(new Text("Procedimientos de autitoria por aplicar:"));
                UtilidadesActas.Negrita(runProcedimientosInicial);
                

                //Creando las tablas de PROCEDIMIENTOS
                UtilidadesActas.CrearTablaProcedimientos(body,procedimientosPrevios,"Previo al sorteo:");
                UtilidadesActas.AgregarSaltoPagina(body);
                UtilidadesActas.CrearTablaProcedimientos(body,procedimientosDurante,"Durante al sorteo:");
                UtilidadesActas.AgregarSaltoPagina(body);
                UtilidadesActas.CrearTablaProcedimientos(body,procedimientosPosterior,"Posterior al sorteo:");
                UtilidadesActas.AgregarSaltoPagina(body);
                UtilidadesActas.CrearTablaProcedimientos(body,procedimientosSolicitud,"Información que debe solicitarse a la Gerencia de Producción y Comercialización:");
                UtilidadesActas.AgregarSaltoPagina(body);
                UtilidadesActas.CrearTablaProcedimientos(body,procedimientosGeneracion,"Información que debe generar la Auditoría Interna:");
                UtilidadesActas.AgregarSaltoPagina(body);



                //(6ta pagina)
                //Conclusiones

                Paragraph paragraphConclusionesTitulo = body.AppendChild(new Paragraph());
                Run runConclusionesTitulo = paragraphConclusionesTitulo.AppendChild(new Run());
                runConclusionesTitulo.AppendChild(new Text("Conclusiones de la fiscalización"));
                UtilidadesActas.Negrita(runConclusionesTitulo);


                Paragraph paragraphConclusiones = body.AppendChild(new Paragraph());
                Run runConclusiones = paragraphConclusiones.AppendChild(new Run());
                String textConclusiones = "Los procesos se realizar conforme lo establecido ";
                if(true){
                    textConclusiones += "SI: X";
                }
                else{
                    textConclusiones += "NO: X";
                }
                runConclusiones.AppendChild(new Text(textConclusiones));
                runConclusiones.AppendChild(new Break());
                String otras = "Otras: {OTRAS}";
                runConclusiones.AppendChild(new Text(otras));
                runConclusiones.AppendChild(new Break());
                String Detallar="Detallar: {DETALLAR}";
                runConclusiones.AppendChild(new Text(Detallar));
                runConclusiones.AppendChild(new Break());




                Paragraph paragraphConclusionesRecomendacionesTitulo = body.AppendChild(new Paragraph());
                Run runConclusionesRecomendacionesTitulo = paragraphConclusionesRecomendacionesTitulo.AppendChild(new Run());
                runConclusionesRecomendacionesTitulo.AppendChild(new Text("Recomendaciones de la fiscalización"));
                UtilidadesActas.Negrita(runConclusionesRecomendacionesTitulo);

                Paragraph paragraphConclusionesRecomendacionesDetalles = body.AppendChild(new Paragraph());
                Run runConclusionesRecomendacionesDetalles = paragraphConclusionesRecomendacionesDetalles.AppendChild(new Run());
                String recomendacionesNinguna = "Ninguna: {NINGUNA}";
                String recomendacionesOtras = "Los resultados evidenciados en el sorteo serán analizados para ser eventualmente valorados en la formulación de un oficio de advertencia/asesoría o bien un informe de auditoría {MARCADO} . {RECOMENDACIONES} ";
                runConclusionesRecomendacionesDetalles.AppendChild(new Text(recomendacionesNinguna));
                runConclusionesRecomendacionesDetalles.AppendChild(new Break());           
                runConclusionesRecomendacionesDetalles.AppendChild(new Text(recomendacionesOtras));
                runConclusionesRecomendacionesDetalles.AppendChild(new Break());
                runConclusionesRecomendacionesDetalles.AppendChild(new Break());
                runConclusionesRecomendacionesDetalles.AppendChild(new Break());
                runConclusionesRecomendacionesDetalles.AppendChild(new Break());
                runConclusionesRecomendacionesDetalles.AppendChild(new Break());



                Paragraph paragraphFirmaConclusiones = body.AppendChild(new Paragraph());
                UtilidadesActas.JustificarCentro(paragraphFirmaConclusiones);
                Run runFirmaConclusiones = paragraphFirmaConclusiones.AppendChild(new Run());
                runFirmaConclusiones.AppendChild(new Text("____________________________________"));
                runFirmaConclusiones.AppendChild(new Break()); //Agregar un enter
                runFirmaConclusiones.AppendChild(new Text("Fiscalizador de la Auditoria Interna"));
                runFirmaConclusiones.AppendChild(new Break());
                runFirmaConclusiones.AppendChild(new Break());
                UtilidadesActas.AgregarSaltoPagina(body);



                //(7ta pagina)
                Paragraph paragraphVerificacionTitulo = body.AppendChild(new Paragraph());
                Run runVerificacionTitulo = paragraphVerificacionTitulo.AppendChild(new Run());
                runVerificacionTitulo.AppendChild(new Text("INFORMACIÓN PARA VERIFICACIÓN DEL ACTA DEL SORTEO"));
                runVerificacionTitulo.AppendChild(new Break());
                runVerificacionTitulo.AppendChild(new Text("Resultado del sorteo"));
                UtilidadesActas.JustificarCentro(paragraphVerificacionTitulo);
                UtilidadesActas.Negrita(runVerificacionTitulo);

                //Insertando la tabla de verificacion
                CrearTablaVerificacionLoteriaPopular(body);

                UtilidadesActas.AgregarEnter(body);
                


                //Insertando la tabla del Premio Acumulado
                CrearTablaPremioAcumulado(body);


          
                
            }   
        }    


        #region METODOS PARA LOTERIA POPULAR
        private static void CrearTablaVerificacionLoteriaPopular(Body body){
                //Creando la tabla de Verificacion
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
                tableCellPropertiesHeader.GridSpan = new GridSpan() { Val = 8 };
                TableCell tableDataCell1 = new TableCell();
                tableDataRow.AppendChild(tableDataCell1);
                Paragraph loteriaData = new Paragraph(new Run(new Text("LOTERÍA POPULAR")));
                UtilidadesActas.JustificarCentro(loteriaData);
                tableDataCell1.AppendChild(loteriaData);
                tableDataCell1.Append(tableCellPropertiesHeader);
                tableDataCell1.Append(UtilidadesActas.CrearMargenCeldas());



                //ROW 2
                TableRow tableDataRow2 = new TableRow();
                table.AppendChild(tableDataRow2);

                TableCell tableDataCellEncabezado = new TableCell();
                tableDataRow2.AppendChild(tableDataCellEncabezado);
                Paragraph encabezadoData = new Paragraph(new Run(new Text("")));
                UtilidadesActas.JustificarCentro(encabezadoData);
                tableDataCellEncabezado.AppendChild(encabezadoData);
                tableDataCellEncabezado.Append(UtilidadesActas.CrearMargenCeldas());


                TableCell tableDataCellEncabezado2= new TableCell();
                tableDataRow2.AppendChild(tableDataCellEncabezado2);
                Paragraph encabezadoData2 = new Paragraph(new Run(new Text("Serie")));
                UtilidadesActas.JustificarCentro(encabezadoData2);
                tableDataCellEncabezado2.AppendChild(encabezadoData2);
                tableDataCellEncabezado2.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCellEncabezado3 = new TableCell();
                tableDataRow2.AppendChild(tableDataCellEncabezado3);
                Paragraph encabezadoData3 = new Paragraph(new Run(new Text("Número")));
                UtilidadesActas.JustificarCentro(encabezadoData3);
                tableDataCellEncabezado3.AppendChild(encabezadoData3);
                tableDataCellEncabezado3.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCellEncabezado4 = new TableCell();
                tableDataRow2.AppendChild(tableDataCellEncabezado4);
                Paragraph encabezadoData4 = new Paragraph(new Run(new Text("Premio Mayor")));
                UtilidadesActas.JustificarCentro(encabezadoData4);
                tableDataCellEncabezado4.AppendChild(encabezadoData4);
                tableDataCellEncabezado4.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCellEncabezado5 = new TableCell();
                tableDataRow2.AppendChild(tableDataCellEncabezado5);
                Paragraph encabezadoData5 = new Paragraph(new Run(new Text("Premio del Numero")));
                UtilidadesActas.JustificarCentro(encabezadoData5);
                tableDataCellEncabezado5.AppendChild(encabezadoData5);
                tableDataCellEncabezado5.Append(UtilidadesActas.CrearMargenCeldas());

                TableCellProperties tableCellProperties = new TableCellProperties();
                TableCell tableDataCellEncabezado6 = new TableCell(tableCellProperties);                
                tableDataRow2.AppendChild(tableDataCellEncabezado6);
                Paragraph encabezadoData6 = new Paragraph(new Run(new Text("")));
                UtilidadesActas.JustificarCentro(encabezadoData6);
                tableDataCellEncabezado6.AppendChild(encabezadoData6);
                tableDataCellEncabezado6.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCellEncabezado7 = new TableCell();
                tableDataRow2.AppendChild(tableDataCellEncabezado7);
                Paragraph encabezadoData7 = new Paragraph(new Run(new Text("Número Inverso")));
                UtilidadesActas.JustificarCentro(encabezadoData7);
                tableDataCellEncabezado7.AppendChild(encabezadoData7);
                tableDataCellEncabezado7.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCellEncabezado8 = new TableCell();
                tableDataRow2.AppendChild(tableDataCellEncabezado8);
                Paragraph encabezadoData8 = new Paragraph(new Run(new Text("Premio")));
                UtilidadesActas.JustificarCentro(encabezadoData8);
                tableDataCellEncabezado8.AppendChild(encabezadoData8);
                tableDataCellEncabezado8.Append(UtilidadesActas.CrearMargenCeldas());


                //ROW 3

                TableRow tableDataRow3 = new TableRow();
                table.AppendChild(tableDataRow3);

                TableCell tableDataCell31 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell31);
                Paragraph loteriaData31 = new Paragraph(new Run(new Text("1")));
                UtilidadesActas.JustificarCentro(loteriaData31);
                tableDataCell31.AppendChild(loteriaData31);
                tableDataCell31.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell32 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell32);
                Paragraph loteriaData32 = new Paragraph(new Run(new Text("{SERIE1}")));
                UtilidadesActas.JustificarCentro(loteriaData32);
                tableDataCell32.AppendChild(loteriaData32);
                tableDataCell32.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell33 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell33);
                Paragraph loteriaData33 = new Paragraph(new Run(new Text("{NUMERO1}")));
                UtilidadesActas.JustificarCentro(loteriaData33);
                tableDataCell33.AppendChild(loteriaData33);
                tableDataCell33.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell34 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell34);
                Paragraph loteriaData34 = new Paragraph(new Run(new Text("{PREMIOMAYOR1}")));
                UtilidadesActas.JustificarCentro(loteriaData34);
                tableDataCell34.AppendChild(loteriaData34);
                tableDataCell34.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell35 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell35);
                Paragraph loteriaData35 = new Paragraph(new Run(new Text("{PREMIODELNUMERO1}")));
                UtilidadesActas.JustificarCentro(loteriaData35);
                tableDataCell35.AppendChild(loteriaData35);
                tableDataCell35.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell36 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell36);
                Paragraph loteriaData36 = new Paragraph(new Run(new Text("")));
                UtilidadesActas.JustificarCentro(loteriaData36);
                tableDataCell36.AppendChild(loteriaData36);
                tableDataCell36.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell37 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell37);
                Paragraph loteriaData37 = new Paragraph(new Run(new Text("{NUMEROINVERSO1}")));
                UtilidadesActas.JustificarCentro(loteriaData37);
                tableDataCell37.AppendChild(loteriaData37);
                tableDataCell37.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell38 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell38);
                Paragraph loteriaData38 = new Paragraph(new Run(new Text("{PREMIO1}")));
                UtilidadesActas.JustificarCentro(loteriaData38);
                tableDataCell38.AppendChild(loteriaData38);
                tableDataCell38.Append(UtilidadesActas.CrearMargenCeldas());


                //ROW 4

                TableRow tableDataRow4 = new TableRow();
                table.AppendChild(tableDataRow4);

                TableCell tableDataCell41 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell41);
                Paragraph loteriaData41 = new Paragraph(new Run(new Text("2")));
                UtilidadesActas.JustificarCentro(loteriaData41);
                tableDataCell41.AppendChild(loteriaData41);
                tableDataCell41.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell42 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell42);
                Paragraph loteriaData42 = new Paragraph(new Run(new Text("{SERIE2}")));
                UtilidadesActas.JustificarCentro(loteriaData42);
                tableDataCell42.AppendChild(loteriaData42);
                tableDataCell42.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell43 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell43);
                Paragraph loteriaData43 = new Paragraph(new Run(new Text("{NUMERO2}")));
                UtilidadesActas.JustificarCentro(loteriaData43);
                tableDataCell43.AppendChild(loteriaData43);
                tableDataCell43.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell44 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell44);
                Paragraph loteriaData44 = new Paragraph(new Run(new Text("{PREMIOMAYOR2}")));
                UtilidadesActas.JustificarCentro(loteriaData44);
                tableDataCell44.AppendChild(loteriaData44);
                tableDataCell44.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell45 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell45);
                Paragraph loteriaData45 = new Paragraph(new Run(new Text("{PREMIODELNUMERO2}")));
                UtilidadesActas.JustificarCentro(loteriaData45);
                tableDataCell45.AppendChild(loteriaData45);
                tableDataCell45.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell46 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell46);
                Paragraph loteriaData46 = new Paragraph(new Run(new Text("")));
                UtilidadesActas.JustificarCentro(loteriaData46);
                tableDataCell46.AppendChild(loteriaData46);
                tableDataCell46.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell47 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell47);
                Paragraph loteriaData47 = new Paragraph(new Run(new Text("{NUMEROINVERSO2}")));
                UtilidadesActas.JustificarCentro(loteriaData47);
                tableDataCell47.AppendChild(loteriaData47);
                tableDataCell47.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell48 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell48);
                Paragraph loteriaData48 = new Paragraph(new Run(new Text("{PREMIO2}")));
                UtilidadesActas.JustificarCentro(loteriaData48);
                tableDataCell48.AppendChild(loteriaData48);
                tableDataCell48.Append(UtilidadesActas.CrearMargenCeldas());


                //ROW 5

                TableRow tableDataRow5 = new TableRow();
                table.AppendChild(tableDataRow5);

                TableCell tableDataCell51 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell51);
                Paragraph loteriaData51 = new Paragraph(new Run(new Text("3")));
                UtilidadesActas.JustificarCentro(loteriaData51);
                tableDataCell51.AppendChild(loteriaData51);
                tableDataCell51.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell52 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell52);
                Paragraph loteriaData52 = new Paragraph(new Run(new Text("{SERIE3}")));
                UtilidadesActas.JustificarCentro(loteriaData52);
                tableDataCell52.AppendChild(loteriaData52);
                tableDataCell52.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell53 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell53);
                Paragraph loteriaData53 = new Paragraph(new Run(new Text("{NUMERO3}")));
                UtilidadesActas.JustificarCentro(loteriaData53);
                tableDataCell53.AppendChild(loteriaData53);
                tableDataCell53.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell54 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell54);
                Paragraph loteriaData54 = new Paragraph(new Run(new Text("{PREMIOMAYOR3}")));
                UtilidadesActas.JustificarCentro(loteriaData54);
                tableDataCell54.AppendChild(loteriaData54);
                tableDataCell54.Append(UtilidadesActas.CrearMargenCeldas());


                TableCell tableDataCell55 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell55);
                Paragraph loteriaData55 = new Paragraph(new Run(new Text("{PREMIODELNUMERO3}")));
                UtilidadesActas.JustificarCentro(loteriaData55);
                tableDataCell55.AppendChild(loteriaData55);
                tableDataCell55.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell56 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell56);
                Paragraph loteriaData56 = new Paragraph(new Run(new Text("")));
                UtilidadesActas.JustificarCentro(loteriaData56);
                tableDataCell56.AppendChild(loteriaData56);
                tableDataCell56.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell57 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell57);
                Paragraph loteriaData57 = new Paragraph(new Run(new Text("{NUMEROINVERSO3}")));
                UtilidadesActas.JustificarCentro(loteriaData57);
                tableDataCell57.AppendChild(loteriaData57);
                tableDataCell57.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell58 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell58);
                Paragraph loteriaData58 = new Paragraph(new Run(new Text("{PREMIO3}")));
                UtilidadesActas.JustificarCentro(loteriaData58);
                tableDataCell58.AppendChild(loteriaData58);
                tableDataCell58.Append(UtilidadesActas.CrearMargenCeldas());

                body.AppendChild(table);

        }
        private static void CrearTablaPremioAcumulado(Body body){
                //Creando la tabla de Premio Acumulado
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
                tableCellPropertiesHeader.GridSpan = new GridSpan() { Val = 5 };
                TableCell tableDataCell1 = new TableCell();
                tableDataRow.AppendChild(tableDataCell1);
                Paragraph loteriaData = new Paragraph(new Run(new Text("PREMIO ACUMULADO")));
                UtilidadesActas.JustificarCentro(loteriaData);
                tableDataCell1.AppendChild(loteriaData);
                tableDataCell1.Append(tableCellPropertiesHeader);
                tableDataCell1.Append(UtilidadesActas.CrearMargenCeldas());                

                //ROW 2

                //Creando Margen especial de celdas
                var tablePropertiesMargenPremioAcumulado = new TableCellProperties(new TableCellMargin
                {
                    LeftMargin = new LeftMargin { Width = "100" },
                    RightMargin = new RightMargin { Width = "100" },
                    TopMargin = new TopMargin { Width = "200" },
                    BottomMargin = new BottomMargin { Width = "200" }
                });

                TableRow tableDataRow2 = new TableRow();
                table.AppendChild(tableDataRow2);
                TableCellProperties tableCellPropertiesRow2 = new TableCellProperties();
                tableCellPropertiesRow2.GridSpan = new GridSpan() { Val = 5 };
                TableCell tableDataCell2 = new TableCell();
                tableDataRow2.AppendChild(tableDataCell2);
                Paragraph loteriaData2 = new Paragraph(new Run(new Text("Premio acumulado sorteo actual: ₡ {PREMIOACUMULADO}")));
                tableDataCell2.AppendChild(loteriaData2);
                tableDataCell2.Append(tableCellPropertiesRow2);
                tableDataCell2.Append(tablePropertiesMargenPremioAcumulado);

                //ROW 3
                TableRow tableDataRow3 = new TableRow();
                table.AppendChild(tableDataRow3);                

                TableCellProperties tableCellPropertiesRow3 = new TableCellProperties();
                tableCellPropertiesRow3.GridSpan = new GridSpan() { Val = 5 };
                TableCell tableDataCell3 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell3);
                Paragraph BolitaFavorecida = new Paragraph(new Run(new Text("Bolita Favorecida:")));
                UtilidadesActas.JustificarCentro(BolitaFavorecida);
                tableDataCell3.AppendChild(BolitaFavorecida);
                tableDataCell3.Append(tableCellPropertiesRow3);
                tableDataCell3.Append(UtilidadesActas.CrearMargenCeldas());   


                //ROW 4
                TableRow tableDataRow4 = new TableRow();
                table.AppendChild(tableDataRow4);


                TableCell tableDataCell41 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell41);
                Paragraph loteriaData41 = new Paragraph(new Run(new Text("")));
                UtilidadesActas.JustificarCentro(loteriaData41);
                tableDataCell41.AppendChild(loteriaData41);
                tableDataCell41.Append(UtilidadesActas.CrearMargenCeldas());


                TableCellProperties tableCellProperties42 = new TableCellProperties();
                tableCellProperties42.GridSpan = new GridSpan() { Val = 2 };
                var tablePropertiesMargenPremio1 = new TableCellProperties(new TableCellMargin
                {
                    LeftMargin = new LeftMargin { Width = "100" },
                    RightMargin = new RightMargin { Width = "100" },
                    TopMargin = new TopMargin { Width = "200" },
                    BottomMargin = new BottomMargin { Width = "200" }
                });
                TableCell tableDataCell42 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell42);
                Paragraph loteriaData42 = new Paragraph(new Run(new Text("Premio ₡:{PREMIO1}")));
                UtilidadesActas.JustificarCentro(loteriaData42);
                tableDataCell42.AppendChild(loteriaData42);
                tableDataCell42.Append(tableCellProperties42);
                tableDataCell42.Append(tablePropertiesMargenPremio1);


                TableCellProperties tableCellProperties43 = new TableCellProperties();
                tableCellProperties43.GridSpan = new GridSpan() { Val = 2 };
                var tablePropertiesMargenPremio2 = new TableCellProperties(new TableCellMargin
                {
                    LeftMargin = new LeftMargin { Width = "100" },
                    RightMargin = new RightMargin { Width = "100" },
                    TopMargin = new TopMargin { Width = "200" },
                    BottomMargin = new BottomMargin { Width = "200" }
                });
                TableCell tableDataCell43 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell43);
                Paragraph loteriaData43 = new Paragraph(new Run(new Text("Premio ₡:{PREMIO2}")));
                UtilidadesActas.JustificarCentro(loteriaData43);
                tableDataCell43.AppendChild(loteriaData43);
                tableDataCell43.Append(tableCellProperties43);
                tableDataCell43.Append(tablePropertiesMargenPremio2);

                //ROW 5
                TableRow tableDataRow5 = new TableRow();
                table.AppendChild(tableDataRow5);


                TableCell tableDataCell51 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell51);
                Paragraph loteriaData51 = new Paragraph(new Run(new Text("{ACUMULADO} Acumulado")));
                UtilidadesActas.JustificarCentro(loteriaData51);
                tableDataCell51.AppendChild(loteriaData51);
                tableDataCell51.Append(UtilidadesActas.CrearMargenCeldas());

                //Inserta las celdas dos veces.                
                for(int i=0;i<2;i++){
                    TableCell tableDataCell52 = new TableCell();
                    tableDataRow5.AppendChild(tableDataCell52);
                    //Inserto el texto con un enter debajo
                    Paragraph loteriaData52 = new Paragraph(new Run(new Text("Serie"),new Break()));
                    UtilidadesActas.JustificarCentro(loteriaData52);
                    tableDataCell52.AppendChild(loteriaData52);
                    tableDataCell52.Append(UtilidadesActas.CrearMargenCeldas());

                    TableCell tableDataCell53 = new TableCell();
                    tableDataRow5.AppendChild(tableDataCell53);
                    //Inserto el texto con un enter debajo
                    Paragraph loteriaData53 = new Paragraph(new Run(new Text("Número"),new Break()));
                    UtilidadesActas.JustificarCentro(loteriaData53);
                    tableDataCell53.AppendChild(loteriaData53);
                    tableDataCell53.Append(UtilidadesActas.CrearMargenCeldas());
                }

                //ROW 6
                TableRow tableDataRow6 = new TableRow();
                table.AppendChild(tableDataRow6);


                TableCell tableDataCell61 = new TableCell();
                tableDataRow6.AppendChild(tableDataCell61);
                Paragraph loteriaData61 = new Paragraph(new Run(new Text("")));
                UtilidadesActas.JustificarCentro(loteriaData61);
                tableDataCell61.AppendChild(loteriaData61);
                tableDataCell61.Append(UtilidadesActas.CrearMargenCeldas());


                TableCell tableDataCell62 = new TableCell();
                tableDataRow6.AppendChild(tableDataCell62);
                Paragraph loteriaData62 = new Paragraph(new Run(new Text("{SERIE1}")));
                UtilidadesActas.JustificarCentro(loteriaData62);
                tableDataCell62.AppendChild(loteriaData62);
                tableDataCell62.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell63 = new TableCell();
                tableDataRow6.AppendChild(tableDataCell63);
                Paragraph loteriaData63 = new Paragraph(new Run(new Text("{NUMERO1}")));
                UtilidadesActas.JustificarCentro(loteriaData63);
                tableDataCell63.AppendChild(loteriaData63);
                tableDataCell63.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell64 = new TableCell();
                tableDataRow6.AppendChild(tableDataCell64);
                Paragraph loteriaData64 = new Paragraph(new Run(new Text("{SERIE2}")));
                UtilidadesActas.JustificarCentro(loteriaData64);
                tableDataCell64.AppendChild(loteriaData64);
                tableDataCell64.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell65 = new TableCell();
                tableDataRow6.AppendChild(tableDataCell65);
                Paragraph loteriaData65 = new Paragraph(new Run(new Text("{NUMERO2}")));
                UtilidadesActas.JustificarCentro(loteriaData65);
                tableDataCell65.AppendChild(loteriaData65);
                tableDataCell65.Append(UtilidadesActas.CrearMargenCeldas());


                //ROW 7

                TableRow tableDataRow7 = new TableRow();
                table.AppendChild(tableDataRow7);

                TableCellProperties tableCellPropertiesRow7 = new TableCellProperties();
                tableCellPropertiesRow7.GridSpan = new GridSpan() { Val = 5 };
                TableCell tableDataCell71 = new TableCell();
                tableDataRow7.AppendChild(tableDataCell71);
                Paragraph loteriaData71 = new Paragraph(new Run(
                    new Text("Cantidad de sorteos Efectuados: {CANTIDAD_SORTEOS_EFECTUADOS}"),
                    new Break(),
                    new Break(),
                    new Text("Incremento del premio del Acumulado: ₡ {INCREMENTO_PREMIO_ACUMULADO}"),
                    new Break(),
                    new Break(),
                    new Text("Acumulado para el proximo sorteo: ₡ {ACUMULADO_PROXIMO_SORTEO}")                    
                    ));
                tableDataCell71.AppendChild(loteriaData71);
                tableDataCell71.Append(tableCellPropertiesRow7);
                tableDataCell71.Append(UtilidadesActas.CrearMargenCeldas());

                body.AppendChild(table);

        }
        #endregion
        #region Utilidades Documento
        #endregion

        
        
    }
}