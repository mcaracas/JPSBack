using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RepresentateController : ControllerBase
    {
        private readonly ILogger<RepresentateController> _logger;

        public RepresentateController(ILogger<RepresentateController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var context = new proyecto_bdContext();
                var representantes = context.Representantes.ToList();
                return Ok(representantes);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los representantes: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var representante = (
                    from r in context.Representantes
                    join d in context.DatosPreviosAdministracions on r.IdDatosPrevios equals d.Id
                    join s in context.DatosSorteos on d.IdDatoSorteo equals s.IdInterno
                    where s.IdInterno == id
                    select r
                ).FirstOrDefault();

                if (representante == null)
                {
                    return NotFound();
                }

                return Ok(representante);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener el representante con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Representante representante)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.Representantes.Add(representante);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear el representante: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Representante representante)
        {
            try
            {
                var context = new proyecto_bdContext();
                var representanteUpdate = context.Representantes.FirstOrDefault(x => x.Id == id);

                if (representanteUpdate == null)
                {
                    return NotFound();
                }

                representanteUpdate.Id = representante.Id;
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar el representante con ID: {id}: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
