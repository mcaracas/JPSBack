using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

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
        var marchamo = context.Marchamos.FirstOrDefault(x => x.Id == id);
        return marchamo;
    }

  [HttpPost]
    public ActionResult Post([FromBody] List<Marchamo> Marchamo)
    {
        var context = new proyecto_bdContext();
        foreach (var item in Marchamo)
        {
            context.Marchamos.Add(item);
            context.SaveChanges();
        }   
        return Ok();
    }
    
    [HttpPut("{id}")]
        [HttpPut]
    public void UpdateMarchamo(Marchamo marchamo)
    {
        var context = new proyecto_bdContext();
        var MarchamoUpdate = context.Marchamos.FirstOrDefault(x => x.Id == marchamo.Id);
        MarchamoUpdate.Id = marchamo.Id;
        MarchamoUpdate.Tipo = marchamo.Tipo;
        MarchamoUpdate.TipoMarchamo = marchamo.TipoMarchamo;
        MarchamoUpdate.NumeroMarchamo = marchamo.NumeroMarchamo;
        context.SaveChanges();
    }
    [HttpDelete("{id}")]    
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var marchamo = context.Marchamos.FirstOrDefault(x => x.Id == id);
        context.Marchamos.Remove(marchamo);
        context.SaveChanges();
    }
}