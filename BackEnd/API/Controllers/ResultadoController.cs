using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

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
        public IEnumerable<Resultado> Get()
    {
        var context = new proyecto_bdContext();
        var Resultados = context.Resultados.ToList();
        return Resultados;
    }

    [HttpGet("{id}")]
    public Resultado Get(int id)
    {
        var context = new proyecto_bdContext();
        var resultado = context.Resultados.FirstOrDefault(x => x.IdResultado == id);
        return resultado;
    }

    [HttpPost]
    public ActionResult Post([FromBody] Resultado Resultado)
    {
        var context = new proyecto_bdContext();
        context.Resultados.Add(Resultado);
        context.SaveChanges();
        return Ok();
    }

    
    [HttpPut("{id}")]
        [HttpPut]
    public void UpdateResultado(Resultado resultado)
    {
        var context = new proyecto_bdContext();
        var ResultadoUpdate = context.Resultados.FirstOrDefault(x => x.IdResultado == resultado.IdResultado);
        ResultadoUpdate.IdResultado = resultado.IdResultado;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var resultado = context.Resultados.FirstOrDefault(x => x.IdResultado == id);
        context.Resultados.Remove(resultado);
        context.SaveChanges();
    }
}