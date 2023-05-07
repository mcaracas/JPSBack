using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlanPremiosDetalleController : ControllerBase
    {
        private readonly ILogger<PlanPremiosController> _logger;

        public PlanPremiosDetalleController(ILogger<PlanPremiosController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var planPremiosDetalles = context.PlanPremiosDetalles.ToList();
                return Ok(planPremiosDetalles);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los detalles de los planes de premios: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetByPlanId(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var planPremiosDetalles = context.PlanPremiosDetalles.Where(x => x.IdPlan == id).ToList();
                if (planPremiosDetalles == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }
                return Ok(planPremiosDetalles);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los detalles del plan de premios con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] PlanPremiosDetalle planPremiosDetalle)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.PlanPremiosDetalles.Add(planPremiosDetalle);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear el detalle del plan de premios: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] PlanPremiosDetalle updatedPlanPremiosDetalle)
        {
            try
            {
                var context = new proyecto_bdContext();
                var planPremiosDetalle = context.PlanPremiosDetalles.FirstOrDefault(x => x.IdPlan == id);
                if (planPremiosDetalle == null)
                {
                    return NotFound($"No existen datos con ID: {id}:");
                }
                planPremiosDetalle.IdPlan = updatedPlanPremiosDetalle.IdPlan;
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar el detalle del plan de premios con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var planPremiosDetalle = context.PlanPremiosDetalles.FirstOrDefault(x => x.IdPlan == id);
                if (planPremiosDetalle == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }
                context.PlanPremiosDetalles.Remove(planPremiosDetalle);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al eliminar el detalle del plan de premios con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
