using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class TomoFolioController : ControllerBase
{
    private readonly ILogger<TomoFolioController> _logger;

    public TomoFolioController(ILogger<TomoFolioController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<TomoFolio> Get()
    {
        var context = new proyecto_bdContext();
        var TomoFolios = context.TomoFolios.ToList();
        return TomoFolios;
    }

    [HttpGet("{id}")]
    public TomoFolio Get(int id)
    {
        var context = new proyecto_bdContext();
        var TomoFolio = context.TomoFolios.FirstOrDefault(x => x.IdTomoFolio == id);
        return TomoFolio;
    }

    [HttpPost]
    public ActionResult Post([FromBody] TomoFolio TomoFolio)
    {
        var context = new proyecto_bdContext();
        context.TomoFolios.Add(TomoFolio);
        context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    public void UpdateTomoFolio(TomoFolio TomoFolio)
    {
        var context = new proyecto_bdContext();
        var TomoFolioUpdate = context.TomoFolios.FirstOrDefault(x => x.IdTomoFolio == TomoFolio.IdTomoFolio);
        TomoFolioUpdate.IdTomoFolio = TomoFolio.IdTomoFolio;
        TomoFolioUpdate.IdDatoSorteo = TomoFolio.IdDatoSorteo;
        TomoFolioUpdate.Tomo = TomoFolio.Tomo;
        TomoFolioUpdate.Folio = TomoFolio.Folio;
        TomoFolioUpdate.Estado = TomoFolio.Estado;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void DeleteTomoFolio(int id)
    {
        var context = new proyecto_bdContext();
        var TomoFolioDelete = context.TomoFolios.FirstOrDefault(x => x.IdTomoFolio == id);
        context.TomoFolios.Remove(TomoFolioDelete);
        context.SaveChanges();
    }

    [HttpGet("UltimoTomoFolio/{idSorteo}")]
    public TomoFolio UltimoTomoFolio(int idSorteo)
    {
        var context = new proyecto_bdContext();
        var DatosSorteo= context.DatosSorteos.FirstOrDefault(x => x.IdInterno == idSorteo);
        if(DatosSorteo == null)
            return null;
        var TomoFolio = context.TomoFolios.Where(x => (x.IdDatoSorteoNavigation.TipoLoteria == DatosSorteo.TipoLoteria && x.Estado=="Activo")  ).OrderByDescending(x => x.Tomo).ThenByDescending(x =>x.Folio).FirstOrDefault();
        return TomoFolio;
    }
}