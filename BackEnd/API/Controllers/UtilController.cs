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
        String archivo = directorioSorteo +"\\"+ idSorteo.ToString() + ".pdf";
      

        if (!System.IO.File.Exists(archivo)){
            //CREA EL PDF          
            
        }

        String nombreZip = idSorteo.ToString() + ".zip";
        String rutaZip = "Archive\\Sorteos\\"+nombreZip;
        if (System.IO.File.Exists(rutaZip)){
            System.IO.File.Delete(rutaZip);
        }
        ZipFile.CreateFromDirectory(directorioSorteo,rutaZip);
        String tipoSorteo = sorteo.TipoLoteria;

        String correos = context.Parametros.FirstOrDefault(x => x.CodigoParametro == "CorreoEmpleado").ParametroValor;
        Utilidades.EmailUtility.EnviarEmail($"Adjunto encontrara el acta del sorteo {tipoSorteo} numero {sorteo.NumSorteo}",
                                             $"Acta de Fiscalizacion - Sorteo {tipoSorteo} numero {sorteo.NumSorteo}",
                                             correos,rutaZip);
    }

}