using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DatosPreviosAController : ControllerBase
    {
        private readonly ILogger<DatosPreviosAController> _logger;

        public DatosPreviosAController(ILogger<DatosPreviosAController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var DatosPreviosAdministracions = context.DatosPreviosAdministracions.ToList();
                return Ok(DatosPreviosAdministracions);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los datos previos de administración: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var datosPreviosAdministracion = context.DatosPreviosAdministracions.FirstOrDefault(x => x.Id == id);
                if (datosPreviosAdministracion == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }
                return Ok(datosPreviosAdministracion);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los datos previos de administración con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] DatosPreviosAdministracion datosPreviosAdministracion)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                context.DatosPreviosAdministracions.Add(datosPreviosAdministracion);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear los datos previos de administración: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] DatosPreviosAdministracion datosPreviosAdministracion)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                var DatosPreviosAdministracionUpdate = context.DatosPreviosAdministracions.FirstOrDefault(x => x.Id == id);
                if (DatosPreviosAdministracionUpdate == null)
                {
                    return NotFound();
                }

                DatosPreviosAdministracionUpdate.Id = datosPreviosAdministracion.Id;
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar los datos previos de administración con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var datosPreviosAdministracion = context.DatosPreviosAdministracions.FirstOrDefault(x => x.Id == id);
                if (datosPreviosAdministracion == null)
                {
                    return NotFound();
                }

                context.DatosPreviosAdministracions.Remove(datosPreviosAdministracion);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al eliminar los datos previos de administración con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
