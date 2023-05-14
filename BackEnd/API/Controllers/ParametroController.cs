using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ParametroController : ControllerBase
    {
        private readonly ILogger<ParametroController> _logger;

        public ParametroController(ILogger<ParametroController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var parametros = context.Parametros.ToList();
                return Ok(parametros);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los parámetros: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("{codigoParametro}")]
        public IActionResult GetByCodigo(string codigoParametro)
        {
            try
            {
                var context = new proyecto_bdContext();
                var parametro = context.Parametros.FirstOrDefault(x => x.CodigoParametro == codigoParametro);
                if (parametro == null)
                {
                    return NotFound($"No existen datos con el ID: {codigoParametro}:");
                }
                return Ok(parametro);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener el parámetro con código: {codigoParametro}: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
