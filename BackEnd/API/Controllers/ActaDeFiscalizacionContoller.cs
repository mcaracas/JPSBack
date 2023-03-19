using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable
public class ActaDeFiscalizacionController : ControllerBase
{
    private readonly ILogger<ActaDeFiscalizacionController> _logger;

    public ActaDeFiscalizacionController(ILogger<ActaDeFiscalizacionController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public ActionResult Post([FromBody] ActaDeFiscalizacion ActaDeFiscalizacion)
    {
        var context = new proyecto_bdContext();
        context.ActaDeFiscalizacions.Add(ActaDeFiscalizacion);
        context.SaveChanges();
        return Ok();
    }

    [HttpGet]
    public IEnumerable<ActaDeFiscalizacion> Get()
    {
        var context = new proyecto_bdContext();
        var ActaDeFiscalizacions = context.ActaDeFiscalizacions.ToList();
        return ActaDeFiscalizacions;
    }
}