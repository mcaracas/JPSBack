using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]

[Route("[controller]")]
#nullable disable
public class PlanPremiosDetalleController : ControllerBase
{
        private readonly ILogger<PlanPremiosController> _logger;

    public PlanPremiosDetalleController(ILogger<PlanPremiosController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
        public IEnumerable<PlanPremiosDetalle> Get()
    {
        var context = new proyecto_bdContext();
        var PlanPremiosDetalle = context.PlanPremiosDetalles.ToList();
        return PlanPremiosDetalle;
    }

    [HttpGet("{id}")]   
    public PlanPremiosDetalle Get(int id)
    {
        var context = new proyecto_bdContext();
        var planPremiosDetalle = context.PlanPremiosDetalles.FirstOrDefault(x => x.IdPlan == id);
        return planPremiosDetalle;
    }

    [HttpPost]
    public ActionResult Post([FromBody] PlanPremiosDetalle PlanPremiosDetalle)
    {
        var context = new proyecto_bdContext();
        context.PlanPremiosDetalles.Add(PlanPremiosDetalle);
        context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    public void UpdatePlanPremiosDetalle(PlanPremiosDetalle planPremiosDetalle)
    {
        var context = new proyecto_bdContext();
        var PlanPremiosDetalleUpdate = context.PlanPremiosDetalles.FirstOrDefault(x => x.IdPlan == planPremiosDetalle.IdPlan);
        PlanPremiosDetalleUpdate.IdPlan = planPremiosDetalle.IdPlan;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var planPremiosDetalle = context.PlanPremiosDetalles.FirstOrDefault(x => x.IdPlan == id);
        context.PlanPremiosDetalles.Remove(planPremiosDetalle);
        context.SaveChanges();
    }

}