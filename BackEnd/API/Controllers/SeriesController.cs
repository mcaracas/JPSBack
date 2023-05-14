using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SeriesController : ControllerBase
    {
        private readonly ILogger<SeriesController> _logger;

        public SeriesController(ILogger<SeriesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetLatestResult()
        {
            try
            {
                var context = new proyecto_bdContext();
                var results = (
                    from d in context.DatosSorteos
                    join m in context.Marchamos on d.IdInterno equals m.IdSorteo
                    where (d.TipoLoteria == "LN" || d.TipoLoteria == "LP")
                        && d.IdInterno == (
                            from d2 in (
                                from d3 in context.DatosSorteos
                                where d3.TipoLoteria == "LN" || d3.TipoLoteria == "LP"
                                orderby d3.IdInterno descending
                                select d3
                            ).Take(2)
                            orderby d2.IdInterno ascending
                            select d2.IdInterno
                        ).FirstOrDefault()
                    select new
                    {
                        m.Id,
                        m.IdSorteo,
                        m.Tipo,
                        m.Valija,
                        m.TipoMarchamo,
                        m.NumeroMarchamo
                    }
                ).ToList();

                if (results.Count > 0)
                {
                    return Ok(results);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (System.Exception ex)
            {
                _logger.LogError($"Error al obtener los resultados más recientes: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] ALO model)
        {
            try
            {
                var context = new proyecto_bdContext();
                context.ALO.Add(model);
                context.SaveChanges();
                return Ok();
            }
            catch (System.Exception ex)
            {
                _logger.LogError($"Error al guardar el modelo ALO: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
