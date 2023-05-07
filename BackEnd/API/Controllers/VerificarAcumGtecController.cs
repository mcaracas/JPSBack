using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API.Utilidades;
using System;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VerificarAcumGtecController : ControllerBase
    {
        private readonly ILogger<VerificarAcumGtecController> _logger;

        public VerificarAcumGtecController(ILogger<VerificarAcumGtecController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                ConexionSybase conexion = new ConexionSybase();
                AcumGtec datos = conexion.GetAcumulado(id);
                if (datos == null)
                {
                    return NotFound();
                }
                return Ok(datos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving AcumGtec with id {id}.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
