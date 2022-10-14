using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
#nullable disable

[ApiController]
[Route("[controller]")]

public class DatosPreviosAController : ControllerBase
{
    private readonly ILogger<DatosPreviosAController> _logger;

    public DatosPreviosAController(ILogger<DatosPreviosAController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
        public IAsyncEnumerable<DatosPreviosAdministracion> Get()
    {
        var context = new proyecto_bdContext();
        var DatosPreviosAdministracions = context.DatosPreviosAdministracions.AsAsyncEnumerable();
        return DatosPreviosAdministracions;
    }



    [HttpGet("{id}")]
    public DatosPreviosAdministracion Get(int id)
    {
        var context = new proyecto_bdContext();
        var datosPreviosAdministracion = context.DatosPreviosAdministracions.FirstOrDefault(x => x.Id == id);
        return datosPreviosAdministracion;
    }

    [HttpPost]
    public ActionResult Post([FromBody] DatosPreviosAdministracion DatosPreviosAdministracion)
    {
        var context = new proyecto_bdContext();
        context.DatosPreviosAdministracions.Add(DatosPreviosAdministracion);
        context.SaveChanges();
        return Ok();
    }

    
    [HttpPut("{id}")]
        [HttpPut]
    public void UpdatedatosPreviosAdministracion(DatosPreviosAdministracion datosPreviosAdministracion)
    {
        var context = new proyecto_bdContext();
        var DatosPreviosAdministracionUpdate = context.DatosPreviosAdministracions.FirstOrDefault(x => x.Id == datosPreviosAdministracion.Id);
        DatosPreviosAdministracionUpdate.Id = datosPreviosAdministracion.Id;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var datosPreviosAdministracion = context.DatosPreviosAdministracions.FirstOrDefault(x => x.Id == id);
        context.DatosPreviosAdministracions.Remove(datosPreviosAdministracion);
        context.SaveChanges();
    }
}