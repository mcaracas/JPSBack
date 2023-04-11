#nullable disable
//RF10 Obtener resultados de cierre de apuestas 
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SeriesController : ControllerBase
    {
        private readonly ILogger<SeriesController> _logger;

        public SeriesController(ILogger<SeriesController> logger)
        {
            _logger = logger;
        }


        [HttpGet("{id}/{Vendido}")]
        public IEnumerable<Series> Get(int id, int Vendido)
        {
            ConexionSybase conexion = new ConexionSybase();
            var datos = conexion.GetSeries(id, Vendido);
            return datos;
        }
    }
}