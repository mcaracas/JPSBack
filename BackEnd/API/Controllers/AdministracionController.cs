using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Data.OleDb;
using System.Text.Json;


namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdministracionController : ControllerBase
    {
        private readonly string connectionString = "Provider=ASEOLEDB;Data Source=10.0.0.231:2025;Catalog=jps_real;User Id=proyecto;Password=proyecto10;";

        // resultados electronicas NT y 3monazos
        [HttpGet("ResultadosElectronicas")]
        public IActionResult GetNumeroFavorecido3M(int numeroSorteo, string tipo)
        {
            char tipoChar = tipo[0];
            string query = $"SELECT NumeroFavorecido=L53NUM FROM L53ARC WHERE L07TLO={tipo} AND L20SOR={numeroSorteo} AND L51NUM=1";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }


        // resultados lotto
        [HttpGet("ResultadosLotto")]
        public IActionResult GetNumeroFavorecidoL(int numeroSorteo)
        {
            string query = $"SELECT NumeroFavorecido=L53NUM FROM L53ARC WHERE L07TLO='L' AND L20SOR={numeroSorteo} AND L51NUM=1";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }

        // resultados lotto revancha
        [HttpGet("LR")]
        public IActionResult GetNumeroFavorecidoLR(int numeroSorteo)
        {
            string query = $"SELECT ResultadoN1_R,ResultadoN2_R,ResultadoN3_R,ResultadoN4_R,ResultadoN5_R FROM MSO_ResultadoLotto where NumeroSorteo={numeroSorteo} And TipoLoteria='L'";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }
        
        //Plan de premios LN
        [HttpGet("PlanPremiosLN")]
        public IActionResult GetPlanPremiosLN(int numeroSorteo)
        {
            string query = $"select Descripcion=L51DES, Cantidad= L51CAN, Premio=(L51MON*d.L20FEN) from  L51ARC a, L51ARC1 b, L20ARC d where b.L07TLO='N' and d.L20SOR={numeroSorteo} and a.L51NUP=b.L51NUP and d.L51NUP=a.L51NUP and b.L07TLO=d.L07TLO";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }

        //Plan de premios LP

        [HttpGet("PlanPremiosLP")] 
        public IActionResult GetPlanPremiosLP(int numeroSorteo) //tipo tiene que ser L o N 
        {
            string query = $"select Descripcion=L51DES, Cantidad= L51CAN, Premio=(L51MON*d.L20FEN) from  L51ARC a, L51ARC1 b, L20ARC d where b.L07TLO='P' and d.L20SOR={numeroSorteo} and a.L51NUP=b.L51NUP and d.L51NUP=a.L51NUP and b.L07TLO=d.L07TLO";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }
     
        //Datos Sorteo nacional y popular
        [HttpGet("DatosSorteo")]
        public IActionResult GetDatosSorteo(int numeroSorteo)
        {
            string query = $"select Orden=L53ORD, Numero=L53NUM, Serie=L53SER, Premio=a.L51MON*d.L20FEN, Verificado=\"Verificado\" from L53ARC c, L51ARC a, L51ARC1 b, L20ARC d where c.L07TLO='N' and c.L20SOR={numeroSorteo} and a.L51NUP=b.L51NUP and b.L07TLO=c.L07TLO and c.L07TLO=d.L07TLO and c.L20SOR=d.L20SOR and d.L51NUP=a.L51NUP and c.L51NUM=a.L51NUM order by L53ORD";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }

        //Traer monto de ventas Nuevos tiempos
        [HttpGet("MontoVentasNT")]
        public IActionResult GetMontoVentasNT(int numeroSorteo)
        {
            string query = $"SELECT a.NumeroSorteo,sum(b.Monto+isnull(MontoReventado,0)) as Monto FROM LD_ApuestasTiempos a, LD_ApuestaTiemposDet b,MSO_DefSorteoElectronico c WHERE a.NumeroSerie = b.NumeroSerie ANd   a.NumeroSorteo = b.NumeroSorteo AND   a.Estado = 'A' and a.NumeroSorteo=c.NumeroSorteo and c.TipoLoteria='E' and c.NumeroSorteo={numeroSorteo} group by a.NumeroSorteo";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }

        //Traer monto de ventas Lotto

        [HttpGet("MontoVentasLotto")]
        public IActionResult GetMontoVentasLotto(int numeroSorteo)
        {
            string query = $"SELECT a.NumeroSorteo, SUM(b.Monto) as Monto FROM LD_ApuestasLoto a, LD_ApuestaLotoDet b,MSO_DefSorteoElectronico c WHERE a.NumeroSerie = b.NumeroSerie AND   a.NumeroSorteo = b.NumeroSorteo AND   a.Estado = 'A' and a.NumeroSorteo=c.NumeroSorteo and c.TipoLoteria='L' and c.NumeroSorteo={numeroSorteo} group by a.NumeroSorteo";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }

        //Traer monto de ventas Monazos
        [HttpGet("MontoVentasMonazos")]
        public IActionResult GetMontoVentasMonazos(int numeroSorteo)
        {
            string query = $"select 'M', a.NumeroSorteo, sum(b.Monto) from LD_Apuestas3Monazos a, LD_Apuesta3MonazosDet b, LD_Agentes c, MSO_DefSorteoElectronico d where a.NumeroSorteo ={numeroSorteo} and a.NumeroSorteo=d.NumeroSorteo and d.TipoLoteria='M' and a.NumeroSerie = b.NumeroSerie and a.NumeroSorteo = b.NumeroSorteo and a.NumeroAgente = c.NumeroAgente and a.NumeroTerminal = c.NumeroTerminal group by a.NumeroSorteo";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }

        //Representante GG por sorteo
        [HttpGet("RepresentanteGGporSorteo")]
        public IActionResult GetRepresentateGGporSorteo(int numeroSorteo)
        {
            string query = $"SELECT PorGerencia,EtiquetaGerencia  FROM MCP_CierreResultados where TipoLoteria='E' and NumeroSorteo={numeroSorteo}";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }
        
        //Representante GG 
        [HttpGet("RepresentanteGG")]
        public IActionResult GetRepresentateGG()
        {
            string query = $"SELECT Nombre, Etiqueta FROM MSO_Fiscalizadores where Tipo='G' and Estado='A'";
            DataTable results = GetDataTable(query);

            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }

        //Representante GPC por sorteo
        [HttpGet("RepresentanteGPCporSorteo")]
        public IActionResult GetRepresentateGPCporSorteo(int numeroSorteo)
        {
            string query = $"SELECT PorLoterias,EtiquetaLoterias FROM MCP_CierreResultados where TipoLoteria='E' and NumeroSorteo={numeroSorteo}";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }

        //Representante GPC
        [HttpGet("RepresentanteGPC")]
        public IActionResult GetRepresentateGPC()
        {
            string query = $"SELECT Nombre, Etiqueta FROM MSO_Fiscalizadores where Tipo='L' and Estado='A'";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }

        //Representante GO por sorteo
        [HttpGet("RepresentanteGOporSorteo")]
        public IActionResult GetRepresentateGOporSorteo(int numeroSorteo)
        {
            string query = $"SELECT PorAuditoria,EtiquetaAuditoria FROM MCP_CierreResultados where TipoLoteria='E' and NumeroSorteo={numeroSorteo}";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }

        //Representante GO
        [HttpGet("RepresentanteGO")]
        public IActionResult GetRepresentateGO()
        {
            string query = $"SELECT Nombre, Etiqueta FROM MSO_Fiscalizadores where Tipo='O' and Estado='A'";
            DataTable results = GetDataTable(query);
            String json="";

            if (results != null){
                json = JsonConvert.SerializeObject(results, Formatting.Indented);
            }
    
            return Ok(json);
        }


        // Get empleados por sorteo
[HttpGet("EmpleadosPorSorteo")]
public IActionResult GetCantantePorSorteo(int numeroSorteo, string tipoLoteria)
{
    int sorteoNT = 0;
    DateTime fechaRealizacion = DateTime.MinValue;

    string query = @"
        DECLARE @SorteoNT INT;
        DECLARE @FechaRealizacion DATETIME;

        SELECT @FechaRealizacion = FechaRealizacion
        FROM MSO_DefSorteoElectronico c
        WHERE c.TipoLoteria = @TipoLoteria AND c.NumeroSorteo = @NumeroSorteo;

        SELECT @SorteoNT = NumeroSorteo
        FROM MSO_DefSorteoElectronico c
        WHERE c.TipoLoteria = 'E' AND c.FechaRealizacion = @FechaRealizacion;
    ";

    using (DataTable result = GetDataTable(query))
    {
        if (result.Rows.Count > 0)
        {
            DataRow row = result.Rows[0];
            if (!row.IsNull(0))
            {
                sorteoNT = Convert.ToInt32(row[0]);
            }
            if (!row.IsNull(1))
            {
                fechaRealizacion = Convert.ToDateTime(row[1]);
            }
        }
    }

    query = @"
        SELECT c.CodigoEmpleado, c.NombreEmpleado
        FROM perdba..RH_RolAsistenciasDet a, perdba..RH_RolAsistenciasEnc b, perdba..RH_Empleados c, perdba..RH_FuncionesSorteos e
        WHERE a.Periodo = b.Periodo
            AND a.Consecutivo = b.Consecutivo
            AND a.CodigoEmpleado = c.CodigoEmpleado
            AND a.CodigoFunciones = e.CodigoFunciones
            AND b.Sorteo = @SorteoNT
            AND b.TipoLoteria = 'F'
            AND e.CodigoFunciones IN (166, 145, 181, 186, 198, 191, 94, 108);
    ";

    if (tipoLoteria == "P")
    {
        query = @"
            SELECT c.CodigoEmpleado, c.NombreEmpleado
            FROM perdba..RH_RolAsistenciasDet a, perdba..RH_RolAsistenciasEnc b, perdba..RH_Empleados c, perdba..RH_FuncionesSorteos e
            WHERE a.Periodo = b.Periodo
                AND a.Consecutivo = b.Consecutivo
                AND a.CodigoEmpleado = c.CodigoEmpleado
                AND a.CodigoFunciones = e.CodigoFunciones
                AND b.Sorteo = @NumeroSorteo
                AND b.TipoLoteria = @TipoLoteria
                AND e.CodigoFunciones IN (166, 145, 181, 186, 198, 191, 94, 108);
        ";
    }
    else if (tipoLoteria != "L" && tipoLoteria != "E" && tipoLoteria != "M")
    {
        query = @"
            SELECT c.CodigoEmpleado, c.NombreEmpleado
            FROM perdba..RH_RolAsistenciasDet a, perdba..RH_RolAsistenciasEnc b, perdba..RH_Empleados c, perdba..RH_FuncionesSorteos e
            WHERE a.Periodo = b.Periodo
                AND a.Consecutivo = b.Consecutivo
                AND a.CodigoEmpleado = c.CodigoEmpleado
                AND a.CodigoFunciones = e.CodigoFunciones
                AND b.Sorteo = @NumeroSorteo
                AND b.TipoLoteria = @TipoLoteria
                AND e.CodigoFunciones IN (166, 145, 181, 186, 198, 191, 94, 108)
            UNION
            SELECT c.CodigoEmpleado, c.NombreEmpleado
            FROM perdba..RH_RolAsistenciasDet a, perdba..RH_RolAsistenciasEnc b, perdba..RH_Empleados c, perdba..RH_FuncionesSorteos e
            WHERE a.Periodo = b.Periodo
                AND a.Consecutivo = b.Consecutivo
                AND a.CodigoEmpleado = c.CodigoEmpleado
                AND a.CodigoFunciones = e.CodigoFunciones
                AND b.Sorteo = @NumeroSorteo
                AND b.TipoLoteria = 'E'
                AND e.CodigoFunciones IN (166, 145, 181, 186, 198, 191, 94, 108);
        ";
    }

    using (DataTable result = GetDataTable(query))
    {
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

        foreach (DataRow row in result.Rows)
        {
        Dictionary<string, object> rowData = new Dictionary<string, object>();

        foreach (DataColumn column in result.Columns)
        {
            rowData[column.ColumnName] = row[column];
        }

             rows.Add(rowData);
            }

            return Ok(rows);
    }   
}

    //Escrutinio de sorteos
[HttpGet("escrutinio/{type}/{drawNumber}")]
public IActionResult getEscrutinio(string type, int drawNumber)
{
    string query = $"SELECT a.NumeroSorteo, SUM(b.MontoParte * b.NumeroPartes) AS TotalAmount " +
                   $"FROM LD_ApuestasGanadoras a, LD_ApuestaGanadoraDet b, MSO_DefSorteoElectronico d " +
                   $"WHERE a.NumeroSorteo = {drawNumber} " +
                   $"AND a.TipoProducto = b.TipoProducto " +
                   $"AND a.TipoProducto = {GetLotteryTypeCode(type)} " +
                   $"AND a.NumeroSerie = b.NumeroSerie " +
                   $"AND a.NumeroSorteo = b.NumeroSorteo " +
                   $"AND a.NumeroSorteo = d.NumeroSorteo " +
                   $"AND d.TipoLoteria = '{type}' " +
                   $"GROUP BY a.NumeroSorteo";

    DataTable result = GetDataTable(query);

    String json="";

    if (result != null){
        json = JsonConvert.SerializeObject(result, Formatting.Indented);
    }

    return Ok(json);
}

    private int GetLotteryTypeCode(string type)
        {
            switch (type)
            {
                case "M":
                    return 9;
                case "L":
                    return 10;
                case "E":
                    return 11;
                default:
                    return -1; // Invalid lottery type
            }
        }

        //compra excedentes hay que mandar si es L o P
        [HttpGet("compraExcedentes")]
        public IActionResult GetExcessPurchases(int numeroLoteria, char tipo)
        {
        string query = "SELECT FraccionesRecibidas AS C50FRC, HoraEscaneoFinal AS HoraCierre " +
                   "FROM dbo.C51B12 " +
                   $"WHERE L07TLO = {tipo} " +
                   $"AND L20SOR = {numeroLoteria}";

            DataTable result = GetDataTable(query);

            return Ok(result);
        }      

        //series excluidas, hay que mandar si es L o P
        [HttpGet("seriesExcluidas")]
        public IActionResult GetExcludedSeries(int numeroSorteo, char tipoLoteria)
        {
                string query = "SELECT SeriesOmitidas " +
                   "FROM MCP_CierreResultados " +
                   $"WHERE TipoLoteria = '{tipoLoteria}' " +
                   $"AND NumeroSorteo = {numeroSorteo}";

                DataTable result = GetDataTable(query);

                return Ok(result);
        }

    //marchamos 
    [HttpGet("marchamosNT")]
    public IActionResult GetMarchamosNT(int numeroSorteo)
    {
        string query = "SELECT MarchamoNumerosIni,MarchamoRevenIni,MarchamoNumerosFin,MarchamoRevenFin FROM MCP_CierreResultados where TipoLoteria='E' and NumeroSorteo={numeroSorteo};";
        DataTable result = GetDataTable(query);

                return Ok(result);
    }  
    
    [HttpGet("marchamosL")]
    public IActionResult GetMarchamosL(int numeroSorteo)
    {
    string query = "SELECT MarchamoAcuIni, MarchamoAcuFin FROM MCP_CierreResultados WHERE TipoLoteria = 'L' AND NumeroSorteo = " + numeroSorteo;
    DataTable result = GetDataTable(query);

    return Ok(result);
    }

    [HttpGet("marchamosM")]
    public IActionResult GetMarchamosM(int numeroSorteo)
    {
    string query = "SELECT MarchamoSeriesIni, MarchamoSeriesFin FROM MCP_CierreResultados WHERE TipoLoteria = 'M' AND NumeroSorteo = " + numeroSorteo;
    DataTable result = GetDataTable(query);

    return Ok(result);
    }

    [HttpGet("marchamosP")]
    public IActionResult GetMarchamosP(int numeroSorteo)
    {
    string query = "SELECT SeriesApertura = Marchamo3MonIni, NumeroApertura = Marchamo3MonContIni, SeriesCierre = MarchamoSeriesFin, NumeroCierre = MarchamoNumerosFin FROM MCP_CierreResultados WHERE TipoLoteria = 'P' AND NumeroSorteo = " + numeroSorteo;
    DataTable result = GetDataTable(query);

    return Ok(result);
    }

    [HttpGet("marchamosN")]
    public IActionResult GetMarchamosN(int numeroSorteo)
    {
    string query = "SELECT SeriesApertura=Marchamo3MonIni,NumeroApertura=Marchamo3MonContIni,PremiosApertura=MarchamoPremiosIni, SeriesCierre=MarchamoSeriesFin,NumeroCierre=MarchamoNumerosFin,PremiosCierre=MarchamoPremiosFin FROM dbo.MCP_CierreResultados where TipoLoteria='N' and NumeroSorteo=" + numeroSorteo;
    DataTable result = GetDataTable(query);

    return Ok(result);
    }





        


        // Helper method to execute SQL query and return DataTable
        private DataTable GetDataTable(string query)
        {
            using (OleDbConnection connection = new OleDbConnection(connectionString))
            {
                using (OleDbCommand command = new OleDbCommand(query, connection))
                {
                    connection.Open();
                    DataTable dataTable = new DataTable();
                    using (OleDbDataReader reader = command.ExecuteReader())
                    {
                        dataTable.Load(reader);
                    }
                    return dataTable;
                }
            }
        }
    }
}
