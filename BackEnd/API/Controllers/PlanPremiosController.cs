using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable
public class PlanPremiosController : ControllerBase
{
    private readonly ILogger<PlanPremiosController> _logger;

    public PlanPremiosController(ILogger<PlanPremiosController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
        public IEnumerable<PlanPremio> Get()
    {
        var context = new proyecto_bdContext();
        var PlanPremios = context.PlanPremios.ToList();
        return PlanPremios;
    }

    [HttpGet("{id}")]
    public PlanPremio Get(int id)
    {
        var context = new proyecto_bdContext();
        var planPremio = context.PlanPremios.FirstOrDefault(x => x.IdPlan == id);
        return planPremio;
    }

    [HttpPost]
    public ActionResult Post([FromBody] PlanPremio PlanPremio)
    {
        var context = new proyecto_bdContext();
        context.PlanPremios.Add(PlanPremio);
        context.SaveChanges();
        return Ok();
    }

    
    [HttpPut("{id}")]
        [HttpPut]
    public void UpdatePlanPremio(PlanPremio planPremio)
    {
        var context = new proyecto_bdContext();
        var PlanPremioUpdate = context.PlanPremios.FirstOrDefault(x => x.IdPlan == planPremio.IdPlan);
        PlanPremioUpdate.IdPlan = planPremio.IdPlan;
        context.SaveChanges();
    }
}