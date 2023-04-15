using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable
public class SeriesController : ControllerBase
{
    private readonly ILogger<ActaDeFiscalizacionController> _logger;

    public SeriesController(ILogger<ActaDeFiscalizacionController> logger)
    {
        _logger = logger;
    }


[HttpGet]
public IActionResult GetLatestResult()
{
    var context = new proyecto_bdContext();
    var results = (
        from d in context.DatosSorteos
        join m in context.Marchamos on d.IdInterno equals m.IdSorteo
        where d.TipoLoteria == "LN" || d.TipoLoteria == "LP"
        && d.IdInterno == (
            from d2 in context.DatosSorteos
            where d2.TipoLoteria == "LN" || d2.TipoLoteria == "LP"
            orderby d2.IdInterno descending
            select d2.IdInterno
        ).FirstOrDefault()
        select new {
            d.IdInterno,
            d.IdUsuario,
            d.NumSorteo,
            d.TipoLoteria,
            d.PlanPremios,
            d.FechaHora,
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
}
