using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DatosFormulariosAController : ControllerBase
    {
        private readonly ILogger<DatosFormulariosAController> _logger;

        public DatosFormulariosAController(ILogger<DatosFormulariosAController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var Datosfomularios = context.Datosfomularios.ToList();
                return Ok(Datosfomularios);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los datos de los formularios: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var datosfomulario = context.Datosfomularios.FirstOrDefault(x => x.Id == id);
                if (datosfomulario == null)
                {
                    return NotFound("No se encontraron datos con ese ID");
                }
                return Ok(datosfomulario);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los datos del formulario con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Datosfomulario datosfomulario)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                context.Datosfomularios.Add(datosfomulario);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear los datos del formulario: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] Datosfomulario datosfomulario)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                var DatosfomularioUpdate = context.Datosfomularios.FirstOrDefault(x => x.Id == id);
                if (DatosfomularioUpdate == null)
                {
                    return NotFound();
                }

                DatosfomularioUpdate.Id = datosfomulario.Id;
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar los datos del formulario con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var datosfomulario = context.Datosfomularios.FirstOrDefault(x => x.Id == id);
                if (datosfomulario == null)
                {
                    return NotFound();
                }

                context.Datosfomularios.Remove(datosfomulario);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al eliminar los datos del formulario con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
