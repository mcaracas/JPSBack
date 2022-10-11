using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class DatosSorteoController : ControllerBase
{
    private readonly ILogger<DatosSorteoController> _logger;

    public DatosSorteoController(ILogger<DatosSorteoController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
        public IEnumerable<DatosSorteo> Get()
    {
        var context = new proyecto_bdContext();
        var DatosSorteos = context.DatosSorteos.ToList();
        return DatosSorteos;
    }

    [HttpGet("{id}")]
    public DatosSorteo Get(int id)
    {
        var context = new proyecto_bdContext();
        var datosSorteo = context.DatosSorteos.FirstOrDefault(x => x.IdInterno == id);
        return datosSorteo;
    }

    [HttpPost]
    public ActionResult Post([FromBody] DatosSorteo DatosSorteo)
    {
        var context = new proyecto_bdContext();
        context.DatosSorteos.Add(DatosSorteo);
        context.SaveChanges();
        return Ok();
    }

    
    [HttpPut("{id}")]
        [HttpPut]
    public void UpdatedatosSorteo(DatosSorteo datosSorteo)
    {
        var context = new proyecto_bdContext();
        var DatosSorteoUpdate = context.DatosSorteos.FirstOrDefault(x => x.IdInterno == datosSorteo.IdInterno);
        DatosSorteoUpdate.IdInterno = datosSorteo.IdInterno;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var datosSorteo = context.DatosSorteos.FirstOrDefault(x => x.IdInterno == id);
        context.DatosSorteos.Remove(datosSorteo);
        context.SaveChanges();
    }

    
}