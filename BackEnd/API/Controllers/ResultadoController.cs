using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResultadoController : ControllerBase
    {
        private readonly ILogger<ResultadoController> _logger;

        public ResultadoController(ILogger<ResultadoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var resultados = context.Resultados.ToList();
                return Ok(resultados);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los resultados: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var resultado = context.Resultados.FirstOrDefault(x => x.IdResultado == id);

                if (resultado == null)
                {
                    return NotFound($"Error datos con ID: {id}:");
                }

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener el resultado con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Resultado resultado)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.Resultados.Add(resultado);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear el resultado: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Resultado resultado)
        {
            try
            {
                var context = new proyecto_bdContext();
                var resultadoUpdate = context.Resultados.FirstOrDefault(x => x.IdResultado == id);

                if (resultadoUpdate == null)
                {
                    return NotFound();
                }

                resultadoUpdate.IdResultado = resultado.IdResultado;
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar el resultado con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var resultado = context.Resultados.FirstOrDefault(x => x.IdResultado == id);

                if (resultado == null)
                {
                    return NotFound();
                }

                context.Resultados.Remove(resultado);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al eliminar el resultado con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
