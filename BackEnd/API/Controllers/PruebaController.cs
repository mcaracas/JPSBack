using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class PruebaController : ControllerBase
{
    private readonly ILogger<PruebaController> _logger;

    public PruebaController(ILogger<PruebaController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Prueba> Get()
    {
        var context = new proyecto_bdContext();
        var Pruebas = context.Pruebas.ToList();
        return Pruebas;
    }

    [HttpGet("Sorteo/{idSorteo}")]
    public IEnumerable<Prueba> Get(int idSorteo)
    {
        var context = new proyecto_bdContext();
        var pruebas = context.Pruebas.Where(x => x.IdDatoSorteo == idSorteo).ToList();
        return pruebas;
    }

    [HttpPost]
    public ActionResult Post([FromBody] Prueba Prueba)
    {
        var context = new proyecto_bdContext();
        context.Pruebas.Add(Prueba);
        context.SaveChanges();
        return Ok();
    }

    [HttpPost("ListaPruebas")]
    public ActionResult PostList([FromBody] List<Prueba> Pruebas)
    {
        foreach (var Prueba in Pruebas)
        {
            var context = new proyecto_bdContext();
            context.Pruebas.Add(Prueba);
            context.SaveChanges();
        }
        return Ok();
    }






}


