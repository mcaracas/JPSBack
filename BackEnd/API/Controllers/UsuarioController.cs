using Microsoft.AspNetCore.Mvc;
using API.Utilidades;

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

    [HttpPost, Route("[action]", Name = "Register")]
    public ActionResult Register([FromBody] Usuario Usuario)
    {
        var context = new proyecto_bdContext();
        Usuario.Clave = Utilidades.Utilidades.Encrypt(Usuario.Clave);
        if (Usuario != null){
        Usuario.DatosSorteos = null;
        context.Usuarios.Add(Usuario);
        context.SaveChanges();
        return Ok(); 
        }
        else{
        return BadRequest();
        }
    }

    [HttpPost, Route("[action]", Name = "Login")]
    public ActionResult Login([FromBody] Usuario Usuario)
    {
        var context = new proyecto_bdContext();
        var claveEncriptada = Utilidades.Utilidades.Encrypt(Usuario.Clave);
        var usuario = context.Usuarios.FirstOrDefault(x => x.Usuario1 == Usuario.Usuario1  && x.Clave == Usuario.Clave);
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