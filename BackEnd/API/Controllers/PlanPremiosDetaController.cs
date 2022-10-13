using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable
public class PlanPremiosDetaController : ControllerBase
{
    private readonly ILogger<PlanPremiosDetaController> _logger;

    public PlanPremiosDetaController(ILogger<PlanPremiosDetaController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
        public IEnumerable<PlanPremiosDetalle> Get()
    {
        var context = new proyecto_bdContext();
        var PlanPremiosDeta = context.PlanPremiosDetalles.ToList();
        return PlanPremiosDeta;
    }

    [HttpGet("{id}")]   
    public PlanPremiosDetalle Get(int id)
    {
        var context = new proyecto_bdContext();
        var planPremiosDeta = context.PlanPremiosDetalles.FirstOrDefault(x => x.IdPlan == id);
        return planPremiosDeta;
    }

    [HttpPost]
    public ActionResult Post([FromBody] PlanPremiosDetalle PlanPremiosDeta)
    {
        var context = new proyecto_bdContext();
        context.PlanPremiosDetalles.Add(PlanPremiosDeta);
        context.SaveChanges();
        return Ok();
    }

        [HttpDelete]
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var planPremiosDeta = context.PlanPremiosDetalles.FirstOrDefault(x => x.IdPlan == id);
        context.PlanPremiosDetalles.Remove(planPremiosDeta);
        context.SaveChanges();
    }

    [HttpPut]
    public void UpdatePlanPremiosDeta(PlanPremiosDetalle planPremiosDeta)
    {
        var context = new proyecto_bdContext();
        var PlanPremiosDetaUpdate = context.PlanPremiosDetalles.FirstOrDefault(x => x.IdPlan == planPremiosDeta.IdPlan);
        PlanPremiosDetaUpdate.IdPlan = planPremiosDeta.IdPlan;
        context.SaveChanges();
    }
    
