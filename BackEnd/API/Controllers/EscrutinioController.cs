using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EscrutinioController : ControllerBase
    {
        private readonly ILogger<EscrutinioController> _logger;

        public EscrutinioController(ILogger<EscrutinioController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                ConexionSybase conexion = new ConexionSybase();
                var Escrutinio = conexion.GetEscrutinio(id);
                if (Escrutinio == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }
                return Ok(Escrutinio);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener el escrutinio con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Escrutinio model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                context.Escrutinio.Add(model);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear el escrutinio: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
