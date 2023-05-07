using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PruebaController : ControllerBase
    {
        private readonly ILogger<PruebaController> _logger;

        public PruebaController(ILogger<PruebaController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var pruebas = context.Pruebas.ToList();
                return Ok(pruebas);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener las pruebas: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("Sorteo/{idSorteo}")]
        public IActionResult GetBySorteoId(int idSorteo)
        {
            try
            {
                var context = new proyecto_bdContext();
                var pruebas = context.Pruebas.Where(x => x.IdDatoSorteo == idSorteo).ToList();
                if (pruebas == null)
                {
                    return NotFound($"Error datos con ID: {idSorteo}:");
                }
                return Ok(pruebas);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener las pruebas para el sorteo con ID: {idSorteo}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Prueba prueba)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.Pruebas.Add(prueba);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear la prueba: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost("ListaPruebas")]
        public IActionResult CreateList([FromBody] List<Prueba> pruebas)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.Pruebas.AddRange(pruebas);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear las pruebas: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
