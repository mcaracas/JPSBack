
using System.Data.OleDb;


namespace API;

//create data base connection class 
public class ConexionSybase
{
    private const string V = "Provider=ASEOLEDB;Data Source=DESKTOP-G368AIS:5000;Catalog=master;User Id=sa;Password=root123;";

    public  Resultado GetResultadoSybase(int predicate) //predicate is the id of the result
    {
      string connStr; //connection string
      connStr = "Provider=ASEOLEDB;Data Source=DESKTOP-G368AIS:5000;Catalog=master;User Id=sa;Password=root123;"; 
      OleDbConnection conn = new OleDbConnection(connStr); //create connection
      conn.Open(); //open connection
      OleDbCommand myCommand = new OleDbCommand("select * from resultados where id_dato_sorteo = " + predicate.ToString(), conn); //create command
      OleDbDataReader myReader = myCommand.ExecuteReader(); //execute command and get data reader object 
      Resultado resultado = new Resultado(); //create result object
          while (myReader.Read()) //read data from data reader object
            {
                resultado.IdResultado = (int)myReader["id_resultado"]; //get id_resultado from data reader object and cast it to int
                resultado.NumPremioPlan = (int)myReader["num_premio_plan"]; //get num_premio_plan from data reader object and cast it to int 
                resultado.IdDatoSorteo = (int)myReader["id_dato_sorteo"]; //get id_dato_sorteo from data reader object and cast it to int 
                resultado.NumFavorecido = (string)myReader["num_favorecido"];
                resultado.SeriePremio = (string)myReader["serie_premio"];
                resultado.Verificado = (bool)myReader["verificado"];
            }
      conn.Close(); //close connection
      return resultado;   //return result object
    }

    public  CierreApuestas GetCierreApuestas(int predicate)
    {
      string connStr;
      connStr = V;
      OleDbConnection conn = new OleDbConnection(connStr);
      conn.Open();
      OleDbCommand myCommand = new OleDbCommand("select * from CierreApuestas where idSorteo = " + predicate.ToString(), conn);
      OleDbDataReader myReader = myCommand.ExecuteReader();
      CierreApuestas cierr = new CierreApuestas();
          while (myReader.Read())
            {
              cierr.IdCierre = (int)myReader["id"];
              cierr.Monto = (float)myReader["montoCierre"];
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
      OleDbCommand myCommand = new OleDbCommand("select * from AcumuladoGtec where idSorteo = " + predicate.ToString(), conn);
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

    
}

    


