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
    public IEnumerable<Representante> Get()
    {
        var context = new proyecto_bdContext();
        var Representantes = context.Representantes.ToList();
        return Representantes;
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var context = new proyecto_bdContext();
        var representante = (
                     from r in context.Representantes
                      join d in context.DatosPreviosAdministracions
                      on r.IdDatosPrevios equals d.Id
                      join s in context.DatosSorteos
                      on d.IdDatoSorteo equals s.IdInterno
                      where s.IdInterno == id
                      select r
                    ).First();
                      
            

        return Ok(representante);
    }

    

    [HttpPost]
    public ActionResult Post([FromBody] Representante Representante)
    {
        var context = new proyecto_bdContext();
        context.Representantes.Add(Representante);
        context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    [HttpPut]
    public void UpdateRepresentante(Representante representante)
    {
        var context = new proyecto_bdContext();
        var RepresentanteUpdate = context.Representantes.FirstOrDefault(x => x.Id == representante.Id);
        RepresentanteUpdate.Id = representante.Id;
        context.SaveChanges();
    }
}
