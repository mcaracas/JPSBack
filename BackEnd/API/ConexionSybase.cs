using System.Data.OleDb;

namespace API;

//create data base connection class
public class ConexionSybase
{
    private const string V =
        "Provider=ASEOLEDB;Data Source=PC-Escritorio:5000;Catalog=master;User Id=sa;Password=contra;";

    public Resultado GetResultadoSybase(int predicate) //predicate is the id of the result
    {
        string connStr; //connection string
        connStr =
            "Provider=ASEOLEDB;Data Source=PC-Escritorio:5000;Catalog=master;User Id=sa;Password=contra;";
        OleDbConnection conn = new OleDbConnection(connStr); //create connection
        conn.Open(); //open connection
        OleDbCommand myCommand = new OleDbCommand(
            "select * from resultados where IdDatoSorteo = " + predicate.ToString(),
            conn
        ); //create command
        OleDbDataReader myReader = myCommand.ExecuteReader(); //execute command and get data reader object
        Resultado resultado = new Resultado(); //create result object
        while (myReader.Read()) //read data from data reader object
        {
            resultado.IdResultado = (int)myReader["IdResultado"]; //get id_resultado from data reader object and cast it to int
            resultado.NumeroResultado = (int)myReader["NumeroResultado"]; //get numero_resultado from data reader object and cast it to int
            resultado.NumPremioPlan = (int)myReader["NumPremioPlan"]; //get num_premio_plan from data reader object and cast it to int
            resultado.IdDatoSorteo = (int)myReader["IdDatoSorteo"]; //get id_dato_sorteo from data reader object and cast it to int
            resultado.NumFavorecido = (string)myReader["NumFavorecido"];
            resultado.SeriePremio = (string)myReader["SeriePremio"];
            resultado.Verificado = (bool)myReader["Verificado"];
            resultado.tipoResultado = (string)myReader["tipoResultado"];
        }
        conn.Close(); //close connection
        return resultado; //return result object
    }

    public CierreApuestas GetCierreApuestas(int predicate)
    {
        string connStr;
        connStr = V;
        OleDbConnection conn = new OleDbConnection(connStr);
        conn.Open();
        OleDbCommand myCommand = new OleDbCommand(
            "select * from CierreApuestas where idSorteo = " + predicate.ToString(),
            conn
        );
        OleDbDataReader myReader = myCommand.ExecuteReader();
        CierreApuestas cierr = new CierreApuestas();
        while (myReader.Read())
        {
            cierr.IdCierre = (int)myReader["id"];
            cierr.Monto = (double)myReader["montoCierre"];
            cierr.IdSort = (int)myReader["idSorteo"];
        }
        conn.Close();
        return cierr;
    }

    public AcumGtec GetAcumulado(int predicate)
    {
        string connStr;
        connStr = V;
        OleDbConnection conn = new OleDbConnection(connStr);
        conn.Open();
        OleDbCommand myCommand = new OleDbCommand(
            "select * from AcumuladoGtec where idSorteo = " + predicate.ToString(),
            conn
        );
        OleDbDataReader myReader = myCommand.ExecuteReader();
        AcumGtec acum = new AcumGtec();
        while (myReader.Read())
        {
            acum.IdAcumulado = (int)myReader["id"];
            acum.Monto = (double)myReader["montoAcumulado"]; //este valor tiene que ser double porque en sybase float es de 64 bits y en c# float es de 32 bits
            acum.idSorteo = (int)myReader["idSorteo"];
        }
        conn.Close();
        return acum;
    }

    public Ventas GetVentas(int predicate)
    {
        string connStr;
        connStr = V;
        OleDbConnection conn = new OleDbConnection(connStr);
        conn.Open();
        OleDbCommand myCommand = new OleDbCommand(
            "select * from ReporteVentas where idsorteo = " + predicate.ToString(),
            conn
        );
        OleDbDataReader myReader = myCommand.ExecuteReader();
        Ventas ventas = new Ventas();
        while (myReader.Read())
        {
            ventas.id = (int)myReader["id"];
            ventas.idSorteo = (int)myReader["idSorteo"];
            ventas.montoVentas = (double)myReader["montoVentas"];
            ventas.montoComprado = (double)myReader["montoComprado"];
        }
        conn.Close();
        return ventas;
    }

    public List<Series> GetSeries(int predicate, int Vendido)
    {
        string connStr;
        connStr = V;
        OleDbConnection conn = new OleDbConnection(connStr);
        conn.Open();
        OleDbCommand myCommand = new OleDbCommand(
            "select * from Serie where idSorteo = "
                + predicate.ToString()
                + "and Vendido = "
                + Vendido.ToString(),
            conn
        );
        OleDbDataReader myReader = myCommand.ExecuteReader();
        List<Series> series = new List<Series>();
        while (myReader.Read())
        {
            Series serie = new Series();
            serie.id = (int)myReader["id"];
            serie.idSorteo = (int)myReader["idSorteo"];
            serie.SerieEnJuego = (int)myReader["SerieEnJuego"];
            serie.Vendido = (bool)myReader["Vendido"];
            series.Add(serie);
        }
        conn.Close();
        return series;
    }

    public Escrutinio GetEscrutinio(int predicate)
    {
        string connStr;
        connStr = V;
        OleDbConnection conn = new OleDbConnection(connStr);
        conn.Open();
        OleDbCommand myCommand = new OleDbCommand(
            "select * from Escrutinio where idSorteo = " + predicate.ToString(),
            conn
        );
        OleDbDataReader myReader = myCommand.ExecuteReader();
        Escrutinio escrutinio = new Escrutinio();
        while (myReader.Read())
        {
            escrutinio.id = (int)myReader["id"];
            escrutinio.idsorteo = (int)myReader["idSorteo"];
            escrutinio.escrutinio = (double)myReader["escrutinio"];
        }
        conn.Close();
        return escrutinio;
    }
}
