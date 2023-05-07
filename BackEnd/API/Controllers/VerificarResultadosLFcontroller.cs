using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VerificarResultadosLFController : ControllerBase
    {
        private readonly ILogger<VerificarResultadosLFController> _logger;

        public VerificarResultadosLFController(ILogger<VerificarResultadosLFController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                ConexionSybase conexion = new ConexionSybase();
                Resultado datos = conexion.GetResultadoSybase(id);
                if (datos == null)
                {
                    return NotFound($"Error al encontrar datos con ID: {id}:");
                }
                return Ok(datos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving Resultado with id {id}.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] List<Resultado> Resultados)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.Resultados.AddRange(Resultados);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while saving Resultados.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
