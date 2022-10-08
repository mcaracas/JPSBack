using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class MarchamoController : ControllerBase
{
    private readonly ILogger<MarchamoController> _logger;

    public MarchamoController(ILogger<MarchamoController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Marchamo> Get()
    {
        var context = new proyecto_bdContext();
        var Marchamos = context.Marchamos.ToList();
        return Marchamos;
    }

    [HttpGet("{id}")]
    public Marchamo Get(int id)
    {
        var context = new proyecto_bdContext();
        var marchamo = context.Marchamos.FirstOrDefault(x => x.IdMarchamo == id);
        return marchamo;
    }

    [HttpPost]
    public ActionResult Post([FromBody] Marchamo Marchamo)
    {
        var context = new proyecto_bdContext();
        context.Marchamos.Add(Marchamo);
        context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    [HttpPut]
    public void UpdateMarchamo(Marchamo marchamo)
    {
        var context = new proyecto_bdContext();
        var MarchamoUpdate = context.Marchamos.FirstOrDefault(x => x.IdMarchamo == marchamo.IdMarchamo);
        MarchamoUpdate.IdMarchamo = marchamo.IdMarchamo;
        context.SaveChanges();
    }
}

