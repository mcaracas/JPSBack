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
    public static class UtilidadesActas
    {
        public static TableCellProperties CrearMargenCeldas(){
            var tablePropertiesMargen = new TableCellProperties(new TableCellMargin
                {
                    LeftMargin = new LeftMargin { Width = "100" },
                    RightMargin = new RightMargin { Width = "100" },
                    TopMargin = new TopMargin { Width = "0" },
                    BottomMargin = new BottomMargin { Width = "0" }
                });

            return tablePropertiesMargen;
        }


        public static void AgregarSaltoPagina (Body body){
            // Agrega un salto de página al cuerpo
            Paragraph breakParagraph = new Paragraph(new Run(new Break() { Type = BreakValues.Page }));
            body.Append(breakParagraph);
        }  

        public static void AgregarEnter(Body body){
            // Agrega un salto de línea al cuerpo
            Paragraph breakParagraph = new Paragraph(new Run(new Break() { Type = BreakValues.TextWrapping }));
            body.Append(breakParagraph);
        }

         public static void CambiarFuente(Run run, string fuente){
            // Establece la fuente del texto
            RunProperties runProperties = new RunProperties();
            RunFonts runFonts = new RunFonts() { Ascii = fuente };
            runProperties.Append(runFonts);
            run.PrependChild(runProperties);
        }

        public static void CambiarTamano(Run run, string tamano){
            // Establece el tamaño de la letra del texto
            RunProperties runProperties = new RunProperties();
            FontSize fontSize = new FontSize() { Val = tamano };
            runProperties.Append(fontSize);
            run.PrependChild(runProperties);
        }   

        public static void Negrita(Run run){
            // Pone el texto de TODO el parrafo en Negrita
            RunProperties runProperties = new RunProperties();
            Bold bold = new Bold();
            runProperties.Append(bold);
            run.PrependChild(runProperties);
        }

        public static void JustificarParrafo(Paragraph paragraph){
            // Justifica el texto del párrafo
            paragraph.ParagraphProperties = new ParagraphProperties(
                new Justification() { Val = JustificationValues.Both });
        }

        public static void JustificarDerecha(Paragraph paragraph){
            // Justifica el texto del párrafo a la derecha
            paragraph.ParagraphProperties = new ParagraphProperties(
                new Justification() { Val = JustificationValues.Right });
        }

        public static void JustificarCentro(Paragraph paragraph){
            // Justifica el texto del párrafo al centro
            paragraph.ParagraphProperties = new ParagraphProperties(
                new Justification() { Val = JustificationValues.Center });
        }

        public static void CrearTablaProcedimientos(Body body, IOrderedEnumerable<RepListaChequeoActum> procedimientos, string titulo){
            //Poniendo titulo antes de la tabla
            Paragraph paragraphTituloProcedimientos = body.AppendChild(new Paragraph());
            JustificarParrafo(paragraphTituloProcedimientos);
            Run runTituloProcedimientos = paragraphTituloProcedimientos.AppendChild(new Run());
            runTituloProcedimientos.AppendChild(new Text(titulo));
            Negrita(runTituloProcedimientos);


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
        
    }
}