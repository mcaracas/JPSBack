using API.CreacionArchivos;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.IO.Compression;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable
public class UtilController : ControllerBase
{
    private readonly ILogger<UtilController> _logger;

    public UtilController(ILogger<UtilController> logger)
    {
        _logger = logger;
    }

    [HttpGet("FechaHoraActual")]
    public DateTime GetFechaHoraActual()
    {
        return DateTime.Now;
    }

    [HttpGet("EnviarEmailSorteo/{idSorteo}")]
    public void EnviarEmailSorteo(int idSorteo)
    {
        var context = new proyecto_bdContext();
        var sorteo = context.DatosSorteos.FirstOrDefault(x => x.IdInterno == idSorteo);

        String directorioSorteo = Utilidades.Utilidades.ObtenerDirectorioSorteo(idSorteo);
        //String archivo = directorioSorteo +"\\"+ idSorteo.ToString() + ".pdf";
        String archivoWord = directorioSorteo +"\\"+ idSorteo.ToString() + ".docx";
        String archivoPdf = directorioSorteo +"\\"+ idSorteo.ToString() + ".pdf";


      

        if (System.IO.File.Exists(archivoWord)){
            //Borra el archivo si existe
            System.IO.File.Delete(archivoWord);               
        }

        if (System.IO.File.Exists(archivoPdf)){
            //Borra el archivo si existe
            System.IO.File.Delete(archivoPdf);               
        }

        //CREA EL WORD         
        CreacionDeActas.CrearActa(sorteo, archivoWord);

        //CREA EL PDF
        UtilidadesActas.ConvertirWordAPDF(archivoWord, archivoPdf);


        String nombreZip = idSorteo.ToString()+"-"+DateTime.Now.ToString("yyyyMMddHHmmss")+ ".zip";
        String rutaZip = "Archive\\Sorteos\\"+nombreZip;
        ZipFile.CreateFromDirectory(directorioSorteo,rutaZip);
        String tipoSorteo = sorteo.TipoLoteria;

        String correos = context.Parametros.FirstOrDefault(x => x.CodigoParametro == "CorreoEmpleado").ParametroValor;
        Utilidades.EmailUtility.EnviarEmail($"Adjunto encontrara el acta del sorteo {tipoSorteo} numero {sorteo.NumSorteo}",
                                             $"Acta de Fiscalizacion - Sorteo {tipoSorteo} numero {sorteo.NumSorteo}",
                                             correos,rutaZip);
    

    }

}