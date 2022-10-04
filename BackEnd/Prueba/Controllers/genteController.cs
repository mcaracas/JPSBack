using Microsoft.AspNetCore.Mvc;

namespace APISAPROFA.Controllers;

[ApiController]
[Route("[controller]")]
public class genteController : ControllerBase
{
    private readonly ILogger<genteController> _logger;

    public genteController(ILogger<genteController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetGente")]
    public IEnumerable<Gente> Get()
    {
        var context = new pruebaContext();
        var personas = context.Gentes.ToList();
        return personas;
    }

    [HttpGet("{id}", Name = "GetGenteById")]
    public Gente Get(int id)
    {
        var context = new pruebaContext();
        var persona = context.Gentes.FirstOrDefault(x => x.Id == id);
        return persona;
    }

    [HttpPost]
    public void CreatePersona(Gente persona)
    {
           
            var context = new pruebaContext();
            context.Gentes.Add(persona);
            context.SaveChanges();
        
    }

    [HttpPut]
    public void UpdatePersona(Gente persona)
    {
        var context = new pruebaContext();
        var personaUpdate = context.Gentes.FirstOrDefault(x => x.Id == persona.Id);
        personaUpdate.Nombre = persona.Nombre;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void DeletePersona(int id)
    {
        var context = new pruebaContext();
        var personaDelete = context.Gentes.FirstOrDefault(x => x.Id == id);
        context.Gentes.Remove(personaDelete);
        context.SaveChanges();
    }
}
