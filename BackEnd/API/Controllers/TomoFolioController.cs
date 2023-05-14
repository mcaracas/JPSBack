using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TomoFolioController : ControllerBase
    {
        private readonly ILogger<TomoFolioController> _logger;

        public TomoFolioController(ILogger<TomoFolioController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var context = new proyecto_bdContext();
                var TomoFolios = context.TomoFolios.ToList();
                return Ok(TomoFolios);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving TomoFolios.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var TomoFolio = context.TomoFolios.FirstOrDefault(x => x.IdTomoFolio == id);
                if (TomoFolio == null)
                {
                    return NotFound($"Error datos con ID: {id}:");
                }
                return Ok(TomoFolio);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving TomoFolio with id {id}.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] TomoFolio TomoFolio)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.TomoFolios.Add(TomoFolio);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while saving TomoFolio.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTomoFolio(TomoFolio TomoFolio)
        {
            try
            {
                var context = new proyecto_bdContext();
                var TomoFolioUpdate = context.TomoFolios.FirstOrDefault(x => x.IdTomoFolio == TomoFolio.IdTomoFolio);
                if (TomoFolioUpdate == null)
                {
                    return NotFound();
                }
                TomoFolioUpdate.IdTomoFolio = TomoFolio.IdTomoFolio;
                TomoFolioUpdate.IdDatoSorteo = TomoFolio.IdDatoSorteo;
                TomoFolioUpdate.Tomo = TomoFolio.Tomo;
                TomoFolioUpdate.Folio = TomoFolio.Folio;
                TomoFolioUpdate.Estado = TomoFolio.Estado;
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while updating TomoFolio with id {TomoFolio.IdTomoFolio}.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTomoFolio(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var TomoFolioDelete = context.TomoFolios.FirstOrDefault(x => x.IdTomoFolio == id);
                if (TomoFolioDelete == null)
                {
                    return NotFound();
                }
                context.TomoFolios.Remove(TomoFolioDelete);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while deleting TomoFolio with id {id}.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}

