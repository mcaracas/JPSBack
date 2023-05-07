#nullable disable
//RF10 Obtener resultados de cierre de apuestas 
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CierreApuestasController : ControllerBase
    {
        private readonly ILogger<CierreApuestasController> _logger;

        public CierreApuestasController(ILogger<CierreApuestasController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id}")]
public ActionResult<CierreApuestas> Get(int id)
{
    try
    {
        ConexionSybase conexion = new ConexionSybase();
        CierreApuestas datos = conexion.GetCierreApuestas(id);
        
        if (datos == null)
        {
            return NotFound($"No existen datos con el ID: {id}:"); // Return a 404 Not Found response if the data is not found
        }

        return datos;
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "An error occurred while processing the request.");
        return StatusCode(500, "An error occurred while processing the request.");
    }
}

    }
}