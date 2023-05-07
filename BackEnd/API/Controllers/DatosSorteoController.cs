using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DatosSorteoController : ControllerBase
    {
        private readonly ILogger<DatosSorteoController> _logger;

        public DatosSorteoController(ILogger<DatosSorteoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var DatosSorteos = context.DatosSorteos.ToList();
                return Ok(DatosSorteos);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los datos de los sorteos: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("{num_sorteo}")]
        public IActionResult GetById(int num_sorteo)
        {
            try
            {
                var context = new proyecto_bdContext();
                var datosSorteo = context.DatosSorteos.FirstOrDefault(x => x.NumSorteo == num_sorteo);
                if (datosSorteo == null)
                {
                    return NotFound($"No existen datos con el ID: {num_sorteo}:");
                }
                return Ok(datosSorteo);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los datos del sorteo con número: {num_sorteo}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("SorteoActual")]
        public IActionResult GetSorteoActual()
        {
            try
            {
                var context = new proyecto_bdContext();
                var date = DateTime.Now;
                var datosSorteo = context.DatosSorteos.Where(x => x.FechaHora > date.AddHours(-2) && x.FechaHora < date.AddHours(2)).ToList();
                return Ok(datosSorteo);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener el sorteo actual: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] DatosSorteo datosSorteo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                context.DatosSorteos.Add(datosSorteo);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear los datos del sorteo: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] DatosSorteo datosSorteo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                var DatosSorteoUpdate = context.DatosSorteos.FirstOrDefault(x => x.IdInterno == id);
                if (DatosSorteoUpdate == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }

                DatosSorteoUpdate.IdInterno = datosSorteo.IdInterno;
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar los datos del sorteo con id interno: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var datosSorteo = context.DatosSorteos.FirstOrDefault(x => x.IdInterno == id);
                if (datosSorteo == null)
                {
                    return NotFound();
                }
                context.DatosSorteos.Remove(datosSorteo);
                context.SaveChanges();
                return Ok();
            }
            catch
            {
                _logger.LogError($"Error al eliminar los datos del sorteo con id interno: {id}");
                return StatusCode(500);
            }
        }
    }
}