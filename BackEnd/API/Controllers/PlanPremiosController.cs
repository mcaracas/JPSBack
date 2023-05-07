using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlanPremiosController : ControllerBase
    {
        private readonly ILogger<PlanPremiosController> _logger;

        public PlanPremiosController(ILogger<PlanPremiosController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var planPremios = context.PlanPremios.ToList();
                return Ok(planPremios);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los planes de premios: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var planPremio = context.PlanPremios.FirstOrDefault(x => x.IdPlan == id);
                if (planPremio == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }
                return Ok(planPremio);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener el plan de premios con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] PlanPremio planPremio)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.PlanPremios.Add(planPremio);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear el plan de premios: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] PlanPremio updatedPlanPremio)
        {
            try
            {
                var context = new proyecto_bdContext();
                var planPremio = context.PlanPremios.FirstOrDefault(x => x.IdPlan == id);
                if (planPremio == null)
                {
                    return NotFound();
                }
                planPremio.IdPlan = updatedPlanPremio.IdPlan;
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar el plan de premios con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var planPremio = context.PlanPremios.FirstOrDefault(x => x.IdPlan == id);
                if (planPremio == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }
                context.PlanPremios.Remove(planPremio);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al eliminar el plan de premios con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
