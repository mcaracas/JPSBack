using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListaChequeoSorteoController : ControllerBase
    {
        private readonly ILogger<ListaChequeoSorteoController> _logger;

        public ListaChequeoSorteoController(ILogger<ListaChequeoSorteoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var ListaChequeoSorteos = context.ListaChequeoSorteos.ToList();
                return Ok(ListaChequeoSorteos);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener la lista de chequeo de sorteos: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var listaChequeoSorteo = context.ListaChequeoSorteos.FirstOrDefault(x => x.Id == id);
                if (listaChequeoSorteo == null)
                {
                    return NotFound($"No existen datos del sorteo con número: {id}:");
                }
                return Ok(listaChequeoSorteo);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener el detalle de la lista de chequeo de sorteo con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] ListaChequeoSorteo ListaChequeoSorteo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                context.ListaChequeoSorteos.Add(ListaChequeoSorteo);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear el detalle de la lista de chequeo de sorteo: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ListaChequeoSorteo listaChequeoSorteo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                var existingSorteo = context.ListaChequeoSorteos.FirstOrDefault(x => x.Id == id);
                if (existingSorteo == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }

                existingSorteo.Id = listaChequeoSorteo.Id;
                context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar el detalle de la lista de chequeo de sorteo con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var listaChequeoSorteo = context.ListaChequeoSorteos.FirstOrDefault(x => x.Id == id);
                if (listaChequeoSorteo == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }
                context.ListaChequeoSorteos.Remove(listaChequeoSorteo);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al eliminar la lista de chequeo de sorteo con id: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}

