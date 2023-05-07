using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListaChequeoDetalleController : ControllerBase
    {
        private readonly ILogger<ListaChequeoDetalleController> _logger;

        public ListaChequeoDetalleController(ILogger<ListaChequeoDetalleController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var ListaChequeoDetalles = context.ListaChequeoDetalles.ToList();
                return Ok(ListaChequeoDetalles);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener la lista de chequeo de detalles: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var ListaChequeoDetalle = context.ListaChequeoDetalles.FirstOrDefault(x => x.Id == id);
                if (ListaChequeoDetalle == null)
                {
                    return NotFound();
                }
                return Ok(ListaChequeoDetalle);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener el detalle de la lista de chequeo con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] ListaChequeoDetalle ListaChequeoDetalle)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                context.ListaChequeoDetalles.Add(ListaChequeoDetalle);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear el detalle de la lista de chequeo: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ListaChequeoDetalle ListaChequeoDetalle)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                var existingDetalle = context.ListaChequeoDetalles.FirstOrDefault(x => x.Id == id);
                if (existingDetalle == null)
                {
                    return NotFound();
                }

                existingDetalle.Id = ListaChequeoDetalle.Id;
                existingDetalle.Descripcion = ListaChequeoDetalle.Descripcion;
                existingDetalle.TipoLoteria = ListaChequeoDetalle.TipoLoteria;
                existingDetalle.TipoListaChequeo = ListaChequeoDetalle.TipoListaChequeo;
                existingDetalle.Orden = ListaChequeoDetalle.Orden;
                context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar el detalle de la lista de chequeo con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var ListaChequeoDetalle = context.ListaChequeoDetalles.FirstOrDefault(x => x.Id == id);
                if (ListaChequeoDetalle == null)
                {
                    return NotFound();
                }
                context.ListaChequeoDetalles.Remove(ListaChequeoDetalle);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al eliminar el detalle de la lista de chequeo con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
