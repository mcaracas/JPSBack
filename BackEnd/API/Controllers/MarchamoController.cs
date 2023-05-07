using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    #nullable disable
    public class MarchamoController : ControllerBase
    {
        private readonly ILogger<MarchamoController> _logger;

        public MarchamoController(ILogger<MarchamoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Marchamo> Get()
        {
            try
            {
                var context = new proyecto_bdContext();
                var Marchamos = context.Marchamos.ToList();
                return Marchamos;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Se produjo un error al obtener los Marchamos desde la base de datos.");
                return null;
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var marchamo = context.Marchamos.FirstOrDefault(x => x.Id == id);
                if (marchamo == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }
                return Ok(marchamo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Se produjo un error al obtener el Marchamo desde la base de datos.");
                return null;
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] List<Marchamo> Marchamos)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.Marchamos.AddRange(Marchamos);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Se produjo un error al guardar los Marchamos en la base de datos.");
                return StatusCode(500, "Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.");
            }
        }

        [HttpPut("{id}")]
        public void UpdateMarchamo(Marchamo marchamo)
        {
            try
            {
                var context = new proyecto_bdContext();
                var MarchamoUpdate = context.Marchamos.FirstOrDefault(x => x.Id == marchamo.Id);
                MarchamoUpdate.Id = marchamo.Id;
                MarchamoUpdate.IdSorteo = marchamo.IdSorteo;
                MarchamoUpdate.Tipo = marchamo.Tipo;
                MarchamoUpdate.Valija = marchamo.Valija;
                MarchamoUpdate.TipoMarchamo = marchamo.TipoMarchamo;
                MarchamoUpdate.NumeroMarchamo = marchamo.NumeroMarchamo;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Se produjo un error al actualizar el Marchamo en la base de datos.");
            }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var marchamo = context.Marchamos.FirstOrDefault(x => x.Id == id);
                context.Marchamos.Remove(marchamo);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Se produjo un error al eliminar el Marchamo de la base de datos.");
            }
        }
    }
}
