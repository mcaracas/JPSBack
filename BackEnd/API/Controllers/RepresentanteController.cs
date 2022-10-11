using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class RepresentateController : ControllerBase
{
    private readonly ILogger<RepresentateController> _logger;

    public RepresentateController(ILogger<RepresentateController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Representate> Get()
    {
        var context = new proyecto_bdContext();
        var Representantes = context.Representates.ToList();
        return Representantes;
    }

    [HttpGet("{id}")]
    public Representate Get(int id)
    {
        var context = new proyecto_bdContext();
        var representante = context.Representates.FirstOrDefault(x => x.IdDatosPrevios == id);
        return representante;
    }

    [HttpPost]
    public ActionResult Post([FromBody] Representate Representante)
    {
        var context = new proyecto_bdContext();
        context.Representates.Add(Representante);
        context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    [HttpPut]
    public void UpdateRepresentante(Representate representante)
    {
        var context = new proyecto_bdContext();
        var RepresentanteUpdate = context.Representates.FirstOrDefault(x => x.Id == representante.Id);
        RepresentanteUpdate.Id = representante.Id;
        context.SaveChanges();
    }
}
