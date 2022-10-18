using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class ParametroController : ControllerBase
{
    private readonly ILogger<ParametroController> _logger;

    public ParametroController(ILogger<ParametroController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Parametro> Get()
    {
        var context = new proyecto_bdContext();
        var parametros = context.Parametros.ToList();
        return parametros;
    }

    [HttpGet("{codigoParametro}")]
    public Parametro Get(string codigoParametro)
    {
        var context = new proyecto_bdContext();
        var parametro = context.Parametros.FirstOrDefault(x => x.CodigoParametro == codigoParametro);
        return parametro;
    }
}