using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class MarchamoPopularNacionalController : ControllerBase
{

    private readonly ILogger<MarchamoPopularNacionalController> _logger;

    public MarchamoPopularNacionalController(ILogger<MarchamoPopularNacionalController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<MarchamoPopularNacional> Get()
    {
        var context = new proyecto_bdContext();
        var MarchamoPopularNacionals = context.MarchamoPopularNacionals.ToList();
        return MarchamoPopularNacionals;
    }

    [HttpGet("{id}")]
    public MarchamoPopularNacional Get(int id)
    {
        var context = new proyecto_bdContext();
        var marchamoPopularNacional = context.MarchamoPopularNacionals.FirstOrDefault(x => x.Id == id);
        return marchamoPopularNacional;
    }

    [HttpPost]
    public ActionResult Post([FromBody] MarchamoPopularNacional MarchamoPopularNacional)
    {
        var context = new proyecto_bdContext();
        context.MarchamoPopularNacionals.Add(MarchamoPopularNacional);
        context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    public void UpdateMarchamoPopularNacional(MarchamoPopularNacional marchamoPopularNacional)
    {
        var context = new proyecto_bdContext();
        var MarchamoPopularNacionalUpdate = context.MarchamoPopularNacionals.FirstOrDefault(x => x.Id == marchamoPopularNacional.Id);
        MarchamoPopularNacionalUpdate.Id = marchamoPopularNacional.Id;
        MarchamoPopularNacionalUpdate.IdSorteo = marchamoPopularNacional.IdSorteo;
        MarchamoPopularNacionalUpdate.AperturaSerie1 = marchamoPopularNacional.AperturaSerie1;
        MarchamoPopularNacionalUpdate.AperturaSerie2 = marchamoPopularNacional.AperturaSerie2;
        MarchamoPopularNacionalUpdate.AperturaSerie3 = marchamoPopularNacional.AperturaSerie3;
        MarchamoPopularNacionalUpdate.AperturaSerie4 = marchamoPopularNacional.AperturaSerie4;
        MarchamoPopularNacionalUpdate.AperturaNumero = marchamoPopularNacional.AperturaNumero;
        MarchamoPopularNacionalUpdate.AperturaPremio = marchamoPopularNacional.AperturaPremio;
        MarchamoPopularNacionalUpdate.AperturaAcumuladoFichero = marchamoPopularNacional.AperturaAcumuladoFichero;
        MarchamoPopularNacionalUpdate.AperturaAcumuladoTula = marchamoPopularNacional.AperturaAcumuladoTula;
        MarchamoPopularNacionalUpdate.CierreSeries = marchamoPopularNacional.CierreSeries;
        MarchamoPopularNacionalUpdate.CierreNumero = marchamoPopularNacional.CierreNumero;
        MarchamoPopularNacionalUpdate.CierrePremio = marchamoPopularNacional.CierrePremio;
        MarchamoPopularNacionalUpdate.CierreAcumuladoFichero = marchamoPopularNacional.CierreAcumuladoFichero;
        MarchamoPopularNacionalUpdate.CierreAcumuladoTula = marchamoPopularNacional.CierreAcumuladoTula;
        MarchamoPopularNacionalUpdate.TomoAnterior = marchamoPopularNacional.TomoAnterior;
        MarchamoPopularNacionalUpdate.TomoActua = marchamoPopularNacional.TomoActua;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var marchamoPopularNacional = context.MarchamoPopularNacionals.FirstOrDefault(x => x.Id == id);
        context.MarchamoPopularNacionals.Remove(marchamoPopularNacional);
        context.SaveChanges();
    }
}