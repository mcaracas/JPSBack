using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
#nullable disable

[ApiController]
[Route("[controller]")]

public class DatosFormulariosAController : ControllerBase
{
    private readonly ILogger<DatosFormulariosAController> _logger;

    public DatosFormulariosAController(ILogger<DatosFormulariosAController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
        public IEnumerable<Datosfomulario> Get()
    {
        var context = new proyecto_bdContext();
        var Datosfomularios = context.Datosfomularios.ToList();
        return Datosfomularios;
    }

    [HttpGet("{id}")]
    public Datosfomulario Get(string id)
    {
        var context = new proyecto_bdContext();
        var datosfomulario = context.Datosfomularios.FirstOrDefault(x => x.Id == id);
        return datosfomulario;
    }
    

    [HttpPost]
    public ActionResult Post([FromBody] Datosfomulario Datosfomulario)
    {
        var context = new proyecto_bdContext();
        context.Datosfomularios.Add(Datosfomulario);
        context.SaveChanges();
        return Ok();
    }

    
    [HttpPut("{id}")]
        [HttpPut]
    public void Updatedatosfomulario(Datosfomulario datosfomulario)
    {
        var context = new proyecto_bdContext();
        var DatosfomularioUpdate = context.Datosfomularios.FirstOrDefault(x => x.Id == datosfomulario.Id);
        DatosfomularioUpdate.Id = datosfomulario.Id;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void Delete(string id)
    {
        var context = new proyecto_bdContext();
        var datosfomulario = context.Datosfomularios.FirstOrDefault(x => x.Id == id);
        context.Datosfomularios.Remove(datosfomulario);
        context.SaveChanges();
    }
}