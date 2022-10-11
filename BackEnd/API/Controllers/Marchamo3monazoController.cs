using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class Marchamo3monazoController : ControllerBase
{
    private readonly ILogger<Marchamo3monazoController> _logger;

    public Marchamo3monazoController(ILogger<Marchamo3monazoController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Marchamo3monazo> Get()
    {
        var context = new proyecto_bdContext();
        var Marchamo3monazos = context.Marchamo3monazos.ToList();
        return Marchamo3monazos;
    }

    [HttpGet("{id}")]
    public Marchamo3monazo Get(int id)
    {
        var context = new proyecto_bdContext();
        var marchamo3monazo = context.Marchamo3monazos.FirstOrDefault(x => x.Id == id);
        return marchamo3monazo;
    }

    [HttpPost]
    public ActionResult Post([FromBody] Marchamo3monazo Marchamo3monazo)
    {
        var context = new proyecto_bdContext();
        context.Marchamo3monazos.Add(Marchamo3monazo);
        context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    public void UpdateMarchamo3monazo(Marchamo3monazo marchamo3monazo)
    {
        var context = new proyecto_bdContext();
        var Marchamo3monazoUpdate = context.Marchamo3monazos.FirstOrDefault(x => x.Id == marchamo3monazo.Id);
        Marchamo3monazoUpdate.Id = marchamo3monazo.Id;
        Marchamo3monazoUpdate.IdSorteo = marchamo3monazo.IdSorteo;
        Marchamo3monazoUpdate.AperturaValijaA = marchamo3monazo.AperturaValijaA;
        Marchamo3monazoUpdate.AperturaValijaB = marchamo3monazo.AperturaValijaB;
        Marchamo3monazoUpdate.Contingencia = marchamo3monazo.Contingencia;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var marchamo3monazo = context.Marchamo3monazos.FirstOrDefault(x => x.Id == id);
        context.Marchamo3monazos.Remove(marchamo3monazo);
        context.SaveChanges();
    }
}