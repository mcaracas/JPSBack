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
        public CierreApuestas Get(int id)
        {
            ConexionSybase conexion = new ConexionSybase();
            CierreApuestas datos = conexion.GetCierreApuestas(id);
            return datos;
        }
    }
}