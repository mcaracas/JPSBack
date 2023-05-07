using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API.Utilidades;
using System;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VentasController : ControllerBase
    {
        private readonly ILogger<VentasController> _logger;

        public VentasController(ILogger<VentasController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                ConexionSybase conexion = new ConexionSybase();
                Ventas datos = conexion.GetVentas(id);
                if (datos == null)
                {
                    return NotFound();
                }
                return Ok(datos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving Ventas with id {id}.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Ventas model)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.Ventas.Add(model);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while saving Ventas.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
