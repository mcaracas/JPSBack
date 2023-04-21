using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class EscrutinioController : ControllerBase
{
    private readonly ILogger<EscrutinioController> _logger;

    public EscrutinioController(ILogger<EscrutinioController> logger)
    {
        _logger = logger;
    }



    [HttpGet("{id}")]
    public Escrutinio Get(int id)
    {
        ConexionSybase conexion = new ConexionSybase();
        var Escrutinio = conexion.GetEscrutinio(id);
        return Escrutinio;
    }

    [HttpPost]
    public IActionResult Post([FromBody] Escrutinio model)
    {
        var context = new proyecto_bdContext();
        context.Escrutinio.Add(model);
        context.SaveChanges();
        return Ok();
    }



}