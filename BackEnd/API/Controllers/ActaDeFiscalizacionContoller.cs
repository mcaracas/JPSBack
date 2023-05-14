using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActaDeFiscalizacionController : ControllerBase
    {
        private readonly ILogger<ActaDeFiscalizacionController> _logger;

        public ActaDeFiscalizacionController(ILogger<ActaDeFiscalizacionController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public ActionResult Post([FromBody] ActaDeFiscalizacion actaDeFiscalizacion)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.ActaDeFiscalizacions.Add(actaDeFiscalizacion);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Se produjo un error al guardar el Acta de Fiscalización en la base de datos.");
                return StatusCode(500, "Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.");
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<ActaDeFiscalizacion>> Get()
        {
            try
            {
                var context = new proyecto_bdContext();
                var ActaDeFiscalizacions = context.ActaDeFiscalizacions.ToList();
                return ActaDeFiscalizacions;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Se produjo un error al obtener las Actas de Fiscalización desde la base de datos.");
                return StatusCode(500, "Se produjo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.");
            }
        }
    }
}
