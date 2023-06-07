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
                string tituloSorteo = "SORTEO LOTERIA POPULAR N° {NUMSORTEO}";
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


                /*
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
                UtilidadesActas.CrearTablaProcedimientos(body,procedimientosPrevios,"Previo al sorteo:",sorteo);
                UtilidadesActas.AgregarSaltoPagina(body);
                UtilidadesActas.CrearTablaProcedimientos(body,procedimientosDurante,"Durante al sorteo:",sorteo);
                UtilidadesActas.AgregarSaltoPagina(body);
                UtilidadesActas.CrearTablaProcedimientos(body,procedimientosPosterior,"Posterior al sorteo:",sorteo);
                UtilidadesActas.AgregarSaltoPagina(body);
                UtilidadesActas.CrearTablaProcedimientos(body,procedimientosSolicitud,"Información que debe solicitarse a la Gerencia de Producción y Comercialización:",sorteo);
                UtilidadesActas.AgregarSaltoPagina(body);
                UtilidadesActas.CrearTablaProcedimientos(body,procedimientosGeneracion,"Información que debe generar la Auditoría Interna:",sorteo);
                UtilidadesActas.AgregarSaltoPagina(body);



                //(6ta pagina)
                //Conclusiones+

                var actaFiscalizacion = context.ActaDeFiscalizacions.FirstOrDefault(x => x.IdDatoSorteo == sorteo.IdInterno);

                Paragraph paragraphConclusionesTitulo = body.AppendChild(new Paragraph());
                Run runConclusionesTitulo = paragraphConclusionesTitulo.AppendChild(new Run());
                runConclusionesTitulo.AppendChild(new Text("Conclusiones de la fiscalización"));
                UtilidadesActas.Negrita(runConclusionesTitulo);


                Paragraph paragraphConclusiones = body.AppendChild(new Paragraph());
                Run runConclusiones = paragraphConclusiones.AppendChild(new Run());
                String textConclusiones = "Los procesos se realizar conforme lo establecido ";
                if(actaFiscalizacion.Protocolo=="Si"){
                    textConclusiones += "SI: X";
                }
                else{
                    textConclusiones += "NO: X";
                }
                runConclusiones.AppendChild(new Text(textConclusiones));
                runConclusiones.AppendChild(new Break());

                String otras = "Otras: {OTRAS}";
                otras = otras.Replace("{OTRAS}",actaFiscalizacion.OtrasConclusiones);
                runConclusiones.AppendChild(new Text(otras));
                runConclusiones.AppendChild(new Break());

                String Detallar="Detallar: {DETALLAR}";
                Detallar = Detallar.Replace("{DETALLAR}",actaFiscalizacion.ConclusionesDetalle);
                runConclusiones.AppendChild(new Text(Detallar));
                runConclusiones.AppendChild(new Break());




                Paragraph paragraphConclusionesRecomendacionesTitulo = body.AppendChild(new Paragraph());
                Run runConclusionesRecomendacionesTitulo = paragraphConclusionesRecomendacionesTitulo.AppendChild(new Run());
                runConclusionesRecomendacionesTitulo.AppendChild(new Text("Recomendaciones de la fiscalización"));
                UtilidadesActas.Negrita(runConclusionesRecomendacionesTitulo);

                Paragraph paragraphConclusionesRecomendacionesDetalles = body.AppendChild(new Paragraph());
                Run runConclusionesRecomendacionesDetalles = paragraphConclusionesRecomendacionesDetalles.AppendChild(new Run());
                String recomendacionesNinguna = "Ninguna: {NINGUNA}";
                recomendacionesNinguna = recomendacionesNinguna.Replace("{NINGUNA}",actaFiscalizacion.Recomendacion);
                String recomendacionesOtras = "Los resultados evidenciados en el sorteo serán analizados para ser eventualmente valorados en la formulación de un oficio de advertencia/asesoría o bien un informe de auditoría. {RECOMENDACIONES} ";
                recomendacionesOtras = recomendacionesOtras.Replace("{RECOMENDACIONES}",actaFiscalizacion.RecomendacionDetalle);
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
                CrearTablaVerificacionLoteriaPopular(body, sorteo);

                UtilidadesActas.AgregarEnter(body);

                //Insertando la tabla del Premio Acumulado
                CrearTablaPremioAcumulado(body);

                UtilidadesActas.AgregarEnter(body);

                CrearTablaDetallePremios(body);

                Paragraph paragraphVerificacionActa = body.AppendChild(new Paragraph());
                Run runVerificacionActa = paragraphVerificacionActa.AppendChild(new Run());
                runVerificacionActa.AppendChild(new Break());
                runVerificacionActa.AppendChild(new Text("Acta"));
                UtilidadesActas.JustificarCentro(paragraphVerificacionActa);
                UtilidadesActas.Negrita(runVerificacionActa);

                //Insertando la tabla de verificacion
                CrearTablaVerificacionTomo(body,sorteo);


                Paragraph paragraphVerificacionMarchamos = body.AppendChild(new Paragraph());
                Run runVerificacionMarchamos = paragraphVerificacionMarchamos.AppendChild(new Run());
                runVerificacionMarchamos.AppendChild(new Break());
                runVerificacionMarchamos.AppendChild(new Text("Marchamos Utilizados"));
                UtilidadesActas.JustificarCentro(paragraphVerificacionMarchamos);
                UtilidadesActas.Negrita(runVerificacionMarchamos);

                //Isertando tabla de marchamos utilizados
                CrearTablaMarchamosUtilizados(body,sorteo);

                UtilidadesActas.AgregarEnter(body);

                Paragraph paragraphSeriesaExcluir = body.AppendChild(new Paragraph());
                Run runSeriesaExcluir = paragraphSeriesaExcluir.AppendChild(new Run());
                String seriesAExcluir = "Series a excluir: {SERIESAEXCLUIR}";
                seriesAExcluir = seriesAExcluir.Replace("{SERIESAEXCLUIR}","_____________________________________________________________________");
                runSeriesaExcluir.AppendChild(new Break());
                runSeriesaExcluir.AppendChild(new Text(seriesAExcluir));
                
                UtilidadesActas.AgregarEnter(body);

                var datosPreviosAdm = context.DatosPreviosAdministracions.Where(x => x.IdDatoSorteo == sorteo.IdInterno).FirstOrDefault();
                var representantes = context.Representantes.Where(x => x.IdDatosPrevios == datosPreviosAdm.Id).FirstOrDefault();
                Paragraph paragraphCantantes = body.AppendChild(new Paragraph());
                Run runCantantes = paragraphCantantes.AppendChild(new Run());
                runCantantes.AppendChild(new Break());
                runCantantes.AppendChild(new Text("Personas designadas para cantar:"));
                String cantantes = "Cantantes: {CANTANTES}  Números:{CANTANTENUMEROS}   Acumulado:{CANTANTEACUMULADO}";
                cantantes = cantantes.Replace("{CANTANTES}","_________________");
                cantantes = cantantes.Replace("{CANTANTENUMEROS}","_________________");
                cantantes = cantantes.Replace("{CANTANTEACUMULADO}","_________________");
                runCantantes.AppendChild(new Break());
                runCantantes.AppendChild(new Text(cantantes));
                UtilidadesActas.AgregarEnter(body);

                Paragraph paragraphFinalizacionActaOtros = body.AppendChild(new Paragraph());
                Run runFinalizacionActaOtros = paragraphFinalizacionActaOtros.AppendChild(new Run());
                runFinalizacionActaOtros.AppendChild(new Text("Otros:"));
                runFinalizacionActaOtros.AppendChild(new Break());
                String otrosPresentadores = "Presentador: {PRESENTADOR}     Prompter: {PROMPTER}";
                otrosPresentadores = otrosPresentadores.Replace("{PRESENTADOR}",representantes.Presentador);
                otrosPresentadores = otrosPresentadores.Replace("{PROMPTER}",representantes.Prompter);
                runFinalizacionActaOtros.AppendChild(new Text(otrosPresentadores));

                Paragraph paragraphHoraFinalizacion = body.AppendChild(new Paragraph());
                Run runHoraFinalizacion = paragraphHoraFinalizacion.AppendChild(new Run());
                string horaFinalizacion = "Hora de Finalizacion: {HORAFINALIZACION}";
                horaFinalizacion = horaFinalizacion.Replace("{HORAFINALIZACION}", DateTime.Now.ToString("hh:mm:ss"));
                runHoraFinalizacion.AppendChild(new Break());
                runHoraFinalizacion.AppendChild(new Text(horaFinalizacion));
                UtilidadesActas.AgregarEnter(body);

                Paragraph paragraphObervaciones = body.AppendChild(new Paragraph());
                Run runObervaciones = paragraphObervaciones.AppendChild(new Run());
                String observacionesFinalActa = "Observaciones: {OBSERVACIONES}";
                observacionesFinalActa = observacionesFinalActa.Replace("{OBSERVACIONES}","_____________________________________________________________________");
                runObervaciones.AppendChild(new Text(observacionesFinalActa));
                UtilidadesActas.AgregarEnter(body);

                Paragraph paragraphFirmaFinalizacion = body.AppendChild(new Paragraph());
                Run runFirmaFinalizacion = paragraphFirmaFinalizacion.AppendChild(new Run());
                runFirmaFinalizacion.AppendChild(new Break());
                runFirmaFinalizacion.AppendChild(new Break());
                runFirmaFinalizacion.AppendChild(new Break());
                runFirmaFinalizacion.AppendChild(new Break());
                runFirmaFinalizacion.AppendChild(new Text("____________________________________"));
                runFirmaFinalizacion.AppendChild(new Break()); //Agregar un enter
                runFirmaFinalizacion.AppendChild(new Text("Fiscalizador de la Auditoria Interna"));
                UtilidadesActas.JustificarCentro(paragraphFirmaFinalizacion);      
                */




          
                
            }   
        }    


        #region METODOS PARA LOTERIA POPULAR
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
            Paragraph loteriaData = new Paragraph(new Run(new Text("LOTERÍA POPULAR")));
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

            TableCell tableDataCell24 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell24);
            Paragraph sorteoData24 = new Paragraph(new Run(new Text($"Premio")));
            tableDataCell24.AppendChild(sorteoData24);
            UtilidadesActas.JustificarCentro(sorteoData24);
            tableDataCell24.Append(UtilidadesActas.CrearMargenCeldas());

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

            TableCell tableDataCell34 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell34);
            Paragraph sorteoData34 = new Paragraph(new Run(new Text("¢80.000.000")));
            tableDataCell34.AppendChild(sorteoData34);
            UtilidadesActas.JustificarCentro(sorteoData34);
            tableDataCell34.Append(UtilidadesActas.CrearMargenCeldas());


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

            TableCell tableDataCell44 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell44);
            Paragraph sorteoData44 = new Paragraph(new Run(new Text("¢25.000.000")));
            tableDataCell44.AppendChild(sorteoData44);
            UtilidadesActas.JustificarCentro(sorteoData44);
            tableDataCell44.Append(UtilidadesActas.CrearMargenCeldas());

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

            TableCell tableDataCell54 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell54);
            Paragraph sorteoData54 = new Paragraph(new Run(new Text("¢7.000.000")));
            tableDataCell54.AppendChild(sorteoData54);
            UtilidadesActas.JustificarCentro(sorteoData54);
            tableDataCell54.Append(UtilidadesActas.CrearMargenCeldas());

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
        private static void CrearTablaVerificacionLoteriaPopular(Body body, DatosSorteo sorteo){
                var context = new proyecto_bdContext();
                var numerosGanadores = context.Resultados.Where(x => x.IdDatoSorteo == sorteo.IdInterno).ToList();
                var primerNumero = numerosGanadores.Where(x => x.tipoResultado == "Premio Mayor").FirstOrDefault();
                var segundoNumero = numerosGanadores.Where(x => x.tipoResultado == "Segundo Premio").FirstOrDefault();
                var tercerNumero = numerosGanadores.Where(x => x.tipoResultado == "Tercer Premio").FirstOrDefault();
                
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
                Paragraph loteriaData32 = new Paragraph(new Run(new Text(primerNumero.SeriePremio)));
                UtilidadesActas.JustificarCentro(loteriaData32);
                tableDataCell32.AppendChild(loteriaData32);
                tableDataCell32.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell33 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell33);
                Paragraph loteriaData33 = new Paragraph(new Run(new Text(primerNumero.NumFavorecido)));
                UtilidadesActas.JustificarCentro(loteriaData33);
                tableDataCell33.AppendChild(loteriaData33);
                tableDataCell33.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell34 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell34);
                Paragraph loteriaData34 = new Paragraph(new Run(new Text("¢80.000.000")));
                UtilidadesActas.JustificarCentro(loteriaData34);
                tableDataCell34.AppendChild(loteriaData34);
                tableDataCell34.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell35 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell35);
                Paragraph loteriaData35 = new Paragraph(new Run(new Text("¢130.000")));
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
                Paragraph loteriaData37 = new Paragraph(new Run(new Text(UtilidadesActas.numInverso(primerNumero.NumFavorecido))));
                UtilidadesActas.JustificarCentro(loteriaData37);
                tableDataCell37.AppendChild(loteriaData37);
                tableDataCell37.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell38 = new TableCell();
                tableDataRow3.AppendChild(tableDataCell38);
                Paragraph loteriaData38 = new Paragraph(new Run(new Text("¢10.000")));
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
                Paragraph loteriaData42 = new Paragraph(new Run(new Text(segundoNumero.SeriePremio)));
                UtilidadesActas.JustificarCentro(loteriaData42);
                tableDataCell42.AppendChild(loteriaData42);
                tableDataCell42.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell43 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell43);
                Paragraph loteriaData43 = new Paragraph(new Run(new Text(segundoNumero.NumFavorecido)));
                UtilidadesActas.JustificarCentro(loteriaData43);
                tableDataCell43.AppendChild(loteriaData43);
                tableDataCell43.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell44 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell44);
                Paragraph loteriaData44 = new Paragraph(new Run(new Text("¢25.000.000")));
                UtilidadesActas.JustificarCentro(loteriaData44);
                tableDataCell44.AppendChild(loteriaData44);
                tableDataCell44.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell45 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell45);
                Paragraph loteriaData45 = new Paragraph(new Run(new Text("¢30.000")));
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
                Paragraph loteriaData47 = new Paragraph(new Run(new Text(UtilidadesActas.numInverso(segundoNumero.NumFavorecido))));
                UtilidadesActas.JustificarCentro(loteriaData47);
                tableDataCell47.AppendChild(loteriaData47);
                tableDataCell47.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell48 = new TableCell();
                tableDataRow4.AppendChild(tableDataCell48);
                Paragraph loteriaData48 = new Paragraph(new Run(new Text("¢8.000")));
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
                Paragraph loteriaData52 = new Paragraph(new Run(new Text(tercerNumero.SeriePremio)));
                UtilidadesActas.JustificarCentro(loteriaData52);
                tableDataCell52.AppendChild(loteriaData52);
                tableDataCell52.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell53 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell53);
                Paragraph loteriaData53 = new Paragraph(new Run(new Text(tercerNumero.NumFavorecido)));
                UtilidadesActas.JustificarCentro(loteriaData53);
                tableDataCell53.AppendChild(loteriaData53);
                tableDataCell53.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell54 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell54);
                Paragraph loteriaData54 = new Paragraph(new Run(new Text("¢7.000.000")));
                UtilidadesActas.JustificarCentro(loteriaData54);
                tableDataCell54.AppendChild(loteriaData54);
                tableDataCell54.Append(UtilidadesActas.CrearMargenCeldas());


                TableCell tableDataCell55 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell55);
                Paragraph loteriaData55 = new Paragraph(new Run(new Text("¢20.000")));
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
                Paragraph loteriaData57 = new Paragraph(new Run(new Text(UtilidadesActas.numInverso(tercerNumero.NumFavorecido))));
                UtilidadesActas.JustificarCentro(loteriaData57);
                tableDataCell57.AppendChild(loteriaData57);
                tableDataCell57.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell58 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell58);
                Paragraph loteriaData58 = new Paragraph(new Run(new Text("¢5.000")));
                UtilidadesActas.JustificarCentro(loteriaData58);
                tableDataCell58.AppendChild(loteriaData58);
                tableDataCell58.Append(UtilidadesActas.CrearMargenCeldas());

                body.AppendChild(table);

        }
        private static void CrearTablaPremioAcumulado(Body body){
            var context = new proyecto_bdContext();
            var premioAcumulado = context.Acumulados.Where(p => p.TipoLoteria== "Pop_Nac").FirstOrDefault();

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
            String TextoCelda2 = "Premio acumulado sorteo anterior: ₡ {PREMIOACUMULADO}";
            TextoCelda2 = TextoCelda2.Replace("{PREMIOACUMULADO}", premioAcumulado.Monto.ToString());
            Paragraph loteriaData2 = new Paragraph(new Run(new Text(TextoCelda2)));
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
            String textoCelda42 = "Premio ₡:{PREMIO1}";
            textoCelda42 = textoCelda42.Replace("{PREMIO1}", "_______________");
            Paragraph loteriaData42 = new Paragraph(new Run(new Text(textoCelda42)));
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
            String textoCelda43 = "Premio ₡:{PREMIO2}";
            textoCelda43 = textoCelda43.Replace("{PREMIO2}", "_______________");
            Paragraph loteriaData43 = new Paragraph(new Run(new Text(textoCelda43)));
            UtilidadesActas.JustificarCentro(loteriaData43);
            tableDataCell43.AppendChild(loteriaData43);
            tableDataCell43.Append(tableCellProperties43);
            tableDataCell43.Append(tablePropertiesMargenPremio2);

            //ROW 5
            TableRow tableDataRow5 = new TableRow();
            table.AppendChild(tableDataRow5);


            TableCell tableDataCell51 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell51);
            String textoCelda51 = "{Acumulado} Acumulado";
            textoCelda51 = textoCelda51.Replace("{Acumulado}", "____");
            Paragraph loteriaData51 = new Paragraph(new Run(new Text(textoCelda51)));
            UtilidadesActas.JustificarCentro(loteriaData51);
            tableDataCell51.AppendChild(loteriaData51);
            tableDataCell51.Append(UtilidadesActas.CrearMargenCeldas());

            //Inserta las celdas dos veces.                
            for(int i=0;i<2;i++){
                TableCell tableDataCell52 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell52);
                //Inserto el texto con un enter debajo
                Paragraph loteriaData52 = new Paragraph(new Run(new Text("Serie")));
                UtilidadesActas.JustificarCentro(loteriaData52);
                tableDataCell52.AppendChild(loteriaData52);
                tableDataCell52.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCell53 = new TableCell();
                tableDataRow5.AppendChild(tableDataCell53);
                //Inserto el texto con un enter debajo
                Paragraph loteriaData53 = new Paragraph(new Run(new Text("Número")));
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
            String textoCelda62 = "{SERIE1}";
            textoCelda62 = textoCelda62.Replace("{SERIE1}", "");
            Paragraph loteriaData62 = new Paragraph(new Run(new Text(textoCelda62)));
            UtilidadesActas.JustificarCentro(loteriaData62);
            tableDataCell62.AppendChild(loteriaData62);
            tableDataCell62.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell63 = new TableCell();
            tableDataRow6.AppendChild(tableDataCell63);
            String textoCelda63 = "{NUMERO1}";
            textoCelda63 = textoCelda63.Replace("{NUMERO1}", "");
            Paragraph loteriaData63 = new Paragraph(new Run(new Text(textoCelda63)));
            UtilidadesActas.JustificarCentro(loteriaData63);
            tableDataCell63.AppendChild(loteriaData63);
            tableDataCell63.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell64 = new TableCell();
            tableDataRow6.AppendChild(tableDataCell64);
            String textoCelda64 = "{SERIE2}";
            textoCelda64 = textoCelda64.Replace("{SERIE2}", "");
            Paragraph loteriaData64 = new Paragraph(new Run(new Text(textoCelda64)));
            UtilidadesActas.JustificarCentro(loteriaData64);
            tableDataCell64.AppendChild(loteriaData64);
            tableDataCell64.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell65 = new TableCell();
            tableDataRow6.AppendChild(tableDataCell65);
            String textoCelda65 = "{NUMERO2}";
            textoCelda65 = textoCelda65.Replace("{NUMERO2}", "");
            Paragraph loteriaData65 = new Paragraph(new Run(new Text(textoCelda65)));
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
            String textoCelda71CantidadSorteos = "Cantidad de sorteos Efectuados: {CANTIDAD_SORTEOS_EFECTUADOS}";
            String textoCelda71IncrementoPremioAcumulado = "Incremento del premio del Acumulado: ₡ {INCREMENTO_PREMIO_ACUMULADO}";
            String textoCelda71AcumuladoProximoSorteo = "Acumulado para el proximo sorteo: ₡ {ACUMULADO_PROXIMO_SORTEO}";
            textoCelda71CantidadSorteos = textoCelda71CantidadSorteos.Replace("{CANTIDAD_SORTEOS_EFECTUADOS}", "__________");
            textoCelda71IncrementoPremioAcumulado = textoCelda71IncrementoPremioAcumulado.Replace("{INCREMENTO_PREMIO_ACUMULADO}", "_______________");
            textoCelda71AcumuladoProximoSorteo = textoCelda71AcumuladoProximoSorteo.Replace("{ACUMULADO_PROXIMO_SORTEO}", "_______________");
            Paragraph loteriaData71 = new Paragraph(new Run(
                new Text(textoCelda71CantidadSorteos),
                new Break(),
                new Break(),
                new Text(textoCelda71IncrementoPremioAcumulado),
                new Break(),
                new Break(),
                new Text(textoCelda71AcumuladoProximoSorteo)                    
                ));
            tableDataCell71.AppendChild(loteriaData71);
            tableDataCell71.Append(tableCellPropertiesRow7);
            tableDataCell71.Append(UtilidadesActas.CrearMargenCeldas());

            body.AppendChild(table);

        }
        private static void CrearTablaDetallePremios(Body body){
            //Creando la tabla de Detalle de Premios
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
            

            TableCellProperties tableCellPropertiesHeader11 = new TableCellProperties();
            tableCellPropertiesHeader11.GridSpan = new GridSpan() { Val = 2 };
            TableCell tableDataCell11 = new TableCell();
            tableDataRow.AppendChild(tableDataCell11);
            Paragraph DataCell11 = new Paragraph(new Run(new Text("Detalle Plan de premios")));
            UtilidadesActas.JustificarCentro(DataCell11);
            tableDataCell11.AppendChild(DataCell11);
            tableDataCell11.Append(tableCellPropertiesHeader11);
            tableDataCell11.Append(UtilidadesActas.CrearMargenCeldas());

            TableCellProperties tableCellPropertiesHeader12 = new TableCellProperties();
            tableCellPropertiesHeader12.GridSpan = new GridSpan() { Val = 2 };
            TableCell tableDataCell12 = new TableCell();
            tableDataRow.AppendChild(tableDataCell12);
            Paragraph DataCell12 = new Paragraph(new Run(new Text("BOLITAS EN TOMBOLA")));
            UtilidadesActas.JustificarCentro(DataCell12);
            tableDataCell12.AppendChild(DataCell12);
            tableDataCell12.Append(tableCellPropertiesHeader12);
            tableDataCell12.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 2

            TableRow tableDataRow2 = new TableRow();
            table.AppendChild(tableDataRow2);

            TableCellProperties tableCellPropertiesHeader21 = new TableCellProperties();
            tableCellPropertiesHeader21.GridSpan = new GridSpan() { Val = 2 };
            TableCell tableDataCell21 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell21);
            Paragraph DataCell21 = new Paragraph(new Run(new Text("")));
            UtilidadesActas.JustificarCentro(DataCell21);
            tableDataCell21.AppendChild(DataCell21);
            tableDataCell21.Append(tableCellPropertiesHeader21);
            tableDataCell21.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell22 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell22);
            Paragraph DataCell22 = new Paragraph(new Run(new Text("PRESENTE SORTEO")));
            UtilidadesActas.JustificarCentro(DataCell22);
            tableDataCell22.AppendChild(DataCell22);
            tableDataCell22.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell23 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell23);
            Paragraph DataCell23 = new Paragraph(new Run(new Text("PROXIMO SORTEO")));
            UtilidadesActas.JustificarCentro(DataCell23);
            tableDataCell23.AppendChild(DataCell23);
            tableDataCell23.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 3

            TableRow tableDataRow3 = new TableRow();
            table.AppendChild(tableDataRow3);

            TableCell tableDataCell31 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell31);
            Paragraph DataCell31 = new Paragraph(new Run(new Text("Premio Acumulado")));
            UtilidadesActas.JustificarCentro(DataCell31);
            tableDataCell31.AppendChild(DataCell31);
            tableDataCell31.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell32 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell32);
            Paragraph DataCell32 = new Paragraph(new Run(new Text("1")));
            UtilidadesActas.JustificarCentro(DataCell32);
            tableDataCell32.AppendChild(DataCell32);
            tableDataCell32.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell33 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell33);
            String textoCelda33 = "{PRESENTESORTEO1}";
            textoCelda33 = textoCelda33.Replace("{PRESENTESORTEO1}", "");
            Paragraph DataCell33 = new Paragraph(new Run(new Text(textoCelda33)));
            UtilidadesActas.JustificarCentro(DataCell33);
            tableDataCell33.AppendChild(DataCell33);
            tableDataCell33.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell34 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell34);
            String textoCelda34 = "{PROXIMOSORTEO1}";
            textoCelda34 = textoCelda34.Replace("{PROXIMOSORTEO1}", "");
            Paragraph DataCell34 = new Paragraph(new Run(new Text(textoCelda34)));
            UtilidadesActas.JustificarCentro(DataCell34);
            tableDataCell34.AppendChild(DataCell34);
            tableDataCell34.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 4

            TableRow tableDataRow4 = new TableRow();
            table.AppendChild(tableDataRow4);

            TableCell tableDataCell41 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell41);
            Paragraph DataCell41 = new Paragraph(new Run(new Text("Premio de ₡2.000.000")));
            UtilidadesActas.JustificarCentro(DataCell41);
            tableDataCell41.AppendChild(DataCell41);
            tableDataCell41.Append(UtilidadesActas.CrearMargenCeldas());
            
            TableCell tableDataCell42 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell42);
            Paragraph DataCell42 = new Paragraph(new Run(new Text("10")));
            UtilidadesActas.JustificarCentro(DataCell42);
            tableDataCell42.AppendChild(DataCell42);
            tableDataCell42.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell43 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell43);
            String textoCelda43 = "{PRESENTESORTEO2}";
            textoCelda43 = textoCelda43.Replace("{PRESENTESORTEO2}", "");
            Paragraph DataCell43 = new Paragraph(new Run(new Text(textoCelda43)));
            UtilidadesActas.JustificarCentro(DataCell43);
            tableDataCell43.AppendChild(DataCell43);
            tableDataCell43.Append(UtilidadesActas.CrearMargenCeldas());
            
            TableCell tableDataCell44 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell44);
            String textoCelda44 = "{PROXIMOSORTEO2}";
            textoCelda44 = textoCelda44.Replace("{PROXIMOSORTEO2}", "");
            Paragraph DataCell44 = new Paragraph(new Run(new Text(textoCelda44)));
            UtilidadesActas.JustificarCentro(DataCell44);
            tableDataCell44.AppendChild(DataCell44);
            tableDataCell44.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 5

            TableRow tableDataRow5 = new TableRow();
            table.AppendChild(tableDataRow5);

            TableCell tableDataCell51 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell51);
            Paragraph DataCell51 = new Paragraph(new Run(new Text("Premio de ₡2.500.000")));
            UtilidadesActas.JustificarCentro(DataCell51);
            tableDataCell51.AppendChild(DataCell51);
            tableDataCell51.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell52 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell52);
            Paragraph DataCell52 = new Paragraph(new Run(new Text("10")));
            UtilidadesActas.JustificarCentro(DataCell52);
            tableDataCell52.AppendChild(DataCell52);
            tableDataCell52.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell53 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell53);
            String textoCelda53 = "{PRESENTESORTEO3}";
            textoCelda53 = textoCelda53.Replace("{PRESENTESORTEO3}", "");
            Paragraph DataCell53 = new Paragraph(new Run(new Text(textoCelda53)));
            UtilidadesActas.JustificarCentro(DataCell53);
            tableDataCell53.AppendChild(DataCell53);
            tableDataCell53.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell54 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell54);
            String textoCelda54 = "{PROXIMOSORTEO3}";
            textoCelda54 = textoCelda54.Replace("{PROXIMOSORTEO3}", "");
            Paragraph DataCell54 = new Paragraph(new Run(new Text(textoCelda54)));
            UtilidadesActas.JustificarCentro(DataCell54);
            tableDataCell54.AppendChild(DataCell54);
            tableDataCell54.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 6

            TableRow tableDataRow6 = new TableRow();
            table.AppendChild(tableDataRow6);

            TableCell tableDataCell61 = new TableCell();
            tableDataRow6.AppendChild(tableDataCell61);
            Paragraph DataCell61 = new Paragraph(new Run(new Text("Premio de ₡3.000.000")));
            UtilidadesActas.JustificarCentro(DataCell61);
            tableDataCell61.AppendChild(DataCell61);
            tableDataCell61.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell62 = new TableCell();
            tableDataRow6.AppendChild(tableDataCell62);
            Paragraph DataCell62 = new Paragraph(new Run(new Text("16")));
            UtilidadesActas.JustificarCentro(DataCell62);
            tableDataCell62.AppendChild(DataCell62);
            tableDataCell62.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell63 = new TableCell();
            tableDataRow6.AppendChild(tableDataCell63);
            String textoCelda63 = "{PRESENTESORTEO4}";
            textoCelda63 = textoCelda63.Replace("{PRESENTESORTEO4}", "");
            Paragraph DataCell63 = new Paragraph(new Run(new Text(textoCelda63)));
            UtilidadesActas.JustificarCentro(DataCell63);
            tableDataCell63.AppendChild(DataCell63);
            tableDataCell63.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell64 = new TableCell();
            tableDataRow6.AppendChild(tableDataCell64);
            String textoCelda64 = "{PROXIMOSORTEO4}";
            textoCelda64 = textoCelda64.Replace("{PROXIMOSORTEO4}", "");
            Paragraph DataCell64 = new Paragraph(new Run(new Text(textoCelda64)));
            UtilidadesActas.JustificarCentro(DataCell64);
            tableDataCell64.AppendChild(DataCell64);
            tableDataCell64.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 7

            TableRow tableDataRow7 = new TableRow();
            table.AppendChild(tableDataRow7);

            TableCell tableDataCell71 = new TableCell();
            tableDataRow7.AppendChild(tableDataCell71);
            Paragraph DataCell71 = new Paragraph(new Run(new Text("Premio de ₡5.000.000")));
            UtilidadesActas.JustificarCentro(DataCell71);
            tableDataCell71.AppendChild(DataCell71);
            tableDataCell71.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell72 = new TableCell();
            tableDataRow7.AppendChild(tableDataCell72);
            Paragraph DataCell72 = new Paragraph(new Run(new Text("10")));
            UtilidadesActas.JustificarCentro(DataCell72);
            tableDataCell72.AppendChild(DataCell72);
            tableDataCell72.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell73 = new TableCell();
            tableDataRow7.AppendChild(tableDataCell73);
            String textoCelda73 = "{PRESENTESORTEO5}";
            textoCelda73 = textoCelda73.Replace("{PRESENTESORTEO5}", "");
            Paragraph DataCell73 = new Paragraph(new Run(new Text(textoCelda73)));
            UtilidadesActas.JustificarCentro(DataCell73);
            tableDataCell73.AppendChild(DataCell73);
            tableDataCell73.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell74 = new TableCell();
            tableDataRow7.AppendChild(tableDataCell74);
            String textoCelda74 = "{PROXIMOSORTEO5}";
            textoCelda74 = textoCelda74.Replace("{PROXIMOSORTEO5}", "");
            Paragraph DataCell74 = new Paragraph(new Run(new Text(textoCelda74)));
            UtilidadesActas.JustificarCentro(DataCell74);
            tableDataCell74.AppendChild(DataCell74);
            tableDataCell74.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 8

            TableRow tableDataRow8 = new TableRow();
            table.AppendChild(tableDataRow8);

            TableCell tableDataCell81 = new TableCell();
            tableDataRow8.AppendChild(tableDataCell81);
            Paragraph DataCell81 = new Paragraph(new Run(new Text("Premio de ₡10.000.000")));
            UtilidadesActas.JustificarCentro(DataCell81);
            tableDataCell81.AppendChild(DataCell81);
            tableDataCell81.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell82 = new TableCell();
            tableDataRow8.AppendChild(tableDataCell82);
            Paragraph DataCell82 = new Paragraph(new Run(new Text("2")));
            UtilidadesActas.JustificarCentro(DataCell82);
            tableDataCell82.AppendChild(DataCell82);
            tableDataCell82.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell83 = new TableCell();
            tableDataRow8.AppendChild(tableDataCell83);
            String textoCelda83 = "{PRESENTESORTEO6}";
            textoCelda83 = textoCelda83.Replace("{PRESENTESORTEO6}", "");
            Paragraph DataCell83 = new Paragraph(new Run(new Text(textoCelda83)));
            UtilidadesActas.JustificarCentro(DataCell83);
            tableDataCell83.AppendChild(DataCell83);
            tableDataCell83.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell84 = new TableCell();
            tableDataRow8.AppendChild(tableDataCell84);
            String textoCelda84 = "{PROXIMOSORTEO6}";
            textoCelda84 = textoCelda84.Replace("{PROXIMOSORTEO6}", "");
            Paragraph DataCell84 = new Paragraph(new Run(new Text(textoCelda84)));
            UtilidadesActas.JustificarCentro(DataCell84);
            tableDataCell84.AppendChild(DataCell84);
            tableDataCell84.Append(UtilidadesActas.CrearMargenCeldas());


            //ROW 9

            TableRow tableDataRow9 = new TableRow();
            table.AppendChild(tableDataRow9);

            TableCell tableDataCell91 = new TableCell();
            tableDataRow9.AppendChild(tableDataCell91);
            Paragraph DataCell91 = new Paragraph(new Run(new Text("Premio de ₡15.000.000")));
            UtilidadesActas.JustificarCentro(DataCell91);
            tableDataCell91.AppendChild(DataCell91);
            tableDataCell91.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell92 = new TableCell();
            tableDataRow9.AppendChild(tableDataCell92);
            Paragraph DataCell92 = new Paragraph(new Run(new Text("1")));
            UtilidadesActas.JustificarCentro(DataCell92);
            tableDataCell92.AppendChild(DataCell92);
            tableDataCell92.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell93 = new TableCell();
            tableDataRow9.AppendChild(tableDataCell93);
            String textoCelda93 = "{PRESENTESORTEO7}";
            textoCelda93 = textoCelda93.Replace("{PRESENTESORTEO7}", "");
            Paragraph DataCell93 = new Paragraph(new Run(new Text(textoCelda93)));
            UtilidadesActas.JustificarCentro(DataCell93);
            tableDataCell93.AppendChild(DataCell93);
            tableDataCell93.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell94 = new TableCell();
            tableDataRow9.AppendChild(tableDataCell94);
            String textoCelda94 = "{PROXIMOSORTEO7}";
            textoCelda94 = textoCelda94.Replace("{PROXIMOSORTEO7}", "");
            Paragraph DataCell94 = new Paragraph(new Run(new Text(textoCelda94)));
            UtilidadesActas.JustificarCentro(DataCell94);
            tableDataCell94.AppendChild(DataCell94);
            tableDataCell94.Append(UtilidadesActas.CrearMargenCeldas());

            
            //ROW 10

            TableRow tableDataRow10 = new TableRow();
            table.AppendChild(tableDataRow10);
            
            TableCell tableDataCell101 = new TableCell();
            tableDataRow10.AppendChild(tableDataCell101);
            Paragraph DataCell101 = new Paragraph(new Run(new Text("TOTAL DE BOLITAS")));
            UtilidadesActas.JustificarCentro(DataCell101);
            tableDataCell101.AppendChild(DataCell101);
            tableDataCell101.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell102 = new TableCell();
            tableDataRow10.AppendChild(tableDataCell102);
            Paragraph DataCell102 = new Paragraph(new Run(new Text("50")));
            UtilidadesActas.JustificarCentro(DataCell102);
            tableDataCell102.AppendChild(DataCell102);
            tableDataCell102.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell103 = new TableCell();
            tableDataRow10.AppendChild(tableDataCell103);
            String textoCelda103 = "{PRESENTESORTETOTAL}";
            textoCelda103 = textoCelda103.Replace("{PRESENTESORTETOTAL}", "");
            Paragraph DataCell103 = new Paragraph(new Run(new Text(textoCelda103)));
            UtilidadesActas.JustificarCentro(DataCell103);
            tableDataCell103.AppendChild(DataCell103);
            tableDataCell103.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell104 = new TableCell();
            tableDataRow10.AppendChild(tableDataCell104);
            String textoCelda104 = "{PROXIMOSORTETOTAL}";
            textoCelda104 = textoCelda104.Replace("{PROXIMOSORTETOTAL}", "");
            Paragraph DataCell104 = new Paragraph(new Run(new Text(textoCelda104)));
            UtilidadesActas.JustificarCentro(DataCell104);
            tableDataCell104.AppendChild(DataCell104);
            tableDataCell104.Append(UtilidadesActas.CrearMargenCeldas());

            body.AppendChild(table);



        }
        private static void CrearTablaVerificacionTomo(Body body, DatosSorteo sorteo){
            //Creando la tabla de Verificacion de tomos
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


            TableCellProperties tableCellPropertiesHeader1 = new TableCellProperties();
            tableCellPropertiesHeader1.GridSpan = new GridSpan() { Val = 2 };
            TableCell tableDataCell1 = new TableCell();
            tableDataRow.AppendChild(tableDataCell1);
            Paragraph DataCell11 = new Paragraph(new Run(new Text("Número de Acta donde se consigna el resultado oficial del sorteo, suscrita por los fiscalizadores del Sorteo")));
            UtilidadesActas.JustificarCentro(DataCell11);
            tableDataCell1.AppendChild(DataCell11);
            tableDataCell1.Append(tableCellPropertiesHeader1);
            tableDataCell1.Append(UtilidadesActas.CrearMargenCeldas());

            //ROW 2
            TableRow tableDataRow2 = new TableRow();
            table.AppendChild(tableDataRow2);

            TableCell tableDataCell21 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell21);
            Paragraph DataCell21 = new Paragraph(new Run(new Text("Sorteo Anterior")));
            UtilidadesActas.JustificarCentro(DataCell21);
            tableDataCell21.AppendChild(DataCell21);
            tableDataCell21.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell22 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell22);
            String textoCelda22 = "{TOMOANTERIOR}";
            textoCelda22 = textoCelda22.Replace("{TOMOANTERIOR}", UtilidadesActas.UltimoTomoPrevio(sorteo.IdInterno));
            Paragraph DataCell22 = new Paragraph(new Run(new Text(textoCelda22)));
            UtilidadesActas.JustificarCentro(DataCell22);
            tableDataCell22.AppendChild(DataCell22);
            tableDataCell22.Append(UtilidadesActas.CrearMargenCeldas());

            //ROW 3
            TableRow tableDataRow3 = new TableRow();
            table.AppendChild(tableDataRow3);

            TableCell tableDataCell31 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell31);
            Paragraph DataCell31 = new Paragraph(new Run(new Text("Sorteo Actual")));
            UtilidadesActas.JustificarCentro(DataCell31);
            tableDataCell31.AppendChild(DataCell31);
            tableDataCell31.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell32 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell32);
            String textoCelda32 = "{TOMOACTUAL}";
            textoCelda32 = textoCelda32.Replace("{TOMOACTUAL}", UtilidadesActas.UltimoTomo(sorteo.IdInterno));
            Paragraph DataCell32 = new Paragraph(new Run(new Text(textoCelda32)));
            UtilidadesActas.JustificarCentro(DataCell32);
            tableDataCell32.AppendChild(DataCell32);
            tableDataCell32.Append(UtilidadesActas.CrearMargenCeldas());

            body.AppendChild(table);

        }        
        private static void CrearTablaMarchamosUtilizados(Body body, DatosSorteo sorteo){
            //Obteniendo marchamos de la BD
            var context = new proyecto_bdContext();
            var marchamosAperturaSerie = context.Marchamos.Where(m => m.IdSorteo == sorteo.IdInterno 
                                                                && m.Tipo == "Apertura" 
                                                                && m.TipoMarchamo=="Serie").ToList();
            var marchamosCierreSerie = context.Marchamos.Where(m => m.IdSorteo == sorteo.IdInterno 
                                                                && m.Tipo == "Cierre" 
                                                                && m.TipoMarchamo=="Serie").ToList();

            var marchamosAperturaNumero = context.Marchamos.Where(m => m.IdSorteo == sorteo.IdInterno 
                                                                && m.Tipo == "Apertura" 
                                                                && m.TipoMarchamo=="Numero").ToList();
            var marchamosCierreNumero = context.Marchamos.Where(m => m.IdSorteo == sorteo.IdInterno 
                                                                && m.Tipo == "Cierre" 
                                                                && m.TipoMarchamo=="Numero").ToList();

            var marchamosAperturaPremio = context.Marchamos.Where(m => m.IdSorteo == sorteo.IdInterno 
                                                                && m.Tipo == "Apertura" 
                                                                && m.TipoMarchamo=="Premio").ToList();
            var marchamosCierrePremio = context.Marchamos.Where(m => m.IdSorteo == sorteo.IdInterno 
                                                                && m.Tipo == "Cierre" 
                                                                && m.TipoMarchamo=="Premio").ToList();

            var marchamosAperturaAcumuladoFichero = context.Marchamos.Where(m => m.IdSorteo == sorteo.IdInterno 
                                                                && m.Tipo == "Apertura" 
                                                                && m.TipoMarchamo=="AcumuladoFichero").ToList();
            var marchamosCierreAcumuladoFichero = context.Marchamos.Where(m => m.IdSorteo == sorteo.IdInterno 
                                                                && m.Tipo == "Cierre" 
                                                                && m.TipoMarchamo=="AcumuladoFichero").ToList();

            var marchamosAperturaAcumuladoTula = context.Marchamos.Where(m => m.IdSorteo == sorteo.IdInterno 
                                                                && m.Tipo == "Apertura" 
                                                                && m.TipoMarchamo=="AcumuladoTula").ToList();
            var marchamosCierreAcumuladoTula = context.Marchamos.Where(m => m.IdSorteo == sorteo.IdInterno 
                                                                && m.Tipo == "Cierre" 
                                                                && m.TipoMarchamo=="AcumuladoTula").ToList();

                                                                                                                                                                                                                                                                                                                                                                                                                
                                        
            //Creando la tabla de Verificacion de tomos
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

            TableCellProperties tableCellPropertiesHeader1 = new TableCellProperties();
            tableCellPropertiesHeader1.GridSpan = new GridSpan() { Val = 3 };
            TableCell tableDataCell1 = new TableCell();
            tableDataRow.AppendChild(tableDataCell1);
            Paragraph DataCell11 = new Paragraph(new Run(new Text("Número de marchamo para el fichero")));
            UtilidadesActas.JustificarCentro(DataCell11);
            tableDataCell1.AppendChild(DataCell11);
            tableDataCell1.Append(tableCellPropertiesHeader1);
            tableDataCell1.Append(UtilidadesActas.CrearMargenCeldas());

            //ROW 2
            TableRow tableDataRow2 = new TableRow();
            table.AppendChild(tableDataRow2);

            TableCell tableDataCell21 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell21);
            Paragraph DataCell21 = new Paragraph(new Run(new Text("")));
            UtilidadesActas.JustificarCentro(DataCell21);
            tableDataCell21.AppendChild(DataCell21);
            tableDataCell21.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell22 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell22);
            Paragraph DataCell22 = new Paragraph(new Run(new Text("Apertura")));
            UtilidadesActas.JustificarCentro(DataCell22);
            tableDataCell22.AppendChild(DataCell22);
            tableDataCell22.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell23 = new TableCell();
            tableDataRow2.AppendChild(tableDataCell23);
            Paragraph DataCell23 = new Paragraph(new Run(new Text("Cierre")));
            UtilidadesActas.JustificarCentro(DataCell23);
            tableDataCell23.AppendChild(DataCell23);
            tableDataCell23.Append(UtilidadesActas.CrearMargenCeldas());

            //ROW SERIES
            var arregloMarchamosAperturaSerie = marchamosAperturaSerie.ToArray();
            var arregloMarchamosCierreSerie = marchamosCierreSerie.ToArray();
            

            //Iterar en las listas tomando el indice
            
            foreach (var item in arregloMarchamosAperturaSerie.Select((value, i) => new { i, value }))
            {
                TableRow tableDataRowMarchamo = new TableRow();
                table.AppendChild(tableDataRowMarchamo);
                if(item.i==0)
                {
                    TableCell tableDataCellSeries = new TableCell();
                    tableDataRowMarchamo.AppendChild(tableDataCellSeries);
                    Paragraph DataCellSeries = new Paragraph(new Run(new Text("Series")));
                    UtilidadesActas.JustificarCentro(DataCellSeries);
                    tableDataCellSeries.AppendChild(DataCellSeries);
                    tableDataCellSeries.Append(UtilidadesActas.CrearMargenCeldas());

                    TableCell tableDataCellMarchamoApertura = new TableCell();
                    tableDataRowMarchamo.AppendChild(tableDataCellMarchamoApertura);
                    String textoMarchamoApertura = "{MARCHAMOAPERTURA}";
                    textoMarchamoApertura = textoMarchamoApertura.Replace("{MARCHAMOAPERTURA}", item.value.NumeroMarchamo);
                    Paragraph DataCellMarchamoApertura = new Paragraph(new Run(new Text(textoMarchamoApertura)));
                    UtilidadesActas.JustificarCentro(DataCellMarchamoApertura);
                    tableDataCellMarchamoApertura.AppendChild(DataCellMarchamoApertura);
                    tableDataCellMarchamoApertura.Append(UtilidadesActas.CrearMargenCeldas());

                    TableCell tableDataCellMarchamoCierre = new TableCell();
                    tableDataRowMarchamo.AppendChild(tableDataCellMarchamoCierre);
                    String textoMarchamoCierre = "{MARCHAMOCIERRE}";
                    textoMarchamoCierre = textoMarchamoCierre.Replace("{MARCHAMOCIERRE}", arregloMarchamosCierreSerie[item.i].NumeroMarchamo);
                    Paragraph DataCellMarchamoCierre = new Paragraph(new Run(new Text(textoMarchamoCierre)));
                    UtilidadesActas.JustificarCentro(DataCellMarchamoCierre);
                    tableDataCellMarchamoCierre.AppendChild(DataCellMarchamoCierre);
                    tableDataCellMarchamoCierre.Append(UtilidadesActas.CrearMargenCeldas());
                }
                else
                {
                    TableCell tableDataCellSeries = new TableCell();
                    tableDataRowMarchamo.AppendChild(tableDataCellSeries);
                    Paragraph DataCellSeries = new Paragraph(new Run(new Text("")));
                    UtilidadesActas.JustificarCentro(DataCellSeries);
                    tableDataCellSeries.AppendChild(DataCellSeries);
                    tableDataCellSeries.Append(UtilidadesActas.CrearMargenCeldas());

                    TableCell tableDataCellMarchamoApertura = new TableCell();
                    tableDataRowMarchamo.AppendChild(tableDataCellMarchamoApertura);
                    String textoMarchamoApertura = "{MARCHAMOAPERTURA}";
                    textoMarchamoApertura = textoMarchamoApertura.Replace("{MARCHAMOAPERTURA}", item.value.NumeroMarchamo);
                    Paragraph DataCellMarchamoApertura = new Paragraph(new Run(new Text(textoMarchamoApertura)));
                    UtilidadesActas.JustificarCentro(DataCellMarchamoApertura);
                    tableDataCellMarchamoApertura.AppendChild(DataCellMarchamoApertura);
                    tableDataCellMarchamoApertura.Append(UtilidadesActas.CrearMargenCeldas());

                    TableCell tableDataCellMarchamoCierre = new TableCell();
                    tableDataRowMarchamo.AppendChild(tableDataCellMarchamoCierre);
                    String textoMarchamoCierre = "{MARCHAMOCIERRE}";
                    textoMarchamoCierre = textoMarchamoCierre.Replace("{MARCHAMOCIERRE}", "");
                    Paragraph DataCellMarchamoCierre = new Paragraph(new Run(new Text(textoMarchamoCierre)));
                    UtilidadesActas.JustificarCentro(DataCellMarchamoCierre);
                    tableDataCellMarchamoCierre.AppendChild(DataCellMarchamoCierre);
                    tableDataCellMarchamoCierre.Append(UtilidadesActas.CrearMargenCeldas());
                }
            }
            /*

            TableCell tableDataCell31 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell31);
            Paragraph DataCell31 = new Paragraph(new Run(new Text("SERIES")));
            UtilidadesActas.JustificarCentro(DataCell31);
            tableDataCell31.AppendChild(DataCell31);
            tableDataCell31.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell32 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell32);
            Paragraph DataCell32 = new Paragraph(new Run(new Text("{MARCHAMOAPERTURA1}")));
            UtilidadesActas.JustificarCentro(DataCell32);
            tableDataCell32.AppendChild(DataCell32);
            tableDataCell32.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell33 = new TableCell();
            tableDataRow3.AppendChild(tableDataCell33);
            Paragraph DataCell33 = new Paragraph(new Run(new Text("{MARCHAMOCIERRE1}")));
            UtilidadesActas.JustificarCentro(DataCell33);
            tableDataCell33.AppendChild(DataCell33);
            tableDataCell33.Append(UtilidadesActas.CrearMargenCeldas());
            */

            /*
            //ROW 4

            TableRow tableDataRow4 = new TableRow();
            table.AppendChild(tableDataRow4);

            TableCell tableDataCell41 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell41);
            Paragraph DataCell41 = new Paragraph(new Run(new Text("")));
            UtilidadesActas.JustificarCentro(DataCell41);
            tableDataCell41.AppendChild(DataCell41);
            tableDataCell41.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell42 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell42);
            Paragraph DataCell42 = new Paragraph(new Run(new Text("{MARCHAMOAPERTURA2}")));
            UtilidadesActas.JustificarCentro(DataCell42);
            tableDataCell42.AppendChild(DataCell42);
            tableDataCell42.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell43 = new TableCell();
            tableDataRow4.AppendChild(tableDataCell43);
            Paragraph DataCell43 = new Paragraph(new Run(new Text("")));
            UtilidadesActas.JustificarCentro(DataCell43);
            tableDataCell43.AppendChild(DataCell43);
            tableDataCell43.Append(UtilidadesActas.CrearMargenCeldas());

            //ROW 5

            TableRow tableDataRow5 = new TableRow();
            table.AppendChild(tableDataRow5);

            TableCell tableDataCell51 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell51);
            Paragraph DataCell51 = new Paragraph(new Run(new Text("")));
            UtilidadesActas.JustificarCentro(DataCell51);
            tableDataCell51.AppendChild(DataCell51);
            tableDataCell51.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell52 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell52);
            Paragraph DataCell52 = new Paragraph(new Run(new Text("{MARCHAMOAPERTURA3}")));
            UtilidadesActas.JustificarCentro(DataCell52);
            tableDataCell52.AppendChild(DataCell52);
            tableDataCell52.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell53 = new TableCell();
            tableDataRow5.AppendChild(tableDataCell53);
            Paragraph DataCell53 = new Paragraph(new Run(new Text("")));
            UtilidadesActas.JustificarCentro(DataCell53);
            tableDataCell53.AppendChild(DataCell53);
            tableDataCell53.Append(UtilidadesActas.CrearMargenCeldas());

            //ROW 6

            TableRow tableDataRow6 = new TableRow();
            table.AppendChild(tableDataRow6);

            TableCell tableDataCell61 = new TableCell();
            tableDataRow6.AppendChild(tableDataCell61);
            Paragraph DataCell61 = new Paragraph(new Run(new Text("")));
            UtilidadesActas.JustificarCentro(DataCell61);
            tableDataCell61.AppendChild(DataCell61);
            tableDataCell61.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell62 = new TableCell();
            tableDataRow6.AppendChild(tableDataCell62);
            Paragraph DataCell62 = new Paragraph(new Run(new Text("{MARCHAMOAPERTURA4}")));
            UtilidadesActas.JustificarCentro(DataCell62);
            tableDataCell62.AppendChild(DataCell62);
            tableDataCell62.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell63 = new TableCell();
            tableDataRow6.AppendChild(tableDataCell63);
            Paragraph DataCell63 = new Paragraph(new Run(new Text("")));
            UtilidadesActas.JustificarCentro(DataCell63);
            tableDataCell63.AppendChild(DataCell63);
            tableDataCell63.Append(UtilidadesActas.CrearMargenCeldas());
            */

            //ROW Numeros
            var arregloMarchamosAperturaNumero = marchamosAperturaNumero.ToArray();
            var arregloMarchamosCierreNumero= marchamosCierreNumero.ToArray();
            TableRow tableDataRow7 = new TableRow();
            table.AppendChild(tableDataRow7);

            foreach(var item in arregloMarchamosAperturaNumero.Select((value, i) => new { i, value }))
            {
                 TableCell tableDataCellSeries = new TableCell();
                tableDataRow7.AppendChild(tableDataCellSeries);
                Paragraph DataCellSeries = new Paragraph(new Run(new Text("Numeros")));
                UtilidadesActas.JustificarCentro(DataCellSeries);
                tableDataCellSeries.AppendChild(DataCellSeries);
                tableDataCellSeries.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCellMarchamoApertura = new TableCell();
                tableDataRow7.AppendChild(tableDataCellMarchamoApertura);
                String textoMarchamoApertura = "{MARCHAMOAPERTURA}";
                textoMarchamoApertura = textoMarchamoApertura.Replace("{MARCHAMOAPERTURA}", item.value.NumeroMarchamo);
                Paragraph DataCellMarchamoApertura = new Paragraph(new Run(new Text(textoMarchamoApertura)));
                UtilidadesActas.JustificarCentro(DataCellMarchamoApertura);
                tableDataCellMarchamoApertura.AppendChild(DataCellMarchamoApertura);
                tableDataCellMarchamoApertura.Append(UtilidadesActas.CrearMargenCeldas());

                TableCell tableDataCellMarchamoCierre = new TableCell();
                tableDataRow7.AppendChild(tableDataCellMarchamoCierre);
                String textoMarchamoCierre = "{MARCHAMOCIERRE}";
                textoMarchamoCierre = textoMarchamoCierre.Replace("{MARCHAMOCIERRE}", arregloMarchamosCierreNumero[item.i].NumeroMarchamo);
                Paragraph DataCellMarchamoCierre = new Paragraph(new Run(new Text(textoMarchamoCierre)));
                UtilidadesActas.JustificarCentro(DataCellMarchamoCierre);
                tableDataCellMarchamoCierre.AppendChild(DataCellMarchamoCierre);
                tableDataCellMarchamoCierre.Append(UtilidadesActas.CrearMargenCeldas());
            }

            /*
            TableCell tableDataCell71 = new TableCell();
            tableDataRow7.AppendChild(tableDataCell71);
            Paragraph DataCell71 = new Paragraph(new Run(new Text("Números")));
            UtilidadesActas.JustificarCentro(DataCell71);
            tableDataCell71.AppendChild(DataCell71);
            tableDataCell71.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell72 = new TableCell();
            tableDataRow7.AppendChild(tableDataCell72);
            Paragraph DataCell72 = new Paragraph(new Run(new Text("{MARCHAMONUMEROS1}")));
            UtilidadesActas.JustificarCentro(DataCell72);
            tableDataCell72.AppendChild(DataCell72);
            tableDataCell72.Append(UtilidadesActas.CrearMargenCeldas());
            
            TableCell tableDataCell73 = new TableCell();
            tableDataRow7.AppendChild(tableDataCell73);
            Paragraph DataCell73 = new Paragraph(new Run(new Text("{MARCHAMONUMEROSCIERRE1}")));
            UtilidadesActas.JustificarCentro(DataCell73);
            tableDataCell73.AppendChild(DataCell73);
            tableDataCell73.Append(UtilidadesActas.CrearMargenCeldas());
            */

            //ROW Acumulado fichero
            var arregloMarchamosAperturaAcumuladoFichero = marchamosAperturaAcumuladoFichero.ToArray();
            var arregloMarchamosAperturaAcumuladoTula = marchamosAperturaAcumuladoTula.ToArray();

            var arregloMarchamosCierreAcumuladoFichero = marchamosCierreAcumuladoFichero.ToArray();
            var arregloMarchamosCierreAcumuladoTula = marchamosCierreAcumuladoTula.ToArray();

            TableRow tableDataRow8 = new TableRow();
            table.AppendChild(tableDataRow8);

            foreach(var item in arregloMarchamosAperturaAcumuladoFichero.Select((value, i) => new { i, value }))
            {
                if(item.i==0)
                {
                    TableCell tableDataCellAcumulado = new TableCell();
                    tableDataRow8.AppendChild(tableDataCellAcumulado);
                    Paragraph DataCellAcumulado = new Paragraph(new Run(new Text("Acumulado")));
                    UtilidadesActas.JustificarCentro(DataCellAcumulado);
                    tableDataCellAcumulado.AppendChild(DataCellAcumulado);
                    tableDataCellAcumulado.Append(UtilidadesActas.CrearMargenCeldas());

                    TableCell tableDataCellMarchamoApertura = new TableCell();
                    tableDataRow8.AppendChild(tableDataCellMarchamoApertura);
                    String textoMarchamoApertura = "{MARCHAMOAPERTURA} fichero";
                    textoMarchamoApertura = textoMarchamoApertura.Replace("{MARCHAMOAPERTURA}", item.value.NumeroMarchamo);
                    Paragraph DataCellMarchamoApertura = new Paragraph(new Run(new Text(textoMarchamoApertura)));
                    UtilidadesActas.JustificarCentro(DataCellMarchamoApertura);
                    tableDataCellMarchamoApertura.AppendChild(DataCellMarchamoApertura);
                    tableDataCellMarchamoApertura.Append(UtilidadesActas.CrearMargenCeldas());

                    TableCell tableDataCellMarchamoCierre = new TableCell();
                    tableDataRow8.AppendChild(tableDataCellMarchamoCierre);
                    String textoMarchamoCierre = "{MARCHAMOCIERRE} fichero";
                    textoMarchamoCierre = textoMarchamoCierre.Replace("{MARCHAMOCIERRE}", arregloMarchamosCierreAcumuladoFichero[item.i].NumeroMarchamo);
                    Paragraph DataCellMarchamoCierre = new Paragraph(new Run(new Text(textoMarchamoCierre)));
                    UtilidadesActas.JustificarCentro(DataCellMarchamoCierre);
                    tableDataCellMarchamoCierre.AppendChild(DataCellMarchamoCierre);
                    tableDataCellMarchamoCierre.Append(UtilidadesActas.CrearMargenCeldas());
                }
            }

            //ROW Acumulado tula

            TableRow tableDataRow9 = new TableRow();
            table.AppendChild(tableDataRow9);

             foreach(var item in arregloMarchamosAperturaAcumuladoTula.Select((value, i) => new { i, value }))
             {
                if(item.i==0)
                {
                    TableCell tableDataCellAcumulado = new TableCell();
                    tableDataRow9.AppendChild(tableDataCellAcumulado);
                    Paragraph DataCellAcumulado = new Paragraph(new Run(new Text("")));
                    UtilidadesActas.JustificarCentro(DataCellAcumulado);
                    tableDataCellAcumulado.AppendChild(DataCellAcumulado);
                    tableDataCellAcumulado.Append(UtilidadesActas.CrearMargenCeldas());

                    TableCell tableDataCellMarchamoApertura = new TableCell();
                    tableDataRow9.AppendChild(tableDataCellMarchamoApertura);
                    String textoMarchamoApertura = "{MARCHAMOAPERTURA} tula";
                    textoMarchamoApertura = textoMarchamoApertura.Replace("{MARCHAMOAPERTURA}", item.value.NumeroMarchamo);
                    Paragraph DataCellMarchamoApertura = new Paragraph(new Run(new Text(textoMarchamoApertura)));
                    UtilidadesActas.JustificarCentro(DataCellMarchamoApertura);
                    tableDataCellMarchamoApertura.AppendChild(DataCellMarchamoApertura);
                    tableDataCellMarchamoApertura.Append(UtilidadesActas.CrearMargenCeldas());

                    TableCell tableDataCellMarchamoCierre = new TableCell();
                    tableDataRow9.AppendChild(tableDataCellMarchamoCierre);
                    String textoMarchamoCierre = "{MARCHAMOCIERRE} tula";
                    textoMarchamoCierre = textoMarchamoCierre.Replace("{MARCHAMOCIERRE}", arregloMarchamosCierreAcumuladoTula[item.i].NumeroMarchamo);
                    Paragraph DataCellMarchamoCierre = new Paragraph(new Run(new Text(textoMarchamoCierre)));
                    UtilidadesActas.JustificarCentro(DataCellMarchamoCierre);
                    tableDataCellMarchamoCierre.AppendChild(DataCellMarchamoCierre);
                    tableDataCellMarchamoCierre.Append(UtilidadesActas.CrearMargenCeldas());
                }
             }

            /*
            TableCell tableDataCell81 = new TableCell();
            tableDataRow8.AppendChild(tableDataCell81);
            Paragraph DataCell81 = new Paragraph(new Run(new Text("")));
            UtilidadesActas.JustificarCentro(DataCell81);
            tableDataCell81.AppendChild(DataCell81);
            tableDataCell81.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell82 = new TableCell();
            tableDataRow8.AppendChild(tableDataCell82);
            Paragraph DataCell82 = new Paragraph(new Run(new Text("{MARCHAMOACUMULADO1} fichero"),
                                                        new Break(),
                                                        new Text("MARCHAMOACUMULADO2} tula")));
            tableDataCell82.AppendChild(DataCell82);
            tableDataCell82.Append(UtilidadesActas.CrearMargenCeldas());

            TableCell tableDataCell83 = new TableCell();
            tableDataRow8.AppendChild(tableDataCell83);
            Paragraph DataCell83 = new Paragraph(new Run(new Text("{MARCHAMOACUMULADOCIERRRE1} fichero"),
                                                        new Break(),
                                                        new Text("MARCHAMOACUMULADOCIERRRE2} tula")));
            tableDataCell83.AppendChild(DataCell83);
            tableDataCell83.Append(UtilidadesActas.CrearMargenCeldas());
            */          

            body.AppendChild(table);

        }
        #endregion
        

        
        
    }
}