using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable
public class UsuarioController : ControllerBase
{
    private readonly ILogger<UsuarioController> _logger;

    public UsuarioController(ILogger<UsuarioController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
        public IEnumerable<Usuario> Get()
    {
        var context = new proyecto_bdContext();
        var Usuarios = context.Usuarios.ToList();
        return Usuarios;
    }

    [HttpGet("{id}")]
    public Usuario Get(int id)
    {
        var context = new proyecto_bdContext();
        var usuario = context.Usuarios.FirstOrDefault(x => x.Id == id);
        return usuario;
    }

    [HttpPost]
    public ActionResult Post([FromBody] Usuario Usuario)
    {
        var context = new proyecto_bdContext();
        context.Usuarios.Add(Usuario);
        context.SaveChanges();
        return Ok();
    }

    [HttpPost, Route("[action]", Name = "Login")]
    public ActionResult Login([FromBody] Usuario Usuario)
    {
        var context = new proyecto_bdContext();
        var usuario = context.Usuarios.FirstOrDefault(x => x.Id == Usuario.Id  && x.Clave == Usuario.Clave);
        if (usuario != null)
        {
            return Ok(usuario);
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPut("{id}")]
        [HttpPut]
    public void UpdateUsuario(Usuario usuario)
    {
        var context = new proyecto_bdContext();
        var UsuarioUpdate = context.Usuarios.FirstOrDefault(x => x.Id == usuario.Id);
        UsuarioUpdate.Id = usuario.Id;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var usuario = context.Usuarios.FirstOrDefault(x => x.Id == id);
        context.Usuarios.Remove(usuario);
        context.SaveChanges();
    }
}