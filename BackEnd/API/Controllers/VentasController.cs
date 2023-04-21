//RF06 Comparar ventas

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable




public class VentasController : ControllerBase
{
    private readonly ILogger<VentasController> _logger;

    public VentasController(ILogger<VentasController> logger)
    {
        _logger = logger;
    }

    [HttpGet("{id}")]
        public Ventas Get(int id)
    {
        
        ConexionSybase conexion = new ConexionSybase();
            Ventas datos = conexion.GetVentas(id);
        return datos;
    }   

    //post


    [HttpPost]
    public IActionResult Post([FromBody] Ventas model)
    {
        var context = new proyecto_bdContext();
        context.Ventas.Add(model);
        context.SaveChanges();
        return Ok();
    }
}

